import scylladb from './contexts/scylladb';

const keyspaceName = 'feature_test';

beforeAll(async () => {
  await scylladb.client.execute(
    `CREATE KEYSPACE IF NOT EXISTS ${keyspaceName} WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1}`
  );

  await scylladb.client.useKeyspace(keyspaceName);
});

afterAll(async () => {
  await scylladb.client.execute(`DROP KEYSPACE IF EXISTS ${keyspaceName}`);
});
