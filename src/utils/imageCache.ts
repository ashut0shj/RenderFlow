import AsyncStorage from '@react-native-async-storage/async-storage';

export function getCachedImageProps(uri: string) {
  return {
    source: { uri },
    cachePolicy: 'disk' as const,
    contentFit: 'cover' as const,
  };
}

export async function cacheLottieAsset(url: string): Promise<object> {
  const cacheKey = `lottie_cache_${url}`;
  try {
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (err) {
    console.warn('Failed to read Lottie cache:', err);
  }

  try {
    const response = await fetch(url);
    const json = await response.json();
    await AsyncStorage.setItem(cacheKey, JSON.stringify(json));
    return json;
  } catch (err) {
    console.warn(`Failed to fetch and cache Lottie from ${url}:`, err);
    throw err;
  }
}

