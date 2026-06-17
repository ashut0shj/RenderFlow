import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { HomepagePayload, HomepageBlock } from '../../types/payload.types';
import { CampaignConfig } from '../../types/campaign.types';
import { BlockRenderer } from './BlockRenderer';
import { useActionDispatcher } from '../../hooks/useActionDispatcher';
import { useCampaign } from '../../hooks/useCampaign';

interface HomeFeedProps {
  payload: HomepagePayload;
  activeCampaign?: CampaignConfig | null;
}

const LAYOUT_SIZES: Record<string, number> = {
  BANNER_HERO: 220,
  PRODUCT_GRID_2X2: 420,
  DYNAMIC_COLLECTION: 180,
};

const HomeFeedComponent: React.FC<HomeFeedProps> = ({ payload, activeCampaign: propActiveCampaign }) => {
  // If activeCampaign is not passed as a prop, retrieve it from the campaign context
  const { activeCampaign: contextActiveCampaign } = useCampaign();
  const activeCampaign = propActiveCampaign !== undefined ? propActiveCampaign : contextActiveCampaign;

  const dispatch = useActionDispatcher();

  const visibleBlocks = useMemo(() => {
    const baseBlocks = payload.blocks.filter((block) => block.visible !== false);
    if (activeCampaign && activeCampaign.specialRows) {
      const visibleSpecialRows = activeCampaign.specialRows.filter((block) => block.visible !== false);
      return [...baseBlocks, ...visibleSpecialRows];
    }
    return baseBlocks;
  }, [payload.blocks, activeCampaign]);

  const renderItem = useCallback(({ item }: { item: HomepageBlock }) => {
    return <BlockRenderer block={item} onAction={dispatch} />;
  }, [dispatch]);

  const keyExtractor = useCallback((item: HomepageBlock) => item.id, []);

  const overrideItemLayout = useCallback((layout: { size?: number; span?: number }, item: HomepageBlock) => {
    layout.size = LAYOUT_SIZES[item.type] ?? 0;
  }, []);

  const styles = useMemo(() => {
    return StyleSheet.create({
      listContainer: {
        flex: 1,
        width: '100%',
      },
      contentContainer: {
        paddingBottom: 100, // Make sure there is room at the bottom for floating elements
      },
    });
  }, []);

  return (
    <View style={styles.listContainer}>
      <FlashList
        data={visibleBlocks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        overrideItemLayout={overrideItemLayout}
        removeClippedSubviews={true}
        drawDistance={400}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export const HomeFeed = React.memo(HomeFeedComponent, (prevProps, nextProps) => {
  return (
    prevProps.payload.blocks.length === nextProps.payload.blocks.length &&
    prevProps.activeCampaign?.id === nextProps.activeCampaign?.id
  );
});
