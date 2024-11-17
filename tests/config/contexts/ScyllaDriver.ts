/* eslint-disable no-underscore-dangle */

import { Cluster, Query, ScyllaSession } from '@lambda-group/scylladb';

export default {
  client: globalThis.SCYLLA_SESSION as ScyllaSession,

  async init() {
    if (!globalThis.__SCYLLA_DB_CONTAINER__) {
      throw new Error('ScyllaDB container is not running');
    }

    if (!globalThis.SCYLLA_SESSION) {
      const nodes = globalThis.__SCYLLA_DB_CONTAINER__.getContactPoints();

      globalThis.SCYLLA_SESSION = await new Cluster({ nodes }).connect();
    }

    return globalThis.SCYLLA_SESSION;
  },

  async clear() {
    const fetchKeyspaceNameQuery = new Query('SELECT keyspace_name FROM system_schema.keyspaces');

    const results = await this.client
      .query(fetchKeyspaceNameQuery)
      .then((res) => res.map((row) => row.keyspace_name))
      .then((res) => res.filter((name) => !name.toString().startsWith('system')));

    const dropKeyspaceQuery = new Query('DROP KEYSPACE IF EXISTS ?');

    await Promise.all(results.map(async (keyspace) => this.client.query(dropKeyspaceQuery, [keyspace])));
  },
};
