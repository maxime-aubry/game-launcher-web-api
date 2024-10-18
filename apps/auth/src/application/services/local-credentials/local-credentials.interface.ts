export interface ILocalCredentialsService {
  generateCredentialsAsync(clearedPassword: string): Promise<string>;
  checkCredentialsAsync(hashedPassword: string, clearedPassword: string): Promise<void>;
}
