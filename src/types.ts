export interface PD_Process {
  env: object;
}

export interface PD_Event {
  raw_event?: {
    query: object;
  };
  query?: {
    step: string;
  };
  [key: string]: any;
}
