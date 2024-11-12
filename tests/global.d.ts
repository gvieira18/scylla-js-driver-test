import { ScyllaSession } from '@lambda-group/scylladb';

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var SCYLLA_SESSION: ScyllaSession;
}
