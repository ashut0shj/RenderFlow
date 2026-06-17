import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useCampaign } from '../../hooks/useCampaign';
import { cacheLottieAsset } from '../../utils/imageCache';

const CampaignOverlayComponent: React.FC = () => {
  const { activeCampaign } = useCampaign();
  const [animationSource, setAnimationSource] = useState<object | null>(null);

  const animationUrl = activeCampaign?.overlayAnimation;

  useEffect(() => {
    if (!animationUrl) {
      setAnimationSource(null);
      return;
    }

    let isMounted = true;
    cacheLottieAsset(animationUrl)
      .then((json) => {
        if (isMounted) {
          setAnimationSource(json);
        }
      })
      .catch((err) => {
        console.error('Failed to load cached Lottie animation:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [animationUrl]);

  if (!activeCampaign || !animationUrl || !animationSource) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents="none">
      <LottieView
        autoPlay
        loop
        source={animationSource as unknown as React.ComponentProps<typeof LottieView>['source']}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
});

export const CampaignOverlay = React.memo(CampaignOverlayComponent);
