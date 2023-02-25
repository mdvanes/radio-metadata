import { jq } from "./jq/jq.js";
import {
  RadioMetadata,
  RadioSchema,
  RadioSchemaOptional,
} from "./radio-metadata.types.js";
// import { urlToPickedTracks } from "./fp.js";

const isValidSchema = (schema: RadioSchemaOptional): schema is RadioSchema =>
  Boolean(
    schema.name &&
      schema.urls &&
      schema.urls.length > 0 &&
      schema.urls[0]?.url &&
      schema.urls[0]?.name &&
      schema.paths?.tracks &&
      schema.paths?.song?.title
  );

const pickFrom = (json: string) => async (path?: string) =>
  path && (await jq<string>(json, path));

export const getRadioMetaDataBySchema = async (
  schema: RadioSchemaOptional
): Promise<RadioMetadata[]> => {
  if (!isValidSchema(schema)) {
    return [];
  }

  const responses = Object.fromEntries(
    await Promise.all(
      schema.urls.map(async (url) => [
        url.name,
        await fetch(url.url, { headers: url.headers }).then((data) =>
          data.json()
        ),
      ])
    )
  );

  const tracks: any[] = JSON.parse(
    await jq<string>(JSON.stringify(responses), schema.paths.tracks)
  );

  const broadcastJson =
    schema.paths.broadcast?.title && JSON.stringify(responses);

  const result = await Promise.all(
    tracks.map(async (item): Promise<RadioMetadata> => {
      const itemJson = JSON.stringify(item);
      const time = schema.paths.time;
      const song = schema.paths.song;
      const pick = pickFrom(itemJson);
      const pickB = broadcastJson && pickFrom(broadcastJson);

      return {
        time: {
          start: await pick(time?.start),
          end: await pick(time?.end),
        },
        broadcast: {
          title: pickB && (await pickB(schema.paths.broadcast?.title)),
          presenters:
            pickB && (await pickB(schema.paths.broadcast?.presenters)),
          imageUrl: pickB && (await pickB(schema.paths.broadcast?.imageUrl)),
        },
        song: {
          artist: await pick(song?.artist),
          title: await pick(song?.title),
          imageUrl: await pick(song?.imageUrl),
          listenUrl: await pick(song?.listenUrl),
        },
      };
    })
  );

  return result;
};
