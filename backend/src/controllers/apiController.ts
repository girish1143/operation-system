import { Request, Response } from 'express';

interface Item {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

// In-memory demo store
const items: Item[] = [
  {
    id: '1',
    title: 'Explore Next.js App Router',
    description: 'Build fast, server-rendered and client-interactive React components.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'TypeScript Fullstack Architecture',
    description: 'Ensure end-to-end type safety between frontend and backend contracts.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Express REST API',
    description: 'Handle business logic, secure endpoints, and serve structured JSON.',
    createdAt: new Date().toISOString(),
  },
];

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'Express TypeScript Backend',
  });
};

export const getItems = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    count: items.length,
    data: items,
  });
};

export const createItem = (req: Request, res: Response): void => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string') {
    res.status(400).json({ success: false, error: 'Title is required and must be a string' });
    return;
  }

  const newItem: Item = {
    id: String(Date.now()),
    title: title.trim(),
    description: (description && typeof description === 'string') ? description.trim() : '',
    createdAt: new Date().toISOString(),
  };

  items.unshift(newItem);

  res.status(201).json({
    success: true,
    data: newItem,
  });
};
