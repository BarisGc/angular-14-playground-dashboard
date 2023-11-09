import { Request, Response, NextFunction } from 'express';

export function checkIfAuthorized(
  allowedRoles: string[],
  req: any,
  res: Response,
  next: NextFunction
) {
  const userInfo = req.body.user;

  const roles = userInfo.roles.filter((role:any) => allowedRoles.includes(role));

  if (roles.length > 0) {
    next();
  } else {
    res.sendStatus(403);
  }
}
