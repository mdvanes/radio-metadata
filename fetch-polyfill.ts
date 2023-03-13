import fetch, { Headers, Request, Response } from "node-fetch";

// @ts-expect-error
if (!globalThis.fetch) {
  // @ts-expect-error
  globalThis.fetch = fetch;
  // @ts-expect-error
  globalThis.Headers = Headers;
  // @ts-expect-error
  globalThis.Request = Request;
  // @ts-expect-error
  globalThis.Response = Response;
}
