import { Uuid } from '@lambda-group/scylladb';

import scylladb from '../../config/contexts/scylladb';

const tableName = 'feature_test.check_uuid';

describe(`#${tableName}`, () => {
  beforeAll(async () => {
    await scylladb.client.execute(`CREATE TABLE IF NOT EXISTS ${tableName} (a uuid, primary key (a))`);
  });

  afterAll(async () => {
    await scylladb.client.execute(`DROP TABLE IF EXISTS ${tableName}`);
  });

  test('should store and retrieve bigint values', async () => {
    await scylladb.client.execute(`INSERT INTO ${tableName} (a) VALUES (?)`, [Uuid.randomV4()]);

    const result = await scylladb.client.execute(`SELECT * FROM ${tableName}`).then((res) => res.map((row) => row));

    expect(result)
      .toBeArrayOfSize(1)
      .toEqual([{ a: expect.any(Uuid) }]);
  });
});
