export let hadBrowserCopy = false;

export function noteBrowserCopy(raw: string | null) {
  if (raw) hadBrowserCopy = true;
}
