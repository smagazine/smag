/**
 * Per-key async mutex so a read-modify-write against a JSON data file can't
 * interleave with another one running concurrently in the same process
 * (e.g. two admin requests landing back-to-back). Serializes by file path.
 */

const queues = new Map<string, Promise<unknown>>();

export function withLock<T>(key: string, fn: () => T | Promise<T>): Promise<T> {
  const prev = queues.get(key) ?? Promise.resolve();
  const run = prev.then(fn, fn);
  queues.set(
    key,
    run.then(
      () => {},
      () => {}
    )
  );
  return run;
}
