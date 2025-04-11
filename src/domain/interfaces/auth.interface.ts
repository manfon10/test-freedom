export interface SignTokenDto {
  id: number;
  role: string;
}

export interface ExpirationTokenOutput {
  renew: boolean;
  timeRemaining: number;
}
