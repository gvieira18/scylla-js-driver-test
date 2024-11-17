import { Set, Uuid } from '@lambda-group/scylladb';

import ScyllaDriver from '../../config/contexts/ScyllaDriver';

const tableName = 'feature_test.check_set';

describe(`#${tableName}`, () => {
  beforeAll(async () => {
    await ScyllaDriver.client.execute(`CREATE TABLE IF NOT EXISTS ${tableName} (a uuid, b set<int>, primary key (a))`);
  });

  afterAll(async () => {
    await ScyllaDriver.client.execute(`DROP TABLE IF EXISTS ${tableName}`);
  });

  test('should store and retrieve set values', async () => {
    await ScyllaDriver.client.execute(`INSERT INTO ${tableName} (a, b) VALUES (?, ?)`, [
      Uuid.randomV4(),
      new Set<number>([1, 2, 3, 1]),
    ]);

    const result = await ScyllaDriver.client.execute(`SELECT * FROM ${tableName}`).then((res) => res.map((row) => row));

    expect(result)
      .toBeArrayOfSize(1)
      .toEqual([{ a: expect.any(Uuid), b: [1, 2, 3] }]);
  });
});
