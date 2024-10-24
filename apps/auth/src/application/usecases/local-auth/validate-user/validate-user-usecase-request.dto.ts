export class ValidateUserUseCaseRequestDto {
  constructor(email: string, clearedPassword: string) {
    this.email = email;
    this.clearedPassword = clearedPassword;
  }

  public email: string;

  public clearedPassword: string;
}
