export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponseDto {
  message?: string;
  userId?: string;
}
