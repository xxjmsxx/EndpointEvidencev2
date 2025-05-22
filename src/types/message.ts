export type Message = {
  id: string;
  createdAt: string | Date;
  name?: string;
  timer?: number | null;
  role: 'user' | 'assistant' | 'system';
  content: string;
  parts?: { type: 'text'; text: string }[];
}

export type Conversation = {
  id: string;
  userId: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
}
