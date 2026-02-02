# react-native-phasset-image-loader

A React Native image loader for iOS that loads images from the Photos library using `PHImageManager`. Registers an `RCTImageURLLoader` for the `phasset://` URL scheme, allowing `PHAsset` images to be used directly with React Native's `<Image>` component.

## Installation

```sh
npm install react-native-phasset-image-loader
```

## Usage

```tsx
import { Image } from "react-native";
import {
  createPHImageSource,
  PHImageContentMode,
} from "react-native-phasset-image-loader";

<Image
  source={createPHImageSource({
    localIdentifier: asset.localIdentifier,
    targetSize: { width: 200, height: 200 },
    contentMode: PHImageContentMode.aspectFill,
  })}
/>;
```

## API

### `createPHImageSource(options: PHImageSourceOptions): ImageSourcePropType`

Returns a source object with a `phasset://` URI that React Native's image pipeline will route to the native `PHAssetImageLoader`.

#### `PHImageSourceOptions`

| Property                 | Type                                    | Required | Description                                                   |
| ------------------------ | --------------------------------------- | -------- | ------------------------------------------------------------- |
| `localIdentifier`        | `string`                                | Yes      | The `PHAsset` local identifier.                               |
| `targetSize`             | `CGSize \| "PHImageManagerMaximumSize"` | No       | Target size in pixels. Defaults to the `<Image>` layout size. |
| `resizeMode`             | `PHImageRequestOptionsResizeMode`       | No       | `None` (0), `Fast` (1), or `Exact` (2).                      |
| `deliveryMode`           | `PHImageRequestOptionsDeliveryMode`     | No       | `Opportunistic` (0), `HighQualityFormat` (1), or `FastFormat` (2). |
| `contentMode`            | `PHImageContentMode`                    | No       | `aspectFit` (0) or `aspectFill` (1).                          |
| `isNetworkAccessAllowed` | `boolean`                               | No       | Allow downloading from iCloud.                                |
