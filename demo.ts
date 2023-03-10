import { getRadioMetaData } from "./src/radio-metadata";
import "./fetch-polyfill";

const run = async () => {
  if (process.argv && process.argv.length > 2) {
    const result = await getRadioMetaData(process.argv[2]);

    console.log(
      "Previously played:",
      result.map(
        (item) =>
          `${item.time?.start}: ${item.song.artist} - ${item.song.title} - ${item.song.imageUrl}`
      )
    );

    console.log("Now playing:", result[0]);
  } else {
    console.log("Usage: npm run npo2");
  }
};

run();
