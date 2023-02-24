declare module "jq.node" {
  // @ts-expect-error
  export const jq = (input: string, path: string, options: any, callback: (err: any, result: any) => void): void => {};
}
