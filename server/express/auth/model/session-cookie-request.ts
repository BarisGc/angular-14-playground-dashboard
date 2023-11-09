interface SessionCookieRequest extends Request {
  cookies: {
    SESSIONID: string;
    user: User;
  };
}
