import { PickPath } from "./radio-metadata.types.js";

export interface PickRecord {
  [name: string]: unknown;
}

type PickResult = unknown;

export const pickFrom =
  (record: unknown) =>
  (path?: PickPath): PickResult => {
    if (!path) {
      return;
    }
    const result = path.reduce<PickResult>(
      (acc: PickResult, next: string | number) => {
        if (acc && typeof acc === "object") {
          return (acc as PickRecord)[next];
        }
        return acc;
      },
      record
    );

    return result;
  };
