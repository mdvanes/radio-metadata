import { ISOTimeString, RadioMetadata } from "./radio-metadata.types.js";

export const sky = {
  name: "Sky Radio",
  /*
    {
        station(slug: "sky-radio") {
          title
          playouts(profile: "", limit: 10) {
            broadcastDate
            track {
              id
              title
              artistName
              isrc
              images {
                type
                uri
                __typename
              }
              __typename
            }
            __typename
        }
        __typename
      }
    }&variables={}
  */
  metaTracksUrl:
    "https://graph.talparad.io/?query=%7B%0A%20%20station(slug%3A%20%22sky-radio%22)%20%7B%0A%20%20%20%20title%0A%20%20%20%20playouts(profile%3A%20%22%22%2C%20limit%3A%2010)%20%7B%0A%20%20%20%20%20%20broadcastDate%0A%20%20%20%20%20%20track%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20artistName%0A%20%20%20%20%20%20%20%20isrc%0A%20%20%20%20%20%20%20%20images%20%7B%0A%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20uri%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D&variables=%7B%7D",
  // TODO fallback image url?
};

interface SkyTracksResponseItem {
  broadcastDate: ISOTimeString;
  track: {
    id: string;
    title: string;
    artistName: string;
    isrc: string;
    images: { type: string; uri: string }[];
  };
}

export interface SkyTracksResponse {
  data: {
    station: {
      title: string;
      playouts: SkyTracksResponseItem[];
    };
  };
}

export const getRadioMetaData = async (): Promise<RadioMetadata[]> => {
  const response: SkyTracksResponse = await fetch(sky.metaTracksUrl, {
    headers: {
      "x-api-key": "",
    },
  }).then((data) => data.json());

  return response.data.station.playouts.map(
    (item): RadioMetadata => ({
      time: {
        start: item.broadcastDate,
      },
      song: {
        artist: item.track.artistName,
        title: item.track.title,
        imageUrl: item.track.images[0]?.uri,
      },
    })
  );
};
