export function renderHook<T>(callback: () => T) {
  let result: T;
  let updateCallback = callback;

  const update = () => {
    result = updateCallback();
  };

  result = callback();

  return {
    result,
    update,
  };
}
