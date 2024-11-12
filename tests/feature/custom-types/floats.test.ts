import { Float } from '@lambda-group/scylladb';

import scylladb from '../../config/contexts/scylladb';

const tableName = 'feature_test.check_float';

describe(`#${tableName}`, () => {
  beforeAll(async () => {
    await scylladb.client.execute(`CREATE TABLE IF NOT EXISTS ${tableName} (a FLOAT, primary key (a))`);
  });

  afterAll(async () => {
    await scylladb.client.execute(`DROP TABLE IF EXISTS ${tableName}`);
  });

  test('should store and retrieve float values', async () => {
    const floatValue = new Float(1.1);

    await scylladb.client.execute(`INSERT INTO ${tableName} (a) VALUES (?)`, [floatValue]);

    const result = await scylladb.client
      .execute(`SELECT * FROM ${tableName}`)
      .then((res) => res.map((row) => row) as Record<string, number>[]);

    expect(result[0].a).toBe(1.100000023841858);
  });
});
