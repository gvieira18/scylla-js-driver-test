import log4js from 'log4js';

import { name } from '../../package.json';

export default () => {
  log4js.configure({
    appenders: { out: { type: 'stdout', layout: { type: 'colored' } } },
    categories: { default: { appenders: ['out'], level: 'all' } },
  });

  return log4js.getLogger(`[${name}]`);
};
