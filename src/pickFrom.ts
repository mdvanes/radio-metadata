interface PickRecord {
  [name: string]: string | PickRecord;
}

type PickResult = PickRecord | string | undefined;

const isFlat = (item: PickResult): item is string | undefined => {
  return typeof item === "string" || typeof item === "undefined";
};

export const pickFrom =
  (record: PickRecord) =>
  (path?: string[]): string | undefined => {
    if (!path) {
      return;
    }
    const result = path.reduce<PickResult>((acc: PickResult, next: string) => {
      if (typeof acc === "string" || typeof acc === "undefined") {
        return acc;
      }
      return acc[next];
    }, record);
    if (!isFlat(result)) {
      return;
    }
    return result;
  };
