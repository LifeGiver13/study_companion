import app from '../server/app';
import serverless from 'serverless-http';

export default serverless(app);
