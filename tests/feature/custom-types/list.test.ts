import { List, Uuid } from '@lambda-group/scylladb';

import ScyllaDriver from '../../config/contexts/ScyllaDriver';

const tableName = 'feature_test.check_list';

describe(`#${tableName}`, () => {
  beforeAll(async () => {
    await ScyllaDriver.client.execute(`CREATE TABLE IF NOT EXISTS ${tableName} (a uuid, b list<int>, primary key (a))`);
  });

  afterAll(async () => {
    await ScyllaDriver.client.execute(`DROP TABLE IF EXISTS ${tableName}`);
  });

  test('should store and retrieve list values', async () => {
    await ScyllaDriver.client.execute(`INSERT INTO ${tableName} (a, b) VALUES (?, ?)`, [
      Uuid.randomV4(),
      new List<number>([1, 2, 3]),
    ]);

    const result = await ScyllaDriver.client.execute(`SELECT * FROM ${tableName}`).then((res) => res.map((row) => row));

    expect(result)
      .toBeArrayOfSize(1)
      .toEqual([{ a: expect.any(Uuid), b: [1, 2, 3] }]);
  });
});
