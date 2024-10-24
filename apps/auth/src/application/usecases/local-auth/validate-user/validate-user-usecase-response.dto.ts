export class ValidateUserUseCaseResponseDto {
  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  public id: string;

  public email: string;
}
