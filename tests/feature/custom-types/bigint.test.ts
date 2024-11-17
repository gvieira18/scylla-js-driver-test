import ScyllaDriver from '../../config/contexts/ScyllaDriver';

const tableName = 'feature_test.check_bigint';

describe(`#${tableName}`, () => {
  beforeAll(async () => {
    await ScyllaDriver.client.execute(`CREATE TABLE IF NOT EXISTS ${tableName} (a BIGINT, primary key (a))`);
  });

  afterAll(async () => {
    await ScyllaDriver.client.execute(`DROP TABLE IF EXISTS ${tableName}`);
  });

  test('should store and retrieve bigint values', async () => {
    const bigintValue = BigInt(1);

    await ScyllaDriver.client.execute(`INSERT INTO ${tableName} (a) VALUES (?)`, [bigintValue]);

    const result = await ScyllaDriver.client.execute(`SELECT * FROM ${tableName}`).then((res) => res.map((row) => row));

    expect(result[0].a).toBe(bigintValue);
  });
});
