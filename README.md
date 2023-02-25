# radio-metadata

Scalable library to read metadata from radio stations

## Use

Clone repo

Run `npm start npo2`

Response type:

```typescript
interface RadioMetadata {
  time?: {
    start?: ISOTimeString;
    end?: ISOTimeString;
  };
  broadcast?: {
    name?: string;
    presenter?: string[];
    imageUrl?: string;
  };
  song: {
    artist?: string;
    title?: string;
    imageUrl?: string;
    listenUrl?: string;
  };
}
```

## Programmatic use

Install with `npm i @mdworld/radio-metadata`

When using in Node, make sure to [polyfill the Fetch API with node-fetch](https://github.com/node-fetch/node-fetch#providing-global-access).

```
import x from '@mdworld/radio-metadata';

// TODO
```
