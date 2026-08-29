import { ModelTier } from '../../types/index.js';

export interface ModelProfile {
  name: string;
  provider: string;
  contextWindow: number;
  costPer1kInputTokensUsd: number;
  costPer1kOutputTokensUsd: number;
  avgLatencyMs: number;
  capabilities: string[];
}

export const MODEL_CATALOG: Record<ModelTier, ModelProfile> = {
  fast_classifier: {
    name: 'Gemini Flash 2.0 (High-Throughput)',
    provider: 'Google Vertex AI',
    contextWindow: 1048576,
    costPer1kInputTokensUsd: 0.0001,
    costPer1kOutputTokensUsd: 0.0004,
    avgLatencyMs: 120,
    capabilities: ['classification', 'routing', 'extraction', 'summarization', 'low_latency'],
  },
  reasoning_strategy: {
    name: 'Gemini Pro 2.5 (Deep Reasoning & Strategy)',
    provider: 'Google Vertex AI',
    contextWindow: 2097152,
    costPer1kInputTokensUsd: 0.00125,
    costPer1kOutputTokensUsd: 0.005,
    avgLatencyMs: 650,
    capabilities: ['complex_planning', 'financial_modeling', 'dialectics', 'game_theory', 'synthesis'],
  },
  code_optimizer: {
    name: 'Gemini Code Assist / Claude 3.5 Sonnet',
    provider: 'Enterprise Developer Tier',
    contextWindow: 200000,
    costPer1kInputTokensUsd: 0.003,
    costPer1kOutputTokensUsd: 0.015,
    avgLatencyMs: 800,
    capabilities: ['typescript_generation', 'ast_refactoring', 'kubernetes_iac', 'e2e_testing'],
  },
  private_secure: {
    name: 'Secure Enclave LLM (Zero-Retention / Air-gapped)',
    provider: 'On-Prem / Confidential Cloud',
    contextWindow: 128000,
    costPer1kInputTokensUsd: 0.002,
    costPer1kOutputTokensUsd: 0.008,
    avgLatencyMs: 450,
    capabilities: ['gdpr_compliant', 'pii_scrubbing', 'contract_redlining', 'security_audit'],
  },
};

export class ModelRouter {
  static route(tier: ModelTier, taskComplexity?: string): ModelProfile {
    // If complex strategy or high risk, route to reasoning
    if (taskComplexity === 'high' && tier === 'fast_classifier') {
      return MODEL_CATALOG.reasoning_strategy;
    }
    return MODEL_CATALOG[tier] || MODEL_CATALOG.reasoning_strategy;
  }

  static calculateMetrics(tier: ModelTier, inputTokens: number, outputTokens: number) {
    const model = MODEL_CATALOG[tier];
    const cost =
      (inputTokens / 1000) * model.costPer1kInputTokensUsd +
      (outputTokens / 1000) * model.costPer1kOutputTokensUsd;
    return {
      modelName: model.name,
      totalTokens: inputTokens + outputTokens,
      costUsd: Number(cost.toFixed(6)),
      latencyMs: Math.floor(model.avgLatencyMs * (0.8 + Math.random() * 0.4)),
    };
  }
}
