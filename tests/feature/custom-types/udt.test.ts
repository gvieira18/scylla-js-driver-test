import scylladb from '../../config/contexts/scylladb';

const tableName = 'feature_test.check_udt';

describe.skip(`#${tableName}`, () => {
  beforeAll(async () => {
    await scylladb.client.execute('CREATE TYPE IF NOT EXISTS feature_test.adr (street text, neighbor text)');
    await scylladb.client.execute(
      `CREATE TABLE IF NOT EXISTS ${tableName} (name text, address frozen<adr>, primary key (name))`
    );
  });

  afterAll(async () => {
    await scylladb.client.execute(`DROP TABLE IF EXISTS ${tableName}`);
    await scylladb.client.execute('DROP TYPE IF EXISTS address');
  });

  test('should store and retrieve udt values', async () => {
    const user = { name: 'John', address: { street: '123 Main St', neighbor: 'Downtown' } };

    const inserted = await scylladb.client.execute(`INSERT INTO ${tableName} (name, address) VALUES (?, ?)`, [
      user.name,
      user.address,
    ]);

    expect(inserted).toBeArrayOfSize(0);

    const result = await scylladb.client.execute(`SELECT * FROM ${tableName}`).then((res) => res.map((row) => row));
    expect(result).toBeArrayOfSize(1).toEqual([user]);
  });
});
