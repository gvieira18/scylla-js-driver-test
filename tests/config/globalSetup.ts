import scylladb from './contexts/scylladb';

export default async () => {
  await scylladb.init();
};
