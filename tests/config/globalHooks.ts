import ScyllaDriver from './contexts/ScyllaDriver';

const keyspaceName = 'feature_test';

beforeAll(async () => {
  await ScyllaDriver.client.execute(
    `CREATE KEYSPACE IF NOT EXISTS ${keyspaceName} WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1}`
  );

  await ScyllaDriver.client.useKeyspace(keyspaceName);
});

afterAll(async () => {
  await ScyllaDriver.client.execute(`DROP KEYSPACE IF EXISTS ${keyspaceName}`);
});
