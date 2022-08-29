export interface Log {
  timestamp: string;
  message: string;
  level: string;
  tags: string[];
}

export interface CommonResponse {
  message: string;
  data: any;
}
