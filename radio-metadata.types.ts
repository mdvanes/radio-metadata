// e.g. 2023-02-24T14:13:37.589Z
export type ISOTimeString = string; // TODO apply brand

export interface RadioMetadata {
  time?: {
    start?: ISOTimeString;
    end?: ISOTimeString;
  };
  broadcast?: {
    title?: string;
    presenters?: string;
    imageUrl?: string;
  };
  song: {
    artist?: string;
    title?: string;
    imageUrl?: string;
    listenUrl?: string;
  };
}

export type RadioSchema = {
  name?: string;
  urls?: { name?: string; url?: string }[];
  paths?: {
    tracks?: string;
    song?: {
      artist?: string;
      title?: string;
      imageUrl?: string;
      listenUrl?: string;
    };
  };
};
