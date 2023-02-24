import { jq } from "../jq/jq.js";
import { RadioMetadata, RadioSchema } from "../radio-metadata.types.js";
import { Npo2TracksResponseItem } from "./npo2.js";

export const npo2: RadioSchema = {
  name: "NPO Radio 2",
  urls: [
    {
      name: "tracks",
      url: "https://www.nporadio2.nl/api/tracks",
      // schema: {},
    },
    // {
    //   url: "https://www.nporadio2.nl/api/broadcasts",
    //   schema: {}
    // }
  ],
  paths: {
    tracks: 'property("data")',
    song: {
      // TODO use jq.node - https://github.com/FGRibreau/jq.node - uses joi schemas!
      artist: 'property("artist")',
      title: 'property("title")',
    },
  },
};

const isValidSchema = (schema: RadioSchema) =>
  schema.urls &&
  schema.urls.length > 0 &&
  schema.urls[0].name &&
  schema.paths?.tracks;

// imageUrl:
// song?.imageUrl && (await jq<string>(itemJson, song.imageUrl)),
const pickFrom = (json: string) => async (path?: string) =>
  path && (await jq<string>(json, path));

export const getRadioMetaData = async (): Promise<RadioMetadata[]> => {
  console.log("jq", jq);
  const schema = npo2;

  // TODO use isValidSchema with type guard to validate
  if (
    !(
      schema.urls &&
      schema.urls.length > 0 &&
      schema.urls[0].url &&
      schema.paths?.tracks
    )
  ) {
    return [];
  }

  const response: { data: Npo2TracksResponseItem[] } = await fetch(
    schema.urls[0].url
  ).then((data) => data.json());

  const tracks: any[] = JSON.parse(
    await jq<string>(
      // `[{"type": "aasfas"}]`,
      // 'map("type")'
      JSON.stringify(response),
      schema.paths.tracks
      // 'thru(a => moment.utc(a, "YYYYMMDD"))',
      // { rawInput: true, require: "moment" },
      // // @ts-expect-error
      // function (err, result) {
      //   console.log(result); // "2011-10-31T00:00:00.000Z"
      // }
      // {},
      // (err: any, result: any) => console.log(result)
    )
  );

  const result = await Promise.all(
    tracks.map(async (item): Promise<RadioMetadata> => {
      const itemJson = JSON.stringify(item);
      const song = schema?.paths?.song;
      const pick = pickFrom(itemJson);
      return {
        time: {
          start: await pick(song?.title),
          // start: song?.title && (await jq<string>(itemJson, song.title)),
          // end: await jq<string>(itemJson, song.title),
        },
        song: {
          artist: song?.artist && (await jq<string>(itemJson, song.artist)),
          title: song?.title && (await jq<string>(itemJson, song.title)),
          imageUrl:
            song?.imageUrl && (await jq<string>(itemJson, song.imageUrl)),
          listenUrl: song?.title && (await jq<string>(itemJson, song.title)),
        },
      };
    })
  );

  // const result1 = await jq<string>(
  //   // `[{"type": "aasfas"}]`,
  //   // 'map("type")'
  //   result,
  //   'map("title")'
  // );
  // console.log(result1);

  // Deep example
  // const result2 = await jq<string>(
  //   `[{"type": {"other": "aasfas"}}]`,
  //   'map("type.other")'
  // );
  // console.log("deep:", result2);

  return result;
  // return response.data.map(
  //   (item, index): RadioMetadata => ({
  //     song: {
  //       title: item.title,
  //     },
  //   })
  // );
};
