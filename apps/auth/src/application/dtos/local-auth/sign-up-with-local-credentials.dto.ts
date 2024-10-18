import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignUpWithLocalCredentialsDto {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
