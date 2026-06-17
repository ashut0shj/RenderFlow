import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
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
    <LottieView
      autoPlay
      loop
      source={animationSource as unknown as React.ComponentProps<typeof LottieView>['source']}
      style={[styles.overlay, { pointerEvents: 'none' }]}
    />
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
  },
});

export const CampaignOverlay = React.memo(CampaignOverlayComponent);
