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
    tracks: 'property("tracks_.data")',
    broadcast: {
      // TODO Only use the most recent item for now. Since the broadcast and track data are two separate calls, it would require matching timestamps to match songs to broadcast slots
      title: 'property("broadcasts_.data[0].title")',
      presenters: 'property("broadcasts_.data[0].presenters")',
      imageUrl: 'property("broadcasts_.data[0].image_url_400x400")',
    },
    time: {
      start: 'property("startdatetime")',
      end: 'property("enddatetime")',
    },
    song: {
      artist: 'property("artist")',
      title: 'property("title")',
      imageUrl: 'property("image_url_400x400")',
      listenUrl: 'property("spotify_url")',
    },
  },
};
