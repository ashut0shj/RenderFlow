import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ProductGrid2x2Block, ProductItem } from '../../types/payload.types';
import { ActionHandler } from '../../types/action.types';
import { SectionHeader } from '../common/SectionHeader';
import { ProductCard } from '../common/ProductCard';

interface ProductGrid2x2Props {
  block: ProductGrid2x2Block;
  onAction: ActionHandler;
}

const ProductGrid2x2Component: React.FC<ProductGrid2x2Props> = ({ block, onAction }) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        marginBottom: 16,
        paddingHorizontal: 10,
      },
      grid: {
        justifyContent: 'space-between',
      },
    });
  }, []);

  const renderItem = ({ item }: { item: ProductItem }) => {
    const handleAction = (actionObj: any) => {
      if (item.action) {
        onAction(item.action);
      } else {
        onAction(actionObj);
      }
    };

    return (
      <ProductCard
        item={item}
        onAction={handleAction}
      />
    );
  };

  const keyExtractor = (item: ProductItem) => item.id;
  const displayProducts = block.products.slice(0, 4);

  return (
    <View style={styles.container}>
      {block.title ? <SectionHeader title={block.title} /> : null}
      <FlatList
        data={displayProducts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.grid}
      />
    </View>
  );
};

export const ProductGrid2x2 = React.memo(ProductGrid2x2Component);
