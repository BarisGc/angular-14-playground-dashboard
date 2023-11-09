import * as express from 'express';
import { Application } from 'express';
import { getAllCourses, getCourseById } from './get-courses.route';
import { searchLessons } from './search-lessons.route';
import { getCourseCategories } from './course-categories.route';
import { onFileupload } from './file-upload.route';

const fileUpload = require('express-fileupload');

const app: Application = express();

const cors = require('cors');

app.use(cors({ origin: true }));

app.use(fileUpload());

app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:courseId').get(getCourseById);

app.route('/api/lessons').get(searchLessons);

app.route('/api/course-categories').get(getCourseCategories);

app.route('/api/thumbnail-upload').post(onFileupload);

// Authentication
import * as fs from 'fs';
import * as https from 'https';
import { checkIfAuthenticated } from './auth/authentication.middleware';
import { checkIfAuthorized } from './auth/authorization.middleware';
import { createUser } from './auth/create-user.route';
import { getUser } from './auth/get-user.route';
import { loginAsUser } from './auth/login-as-user.route';
import { login } from './auth/login.route';
import { logout } from './auth/logout.route';
import { activeClients } from './auth/database-data';
import { addPushSubscriber } from './add-push-subscriber.route';
import { sendNewsletter } from './send-newsletter.route';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.json());

const webpush = require('web-push');

const vapidKeys = {
  publicKey:
    'BDDRRInx8sHnNtPjBGoceWlYOQa5w5a-zi-rTHXPUmqkjr7OZjFMNPm-Acyn54euhNBXLjtNK40p_Hi6FTGzWxc',
  privateKey: 'qbaKyXWLQpNZinnp5ZQMWcTwo_ggs7SzVENh4-ANjLk',
};

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.route('/api/signup').post(createUser);
app.route('/api/login').post(login);
app.route('/api/logout').post(checkIfAuthenticated, logout);
app.route('/api/user').get(getUser);
app.route('/api/active-clients').get((req, res) => {
  res.status(200).json(activeClients);
});

app
  .route('/api/admin')
  .post(
    checkIfAuthenticated,
    checkIfAuthorized.bind(null, ['admin']),
    loginAsUser
  );

app.route('/api/notifications').post(addPushSubscriber);

app.route('/api/newsletter').post(sendNewsletter);

const commandLineArgs = require('command-line-args');

const optionDefinitions = [{ name: 'secure', type: Boolean }];

const options = commandLineArgs(optionDefinitions);
// npm run server --secure flag'ı verilerek kullanılabiliniyor ama sertifika falan ayarlamak lazım
// "server": "ts-node -P ./server/express/server.tsconfig.json ./server/express/server.ts --secure",

if (options.secure) {
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
    app
  );

  // launch an HTTPS Server. Note: this does NOT mean that the application is secure
  /* caution: typescript error;
  httpsServer.listen(9000, () => console.log("HTTPS Secure Server running at https://localhost:" + httpsServer?.address()?.port));
  */
  const address = httpsServer.address();
  if (typeof address === 'object' && address !== null) {
    console.log(
      'HTTPS Secure Server running at https://localhost:' + address.port
    );
  }
} else {
  // launch an HTTP Server
  const httpServer = app.listen(process.env.PORT || 9000, () => {
    const address = httpServer.address();
    if (typeof address === 'object' && address !== null) {
      console.log('HTTP Server running at http://localhost:' + address.port);
    }
  });
}
