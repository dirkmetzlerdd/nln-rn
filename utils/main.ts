export function wrapAsHtml(markup: string | undefined) {
  if (!markup) return;

  return `<html><head><style type="text/css">* {margin: 0; padding: 0}</style><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="width: 92%; font-size: 20px">${markup}</body></html>`;
}
