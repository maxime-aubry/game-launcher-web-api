export class SignInUseCaseResponseDto {
  constructor(id: string, email: string, accessTokenCookie: string, refreshTokenCookie: string) {
    this.id = id;
    this.email = email;
    this.accessTokenCookie = accessTokenCookie;
    this.refreshTokenCookie = refreshTokenCookie;
  }

  public id: string;
  public email: string;
  public accessTokenCookie: string;
  public refreshTokenCookie: string;
}
