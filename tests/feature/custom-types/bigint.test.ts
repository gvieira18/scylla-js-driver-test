import scylladb from '../../config/contexts/scylladb';

const tableName = 'feature_test.check_bigint';

describe(`#${tableName}`, () => {
  beforeAll(async () => {
    await scylladb.client.execute(`CREATE TABLE IF NOT EXISTS ${tableName} (a BIGINT, primary key (a))`);
  });

  afterAll(async () => {
    await scylladb.client.execute(`DROP TABLE IF EXISTS ${tableName}`);
  });

  test('should store and retrieve bigint values', async () => {
    const bigintValue = BigInt(1);

    await scylladb.client.execute(`INSERT INTO ${tableName} (a) VALUES (?)`, [bigintValue]);

    const result = await scylladb.client.execute(`SELECT * FROM ${tableName}`).then((res) => res.map((row) => row));

    expect(result[0].a).toBe(bigintValue);
  });
});
