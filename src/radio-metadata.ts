import { npo2 } from "./presets/npo2.js";
import { sky } from "./presets/sky.js";
import { getRadioMetaDataBySchema } from "./getRadioMetaDataBySchema.js";
import { RadioMetadata, RadioSchemaOptional } from "./radio-metadata.types.js";

export { RadioSchemaOptional } from "./radio-metadata.types.js";

const configMap: Record<string, RadioSchemaOptional> = {
  npo2,
  sky,
};

export const getRadioMetaData = async (
  config: string | object
): Promise<RadioMetadata[]> => {
  // In Webpack 5 process.exit is not availabe, but jq.node depends on it (in core.js)
  if (!("exit" in process)) {
    // @ts-expect-error
    process.exit = (code: number) => {};
  }

  if (typeof fetch === "undefined") {
    throw new Error("Fetch API must be polyfilled when using in Node");
  }

  const schema = typeof config === "string" ? configMap[config] : config;

  if (!schema) {
    throw new Error(`No schema found for config ${config}`);
  }

  return getRadioMetaDataBySchema(schema);
};
