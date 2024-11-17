/* eslint-disable no-underscore-dangle,max-classes-per-file */

import { AbstractStartedContainer, GenericContainer, Wait, type StartedTestContainer } from 'testcontainers';

export class StartedScyllaContainer extends AbstractStartedContainer {
  private readonly port: number;

  constructor(startedTestContainer: StartedTestContainer) {
    super(startedTestContainer);
    this.port = startedTestContainer.getMappedPort(9042);
  }

  public getPort(): number {
    return this.port;
  }

  public getDatacenter(): string {
    return 'datacenter1';
  }

  public getContactPoints(): Array<string> {
    return [`${this.getHost()}:${this.getPort()}`];
  }
}

export class ScyllaDBContainer extends GenericContainer {
  constructor(image = 'scylladb/scylla:6.2') {
    super(image);
    this.withExposedPorts(9042);
    this.withExposedPorts(19042);
    this.withCommand(['--smp=2', '--memory=2G', '--overprovisioned=1', '--developer-mode=1']);
    this.withHealthCheck({
      interval: 15000,
      timeout: 30000,
      retries: 15,
      startPeriod: 30000,
      test: ['CMD-SHELL', 'cqlsh -e "SHOW VERSION" || exit 1'],
    });
    this.withWaitStrategy(Wait.forHealthCheck());
  }

  public override async start(): Promise<StartedScyllaContainer> {
    this.withEnvironment({
      SCYLLA_LISTEN_ADDRESS: '0.0.0.0',
      SCYLLA_BROADCAST_ADDRESS: '0.0.0.0',
      SCYLLA_RPC_ADDRESS: '0.0.0.0',
    });

    const startedContainer = await super.start();

    if (!globalThis.__SCYLLA_DB_CONTAINER__) {
      globalThis.__SCYLLA_DB_CONTAINER__ = new StartedScyllaContainer(startedContainer);
    }

    return globalThis.__SCYLLA_DB_CONTAINER__;
  }
}
