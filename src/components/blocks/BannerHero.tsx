import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { BannerHeroBlock } from '../../types/payload.types';
import { ActionHandler } from '../../types/action.types';
import { useTheme } from '../../hooks/useTheme';
import { getCachedImageProps } from '../../utils/imageCache';
import { ThemedButton } from '../common/ThemedButton';

interface BannerHeroProps {
  block: BannerHeroBlock;
  onAction: ActionHandler;
}

const BannerHeroComponent: React.FC<BannerHeroProps> = ({ block, onAction }) => {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        width: '100%',
        height: 200,
        position: 'relative',
        backgroundColor: theme.surface || '#FFFFFF',
        marginBottom: 16,
        overflow: 'hidden',
      },
      image: {
        width: '100%',
        height: '100%',
      },
      overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        paddingHorizontal: 20,
      },
      title: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 6,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 4,
      },
      subtitle: {
        color: '#E0E0E0',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 4,
      },
      ctaButton: {
        alignSelf: 'flex-start',
        marginTop: 4,
      },
    });
  }, [theme]);

  const handlePress = () => {
    if (block.action) {
      onAction(block.action);
    }
  };

  return (
    <View style={styles.container}>
      <Image {...getCachedImageProps(block.imageUrl)} style={styles.image} />
      <View style={styles.overlay}>
        {block.title ? <Text style={styles.title}>{block.title}</Text> : null}
        {block.subtitle ? <Text style={styles.subtitle}>{block.subtitle}</Text> : null}
        {block.ctaLabel && block.action ? (
          <ThemedButton
            label={block.ctaLabel}
            onPress={handlePress}
            style={styles.ctaButton}
          />
        ) : null}
      </View>
    </View>
  );
};

export const BannerHero = React.memo(BannerHeroComponent);
