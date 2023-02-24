import { getRadioMetaData as getRadioMetaDataNpo2 } from "./npo2.js";
import { getRadioMetaData as getRadioMetaDataNpo2Lite } from "./npo2lite.js";
import { getRadioMetaData as getRadioMetaDataSky } from "./sky.js";
import { RadioMetadata } from "./radio-metadata.types.js";

const configMap: Record<string, () => Promise<RadioMetadata[]>> = {
  npo2: getRadioMetaDataNpo2,
  npo2lite: getRadioMetaDataNpo2Lite,
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
