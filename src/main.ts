import 'dotenv/config';
import 'source-map-support/register';

import Logger from './libs/Logger';

const logger = Logger();

(async () => {
  logger.info(process.env.NODE_ENV);
})().catch((err) => {
  logger.error(err);
  process.exit(1);
});
