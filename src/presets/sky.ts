import { RadioSchemaOptional } from "../radio-metadata.types.js";

export const sky: RadioSchemaOptional = {
  name: "Sky Radio",
  urls: [
    {
      name: "tracks_",
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
      url: "https://graph.talparad.io/?query=%7B%0A%20%20station(slug%3A%20%22sky-radio%22)%20%7B%0A%20%20%20%20title%0A%20%20%20%20playouts(profile%3A%20%22%22%2C%20limit%3A%2010)%20%7B%0A%20%20%20%20%20%20broadcastDate%0A%20%20%20%20%20%20track%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20artistName%0A%20%20%20%20%20%20%20%20isrc%0A%20%20%20%20%20%20%20%20images%20%7B%0A%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20uri%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D&variables=%7B%7D",
      headers: {
        "x-api-key": "",
      },
    },
  ],
  paths: {
    tracks: 'property("tracks_.data.station.playouts")',
    time: {
      start: 'property("broadcastDate")',
      end: 'property("broadcastDate")',
    },
    song: {
      artist: 'property("track.artistName")',
      title: 'property("track.title")',
      imageUrl: 'property("track.images[0].uri")',
    },
  },
};
