export interface LogginHttpDTO {
  method: string;
  path: string;
  response_time: number;
  user_id: number | null;
}
