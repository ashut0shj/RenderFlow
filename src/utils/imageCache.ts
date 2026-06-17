export function getCachedImageProps(uri: string) {
  return {
    source: { uri },
    cachePolicy: 'disk' as const,
    contentFit: 'cover' as const,
  };
}
