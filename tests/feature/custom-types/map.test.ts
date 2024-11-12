import { Map, Uuid } from '@lambda-group/scylladb';

import scylladb from '../../config/contexts/scylladb';

const tableName = 'feature_test.check_map';

describe(`#${tableName}`, () => {
  beforeAll(async () => {
    await scylladb.client.execute(
      `CREATE TABLE IF NOT EXISTS ${tableName} (a uuid, b map<text, int>, primary key (a))`
    );
  });

  afterAll(async () => {
    await scylladb.client.execute(`DROP TABLE IF EXISTS ${tableName}`);
  });

  test('should store and retrieve map values', async () => {
    await scylladb.client.execute(`INSERT INTO ${tableName} (a, b) VALUES (?, ?)`, [
      Uuid.randomV4(),
      new Map<string, number>([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]),
    ]);

    const result = await scylladb.client.execute(`SELECT * FROM ${tableName}`).then((res) => res.map((row) => row));

    expect(result)
      .toBeArrayOfSize(1)
      .toEqual([{ a: expect.any(Uuid), b: { a: 1, b: 2, c: 3 } }]);
  });
});
