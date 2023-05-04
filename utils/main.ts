export function wrapAsHtml(markup: string | undefined) {
  if (!markup) return;

  return `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="width: 92%; font-size: 20px">${markup}</body></html>`;
}
