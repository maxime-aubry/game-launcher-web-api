export class SignOutUseCaseResponseDto {
  constructor(cookies: string[]) {
    this.cookies = cookies;
  }

  public cookies: string[];
}
