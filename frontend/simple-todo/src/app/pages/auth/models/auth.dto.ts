export interface AccessTokenResponseDto {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
