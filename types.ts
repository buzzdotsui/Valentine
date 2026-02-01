export enum ProposalState {
  ASKING = 'ASKING',
  ACCEPTED = 'ACCEPTED',
}

export interface DateIdea {
  title: string;
  description: string;
  link?: string;
}

export interface MemoryAnalysis {
  sentiment: string;
  description: string;
}

export type GeminiStatus = 'idle' | 'loading' | 'success' | 'error';
