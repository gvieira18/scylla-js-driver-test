/* eslint-disable no-underscore-dangle */

import { ScyllaDBContainer } from './contexts/ScyllaContainer';

import ScyllaDriver from './contexts/ScyllaDriver';

export default async () => {
  // TODO: Waiting for @testcontainers/scylladb to be published
  await new ScyllaDBContainer('scylladb/scylla:6.2').start();

  await ScyllaDriver.init();
};
