// @ts-ignore
import { jq as jqOrig } from "jq.node";

export const jq = <T>(input: string, path: string): Promise<T> =>
  new Promise((resolve, reject) => {
    jqOrig(input, path, {}, (err: any, result: any) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
