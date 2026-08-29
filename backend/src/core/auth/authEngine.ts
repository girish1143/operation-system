import crypto from 'crypto';
import { AuditLedger } from '../audit/auditLedger.js';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Executive Admin' | 'Domain Supervisor' | 'Systems Architect' | 'AI Auditor' | 'Operator';
  organization: string;
  avatar: string;
  createdAt: string;
  lastLoginAt?: string;
}

interface StoredUser extends UserProfile {
  passwordHash: string;
  salt: string;
}

export class AuthEngine {
  private static users: Map<string, StoredUser> = new Map(); // keyed by email lowercase
  private static sessions: Map<string, { userId: string; email: string; expiresAt: number }> = new Map(); // keyed by token
  private static initialized = false;

  public static initialize(): void {
    if (this.initialized) return;
    this.initialized = true;

    // Seed default executive enterprise users
    this.seedUser({
      id: 'usr-001',
      name: 'Alexandra Vance',
      email: 'ceo@companyos.ai',
      password: 'password123',
      role: 'Executive Admin',
      organization: 'Acme Global Holdings',
      avatar: '👑',
    });

    this.seedUser({
      id: 'usr-002',
      name: 'Marcus Sterling',
      email: 'cfo@companyos.ai',
      password: 'password123',
      role: 'Executive Admin',
      organization: 'Acme Global Holdings',
      avatar: '📊',
    });

    this.seedUser({
      id: 'usr-003',
      name: 'Dr. Elena Rostova',
      email: 'governance@companyos.ai',
      password: 'password123',
      role: 'AI Auditor',
      organization: 'Acme Global Holdings',
      avatar: '🛡️',
    });
  }

  private static hashPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }

  private static seedUser(params: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserProfile['role'];
    organization: string;
    avatar: string;
  }): void {
    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = this.hashPassword(params.password, salt);
    const user: StoredUser = {
      id: params.id,
      name: params.name,
      email: params.email.toLowerCase(),
      role: params.role,
      organization: params.organization,
      avatar: params.avatar,
      createdAt: new Date().toISOString(),
      passwordHash,
      salt,
    };
    this.users.set(user.email, user);
  }

  public static signup(params: {
    name: string;
    email: string;
    password: string;
    role?: UserProfile['role'];
    organization?: string;
  }): { user: UserProfile; token: string } {
    this.initialize();
    const email = params.email.trim().toLowerCase();

    if (!email || !params.name || !params.password) {
      throw new Error('Name, email, and password are required');
    }

    if (params.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    if (this.users.has(email)) {
      throw new Error('An account with this email address already exists');
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = this.hashPassword(params.password, salt);
    const id = `usr-${Date.now().toString(36)}`;

    const newUser: StoredUser = {
      id,
      name: params.name.trim(),
      email,
      role: params.role || 'Operator',
      organization: params.organization?.trim() || 'Company OS Enterprise',
      avatar: '👤',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      passwordHash,
      salt,
    };

    this.users.set(email, newUser);

    const token = crypto.randomBytes(32).toString('hex');
    this.sessions.set(token, {
      userId: id,
      email,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Log to Cryptographic Audit Ledger
    AuditLedger.log({
      eventType: 'AUTH_SIGNUP',
      agentId: 'agent-095', // Access Control Agent
      action: `New user registration for ${newUser.name} (${newUser.email}) with role ${newUser.role}`,
      riskLevel: 'low',
      details: { userId: id, email, role: newUser.role },
    });

    const { passwordHash: _, salt: __, ...userProfile } = newUser;
    return { user: userProfile, token };
  }

  public static signin(emailInput: string, passwordInput: string): { user: UserProfile; token: string } {
    this.initialize();
    const email = emailInput.trim().toLowerCase();

    const stored = this.users.get(email);
    if (!stored) {
      AuditLedger.log({
        eventType: 'AUTH_FAILED',
        agentId: 'agent-095',
        action: `Failed login attempt for nonexistent user email: ${email}`,
        riskLevel: 'medium',
        details: { email },
      });
      throw new Error('Invalid email or password credentials');
    }

    const testHash = this.hashPassword(passwordInput, stored.salt);
    if (testHash !== stored.passwordHash) {
      AuditLedger.log({
        eventType: 'AUTH_FAILED',
        agentId: 'agent-095',
        action: `Failed login attempt (password mismatch) for user: ${email}`,
        riskLevel: 'medium',
        details: { email, userId: stored.id },
      });
      throw new Error('Invalid email or password credentials');
    }

    stored.lastLoginAt = new Date().toISOString();

    const token = crypto.randomBytes(32).toString('hex');
    this.sessions.set(token, {
      userId: stored.id,
      email,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    AuditLedger.log({
      eventType: 'AUTH_SIGNIN',
      agentId: 'agent-095',
      action: `Successful executive sign-in for ${stored.name} (${stored.role})`,
      riskLevel: 'low',
      details: { userId: stored.id, email, role: stored.role },
    });

    const { passwordHash: _, salt: __, ...userProfile } = stored;
    return { user: userProfile, token };
  }

  public static getUserByToken(token: string): UserProfile | null {
    this.initialize();
    if (!token) return null;

    const session = this.sessions.get(token);
    if (!session) return null;

    if (Date.now() > session.expiresAt) {
      this.sessions.delete(token);
      return null;
    }

    const stored = this.users.get(session.email);
    if (!stored) return null;

    const { passwordHash: _, salt: __, ...userProfile } = stored;
    return userProfile;
  }

  public static signout(token: string): boolean {
    this.initialize();
    if (!token) return false;
    const session = this.sessions.get(token);
    if (session) {
      AuditLedger.log({
        eventType: 'AUTH_SIGNOUT',
        agentId: 'agent-095',
        action: `User sign-out for email: ${session.email}`,
        riskLevel: 'low',
        details: { email: session.email },
      });
      this.sessions.delete(token);
      return true;
    }
    return false;
  }
}
