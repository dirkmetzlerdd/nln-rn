export function validateState(
  state: Record<string, string | number>
): Array<string> {
  const errorKeys: Array<string> = [];
  Object.keys(state).forEach((key) => {
    if (!state[key]) {
      errorKeys.push(key);
    }
  });

  return errorKeys;
}
