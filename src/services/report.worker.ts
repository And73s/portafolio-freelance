import { readFiles } from "./reports";
self.onmessage = async (event: MessageEvent<File[]>) => {
  try {
    self.postMessage({ ok: true, result: await readFiles(event.data) });
  } catch {
    self.postMessage({ ok: false });
  }
};
