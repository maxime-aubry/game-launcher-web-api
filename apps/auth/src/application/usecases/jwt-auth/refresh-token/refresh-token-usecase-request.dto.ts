export class RefreshTokenUseCaseRequestDto {
  constructor(id: string, refreshToken: string) {
    this.id = id;
    this.refreshToken = refreshToken;
  }

  public id: string;
  public refreshToken: string;
}
