export class SignOutCookiesDto {
  constructor(cookies: string[]) {
    this.cookies = cookies;
  }

  cookies: string[];
}
