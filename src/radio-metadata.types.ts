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
