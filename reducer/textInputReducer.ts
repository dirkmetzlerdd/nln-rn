export function textInputReducer<T>(
  state: T,
  action: { type: string; payload: { key: string; value: string | number } }
): T {
  if (action.type === "update") {
    const { key, value } = action.payload;
    return {
      ...state,
      [key]: value,
    };
  }
  return state;
}
