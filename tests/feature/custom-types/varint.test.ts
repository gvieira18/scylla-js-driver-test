import { Varint } from '@lambda-group/scylladb';

import ScyllaDriver from '../../config/contexts/ScyllaDriver';

const tableName = 'feature_test.check_varint';

describe(`#${tableName}`, () => {
  beforeAll(async () => {
    await ScyllaDriver.client.execute(`CREATE TABLE IF NOT EXISTS ${tableName} (a varint, primary key (a))`);
  });

  afterAll(async () => {
    await ScyllaDriver.client.execute(`DROP TABLE IF EXISTS ${tableName}`);
  });

  test('should store and retrieve bigint values', async () => {
    await ScyllaDriver.client.execute(`INSERT INTO ${tableName} (a) VALUES (?)`, [
      new Varint([0x0000, 0x0001, 0x0002]),
    ]);

    const result = await ScyllaDriver.client.execute(`SELECT * FROM ${tableName}`).then((res) => res.map((row) => row));

    expect(result[0].a).toBeArrayOfSize(3).toEqual([0x00, 0x01, 0x02]);
  });
});
