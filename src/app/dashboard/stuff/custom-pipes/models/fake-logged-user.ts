export class FakeLoggedUser {
  constructor(
    public name: string,
    public userName: string,
    public id: string,
    public role: string,
    public email: string,
    public claims: string[],
    public token: string,
    public refreshToken: string
  ) {}
  hasClaim(claim: string) {
    return this.claims?.includes(claim);
  }
}
