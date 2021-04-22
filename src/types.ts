export type PdProcess = {
  env: object;
};

export type PdEvent = {
  raw_event?: {
    query: object;
  };
  query?: {
    step?: string;
  };
  [key: string]: any;
};
