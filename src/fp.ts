import { jq } from "./jq/jq.js";
import { pipe } from "fp-ts/lib/function.js";

// TODO: find a better way to deal with Promises in pipe, because then toJson and stringify etc are trivial
const toJson = async (data: Promise<globalThis.Response>) =>
  (await data).json();

const wrap = async (data: Promise<any>) => ({ tracks_: await data });

const stringify = async (data: any): Promise<string> =>
  JSON.stringify(await data);

const pickTracks = (path: string) => async (data: Promise<string>) => {
  const d = await data;
  console.log(path, d);
  return jq<string>(d, path);
};

const parse = async (data: Promise<string>) => JSON.parse(await data);

export const urlToPickedTracks = async (url: string, path: string) => {
  return pipe(url, fetch, toJson, wrap, stringify, pickTracks(path), parse);
};
