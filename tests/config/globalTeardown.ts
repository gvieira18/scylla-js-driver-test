/* eslint-disable no-underscore-dangle */

export default async () => {
  if (globalThis.__SCYLLA_DB_CONTAINER__) {
    await globalThis.__SCYLLA_DB_CONTAINER__.stop({ remove: true, removeVolumes: true });
  }
};
