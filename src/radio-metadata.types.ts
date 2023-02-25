// e.g. 2023-02-24T14:13:37.589Z
export type ISOTimeString = string; // TODO apply brand

// E.g. "2023-02-25T14:00:00"
// TODO type Npo2TimeString = string;

export interface RadioMetadata {
  time?: {
    start?: ISOTimeString;
    end?: ISOTimeString;
    // TODO fallback image url?
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
  name: string;
  urls: { name: string; url: string; headers?: any }[];
  paths: {
    tracks: string;
    time?: {
      start?: string;
      end?: string;
    };
    broadcast?: {
      title?: string;
      presenters?: string;
      imageUrl?: string;
    };
    song: {
      artist?: string;
      title: string;
      imageUrl?: string;
      listenUrl?: string;
    };
  };
};

// Nested Partial: https://grrr.tech/posts/2021/typescript-partial/
type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
    ? Subset<K[attr]> | null
    : K[attr] extends object | null | undefined
    ? Subset<K[attr]> | null | undefined
    : K[attr];
};

export type RadioSchemaOptional = Subset<RadioSchema>;
