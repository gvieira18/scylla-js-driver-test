import { Float } from '@lambda-group/scylladb';

import ScyllaDriver from '../../config/contexts/ScyllaDriver';

const tableName = 'feature_test.check_float';

describe(`#${tableName}`, () => {
  beforeAll(async () => {
    await ScyllaDriver.client.execute(`CREATE TABLE IF NOT EXISTS ${tableName} (a FLOAT, primary key (a))`);
  });

  afterAll(async () => {
    await ScyllaDriver.client.execute(`DROP TABLE IF EXISTS ${tableName}`);
  });

  test('should store and retrieve float values', async () => {
    const floatValue = new Float(1.1);

    await ScyllaDriver.client.execute(`INSERT INTO ${tableName} (a) VALUES (?)`, [floatValue]);

    const result = await ScyllaDriver.client
      .execute(`SELECT * FROM ${tableName}`)
      .then((res) => res.map((row) => row) as Record<string, number>[]);

    expect(result[0].a).toBe(1.100000023841858);
  });
});
