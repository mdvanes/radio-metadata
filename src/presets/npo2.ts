import { RadioSchemaOptional } from "../radio-metadata.types.js";

export const npo2: RadioSchemaOptional = {
  name: "NPO Radio 2",
  urls: [
    {
      name: "tracks_",
      url: "https://www.nporadio2.nl/api/tracks",
    },
    {
      name: "broadcasts_",
      url: "https://www.nporadio2.nl/api/broadcasts",
    },
  ],
  paths: {
    tracks: ["tracks_", "data"],
    broadcast: {
      // TODO Only use the most recent item for now. Since the broadcast and track data are two separate calls, it would require matching timestamps to match songs to broadcast slots
      title: ["broadcasts_", "data", 0, "title"],
      presenters: ["broadcasts_", "data", 0, "presenters"],
      imageUrl: ["broadcasts_", "data", 0, "image_url_400x400"],
    },
    time: {
      start: ["startdatetime"],
      end: ["enddatetime"],
    },
    song: {
      artist: ["artist"],
      title: ["title"],
      imageUrl: ["image_url_400x400"],
      listenUrl: ["spotify_url"],
    },
  },
};
