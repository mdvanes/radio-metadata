import { npo2 } from "./presets/npo2.js";
import { sky } from "./presets/sky.js";
import { getRadioMetaDataBySchema } from "./getRadioMetaDataBySchema.js";
import { RadioMetadata, RadioSchemaOptional } from "./radio-metadata.types.js";

const configMap: Record<string, RadioSchemaOptional> = {
  npo2,
  sky,
};

export const getRadioMetaData = async (
  config: string | object
): Promise<RadioMetadata[]> => {
  if (typeof fetch === "undefined") {
    throw new Error("Fetch API must be polyfilled when using in Node");
  }

  console.log("Get radio metadata with config:", config);

  const schema = typeof config === "string" ? configMap[config] : config;

  if (!schema) {
    throw new Error(`No schema found for config ${config}`);
  }

  return getRadioMetaDataBySchema(schema);
};
