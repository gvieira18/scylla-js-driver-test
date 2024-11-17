import ScyllaDriver from '../../config/contexts/ScyllaDriver';

const tableName = 'feature_test.check_udt';

describe.skip(`#${tableName}`, () => {
  beforeAll(async () => {
    await ScyllaDriver.client.execute('CREATE TYPE IF NOT EXISTS feature_test.adr (street text, neighbor text)');
    await ScyllaDriver.client.execute(
      `CREATE TABLE IF NOT EXISTS ${tableName} (name text, address frozen<adr>, primary key (name))`
    );
  });

  afterAll(async () => {
    await ScyllaDriver.client.execute(`DROP TABLE IF EXISTS ${tableName}`);
    await ScyllaDriver.client.execute('DROP TYPE IF EXISTS address');
  });

  test('should store and retrieve udt values', async () => {
    const user = { name: 'John', address: { street: '123 Main St', neighbor: 'Downtown' } };

    const inserted = await ScyllaDriver.client.execute(`INSERT INTO ${tableName} (name, address) VALUES (?, ?)`, [
      user.name,
      user.address,
    ]);

    expect(inserted).toBeArrayOfSize(0);

    const result = await ScyllaDriver.client.execute(`SELECT * FROM ${tableName}`).then((res) => res.map((row) => row));
    expect(result).toBeArrayOfSize(1).toEqual([user]);
  });
});
