import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { DynamicCollectionBlock, CollectionItem } from '../../types/payload.types';
import { ActionHandler } from '../../types/action.types';
import { useTheme } from '../../hooks/useTheme';
import { SectionHeader } from '../common/SectionHeader';
import { getCachedImageProps } from '../../utils/imageCache';

interface DynamicCollectionProps {
  block: DynamicCollectionBlock;
  onAction: ActionHandler;
}

const ITEM_WIDTH = 80;
const ITEM_MARGIN = 12;
const ITEM_TOTAL_WIDTH = ITEM_WIDTH + ITEM_MARGIN;

const DynamicCollectionComponent: React.FC<DynamicCollectionProps> = ({ block, onAction }) => {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        marginBottom: 16,
      },
      listContent: {
        paddingHorizontal: 16,
      },
      card: {
        width: ITEM_WIDTH,
        alignItems: 'center',
        marginRight: ITEM_MARGIN,
      },
      imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        backgroundColor: theme.surface,
        borderWidth: 2,
        borderColor: theme.secondary,
      },
      image: {
        width: '100%',
        height: '100%',
      },
      label: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.text,
        marginTop: 6,
        textAlign: 'center',
      },
    });
  }, [theme]);

  const renderItem = ({ item }: { item: CollectionItem }) => {
    const handlePress = () => {
      if (item.action) {
        onAction(item.action);
      }
    };

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.imageContainer}>
          <Image {...getCachedImageProps(item.imageUrl)} style={styles.image} />
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: CollectionItem) => item.id;

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_TOTAL_WIDTH,
    offset: ITEM_TOTAL_WIDTH * index,
    index,
  });

  return (
    <View style={styles.container}>
      {block.title ? <SectionHeader title={block.title} /> : null}
      <View onStartShouldSetResponderCapture={() => false}>
        <FlatList
          horizontal
          data={block.items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          getItemLayout={getItemLayout}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={3}
        />
      </View>
    </View>
  );
};

export const DynamicCollection = React.memo(DynamicCollectionComponent, (prevProps, nextProps) => {
  return prevProps.block.id === nextProps.block.id;
});
