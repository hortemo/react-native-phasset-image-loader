import type { ImageSourcePropType } from "react-native";

export interface CGSize {
  width: number;
  height: number;
}

export type PHImageManagerMaximumSize = "PHImageManagerMaximumSize";

export type RequestImageTargetSize = CGSize | PHImageManagerMaximumSize;

export enum PHImageRequestOptionsResizeMode {
  None = 0,
  Fast = 1,
  Exact = 2,
}

export enum PHImageRequestOptionsDeliveryMode {
  Opportunistic = 0,
  HighQualityFormat = 1,
  FastFormat = 2,
}

export enum PHImageContentMode {
  aspectFit = 0,
  aspectFill = 1,
}

export interface PHImageSourceOptions {
  localIdentifier: string;
  targetSize?: RequestImageTargetSize;
  resizeMode?: PHImageRequestOptionsResizeMode;
  deliveryMode?: PHImageRequestOptionsDeliveryMode;
  contentMode?: PHImageContentMode;
  isNetworkAccessAllowed?: boolean;
}

const buildQueryString = (
  params: Record<string, string | number | boolean | undefined>
): string => {
  const entries = Object.entries(params).filter(
    ([, value]) => value !== undefined
  );

  if (entries.length === 0) {
    return "";
  }

  return (
    "?" +
    entries
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value ?? "")}`
      )
      .join("&")
  );
};

/**
 * Creates a source object for React Native's Image component from a Photos library asset identifier.
 *
 * @param options - Configuration for image source, including the local identifier
 * @returns A source object that can be used with the Image component's `source` prop
 *
 * @example
 * ```tsx
 * import { Image } from 'react-native';
 * import { createPHImageSource } from 'react-native-phasset-image-loader';
 *
 * <Image
 *   source={createPHImageSource({
 *     localIdentifier: asset.localIdentifier,
 *     targetSize: { width: 200, height: 200 },
 *     contentMode: PHImageContentMode.aspectFill,
 *   })}
 * />
 * ```
 */
export function createPHImageSource(
  options: PHImageSourceOptions
): ImageSourcePropType {
  const {
    localIdentifier,
    resizeMode,
    deliveryMode,
    contentMode,
    isNetworkAccessAllowed,
  } = options;

  const targetSize =
    options.targetSize && typeof options.targetSize === "object"
      ? `${options.targetSize.width}x${options.targetSize.height}`
      : options.targetSize;

  const query = buildQueryString({
    localIdentifier,
    targetSize,
    resizeMode,
    deliveryMode,
    contentMode,
    isNetworkAccessAllowed,
  });

  return { uri: `phasset://${query}` };
}
