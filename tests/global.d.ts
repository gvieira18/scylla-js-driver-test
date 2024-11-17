/* eslint-disable vars-on-top,no-var,no-underscore-dangle */

import { ScyllaSession } from '@lambda-group/scylladb';
import { StartedScyllaContainer } from './config/contexts/ScyllaContainer';

declare global {
  var SCYLLA_SESSION: ScyllaSession;
  var __SCYLLA_DB_CONTAINER__: StartedScyllaContainer;
}
