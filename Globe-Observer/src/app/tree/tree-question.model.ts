// tree-question.model.ts
export interface TreeQuestion {
  question: string;
  options: TreeOption[];
}

export interface TreeOption {
  type: string;
  question?: string;
  species?: string;
  options?: TreeOption[];
}
