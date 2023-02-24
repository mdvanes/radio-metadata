import { RadioMetadata } from "./radio-metadata.types.js";

export const npo2 = {
  name: "NPO Radio 2",
  metaTracksUrl: "https://www.nporadio2.nl/api/tracks",
  metaBroadcastUrl: "https://www.nporadio2.nl/api/broadcasts",
  // TODO fallback image url?
};

// E.g. "2023-02-25T14:00:00"
type Npo2TimeString = string;

export interface Npo2TracksResponseItem {
  startdatetime: Npo2TimeString;
  enddatetime: Npo2TimeString;
  title: string;
  artist: string;
  image_url_200x200: string;
  image_url_400x400: string;
  spotify_url: string;
}

export interface Npo2BroadcastResponseItem {
  startdatetime: Npo2TimeString;
  stopdatetime: Npo2TimeString;
  broadcasters: [{ name: string; alias: string }];
  broadcaster: string;
  broadcaster_slug: string;
  title: string;
  presenters?: string;
  image?: string;
  image_url?: string;
  image_url_100x100?: string;
  image_url_200x200?: string;
  image_url_400x400?: string;
}

export const getRadioMetaData = async (): Promise<RadioMetadata[]> => {
  const response: { data: Npo2TracksResponseItem[] } = await fetch(
    npo2.metaTracksUrl
  ).then((data) => data.json());

  const response1: { data: Npo2BroadcastResponseItem[] } = await fetch(
    npo2.metaBroadcastUrl
  ).then((data) => data.json());

  const mostRecentBroadcast = response1.data[0];

  return response.data.map(
    (item, index): RadioMetadata => ({
      time: {
        start: item.startdatetime,
        end: item.enddatetime,
      },
      // Only set the broadcast for the most recent item. Since the broadcast and track data are two separate calls, it would require matching timestamps to match songs to broadcast slots
      broadcast:
        index === 0 && mostRecentBroadcast
          ? {
              title: mostRecentBroadcast.title,
              presenters: mostRecentBroadcast.presenters,
              imageUrl: mostRecentBroadcast.image_url_400x400,
            }
          : undefined,
      song: {
        artist: item.artist,
        title: item.title,
        imageUrl: item.image_url_400x400,
        listenUrl: item.spotify_url,
      },
    })
  );
};
