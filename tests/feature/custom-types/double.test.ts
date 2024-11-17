import { Double } from '@lambda-group/scylladb';

import ScyllaDriver from '../../config/contexts/ScyllaDriver';

const tableName = 'feature_test.check_double';

describe(`#${tableName}`, () => {
  beforeAll(async () => {
    await ScyllaDriver.client.execute(`CREATE TABLE IF NOT EXISTS ${tableName} (a DOUBLE, primary key (a))`);
  });

  afterAll(async () => {
    await ScyllaDriver.client.execute(`DROP TABLE IF EXISTS ${tableName}`);
  });

  test('should store and retrieve double values', async () => {
    const doubleInput = new Double(1.1127830921);

    await ScyllaDriver.client.execute(`INSERT INTO ${tableName} (a) VALUES (?)`, [doubleInput]);

    const result = await ScyllaDriver.client.execute(`SELECT * FROM ${tableName}`).then((res) => res.map((row) => row));

    expect(result[0].a).toBe(1.1127830921);
  });
});
