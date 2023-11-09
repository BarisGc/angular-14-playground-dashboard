import { db } from './database';
import { activeClients } from './database-data';
export function loginAsUser(req: any, res: any) {
  const impersonatedUserEmail = req.body['impersonatedUserEmail'];

  const impersonatedUser = db.findUserByEmail(impersonatedUserEmail);

  if (!impersonatedUser) {
    res.sendStatus(403);
    console.log('Login as user failed due to impersonated user not found');
  } else {
    const user = req.body['user'];
    if (user.roles.includes('admin')) {
      let activeImpersonatedUserDataIndex =
        activeClients.indexOf(impersonatedUser);
      let activeAdminDataIndex = activeClients
        .map((activeClient) => activeClient.email)
        .indexOf(user.email);
      if (activeImpersonatedUserDataIndex > -1)
        activeClients.splice(activeImpersonatedUserDataIndex, 1);
      if (activeAdminDataIndex > -1)
        activeClients.splice(activeAdminDataIndex, 1);
      activeClients.push(impersonatedUser);
      console.log('activeClients', activeClients);

      console.log('Login as user successful');

      res.status(200).json({
        id: impersonatedUser.id,
        email: impersonatedUser.email,
        roles: impersonatedUser.roles,
      });
    } else {
      res.sendStatus(403);
      console.log('Login as user failed due to user not having admin role');
    }
  }
}
