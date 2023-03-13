import { pickFrom, PickRecord } from "./pickFrom.js";
import {
  PickPath,
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
        // @ts-expect-error fix the global type because of the polyfill
        await fetch(url.url, { headers: url.headers }).then((data: any) =>
          data.json()
        ),
      ])
    )
  );

  const tracks = pickFrom(responses)(schema.paths.tracks) as PickRecord[];

  const result = await Promise.all(
    tracks.map(async (item): Promise<RadioMetadata> => {
      const time = schema.paths.time;
      const song = schema.paths.song;
      const pickB = pickFrom(responses) as (
        path?: PickPath
      ) => string | undefined;
      const pick = pickFrom(item) as (path?: PickPath) => string | undefined;

      return {
        time: {
          start: pick(time?.start),
          end: pick(time?.end),
        },
        broadcast: {
          title: pickB && pickB(schema.paths.broadcast?.title),
          presenters: pickB && pickB(schema.paths.broadcast?.presenters),
          imageUrl: pickB && pickB(schema.paths.broadcast?.imageUrl),
        },
        song: {
          artist: pick(song.artist),
          title: pick(song.title) ?? "",
          imageUrl: pick(song?.imageUrl),
          listenUrl: pick(song?.listenUrl),
        },
      };
    })
  );

  return result;
};
