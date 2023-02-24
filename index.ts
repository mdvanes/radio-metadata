import { getRadioMetaData } from "./src/radio-metadata.js";
import "./fetch-polyfill.js";

const run = async () => {
  if (process.argv && process.argv.length > 2) {
    const result = await getRadioMetaData(process.argv[2]);

    console.log(
      "Previously played:",
      result.map(
        (item) =>
          `${item.time?.start}: ${item.song.artist} - ${item.song.title}`
      )
    );

    console.log("Now playing:", result[0]);
  } else {
    console.log("Usage: ..."); // TODO
  }
};

run();
