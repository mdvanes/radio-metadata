import { getRadioMetaData as getRadioMetaDataNpo2 } from "./presets/npo2.js";
import { getRadioMetaData as getRadioMetaDataSky } from "./presets/sky.js";
import { RadioMetadata } from "./radio-metadata.types.js";

const configMap: Record<string, () => Promise<RadioMetadata[]>> = {
  npo2: getRadioMetaDataNpo2,
  sky: getRadioMetaDataSky,
};

export const getRadioMetaData = async (
  config: string
): Promise<RadioMetadata[]> => {
  if (typeof fetch === "undefined") {
    throw new Error("Fetch API must be polyfilled when using in Node");
  }

  console.log("Get radio metadata with config:", config);

  const retrieverFn = configMap[config];

  if (!retrieverFn) {
    throw new Error(`No retriever found for config ${config}`);
  }

  return retrieverFn();
};
