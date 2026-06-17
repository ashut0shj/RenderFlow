import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { ProductItem } from '../../types/payload.types';
import { ActionHandler } from '../../types/action.types';
import { useCartStore } from '../../context/CartContext';
import { useTheme } from '../../hooks/useTheme';
import { getCachedImageProps } from '../../utils/imageCache';

interface ProductCardProps {
  item: ProductItem;
  onAction: ActionHandler;
  style?: ViewStyle;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({ item, onAction, style }) => {
  const theme = useTheme();
  // Subscribes only to changes in this item's cart quantity
  const qty = useCartStore((state) => state.items[item.id] ?? 0);

  const styles = useMemo(() => {
    return StyleSheet.create({
      card: {
        backgroundColor: theme.surface,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: theme.text,
        flex: 1,
        margin: 6,
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      },
      imageContainer: {
        position: 'relative',
        width: '100%',
        height: 120,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 8,
        backgroundColor: theme.surface,
      },
      image: {
        width: '100%',
        height: '100%',
      },
      badgeContainer: {
        position: 'absolute',
        top: 6,
        left: 6,
        backgroundColor: theme.accent,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
      },
      badgeText: {
        color: theme.background,
        fontSize: 10,
        fontWeight: 'bold',
      },
      ratingContainer: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
      },
      ratingText: {
        color: theme.background,
        fontSize: 10,
        fontWeight: 'bold',
      },
      name: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.text,
        height: 40,
        marginBottom: 4,
      },
      price: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.primary,
        marginBottom: 8,
      },
      buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto',
      },
      addButton: {
        backgroundColor: theme.primary,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        flex: 1,
        alignItems: 'center',
      },
      addButtonText: {
        color: theme.background,
        fontSize: 12,
        fontWeight: '700',
      },
      quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      quantityText: {
        marginHorizontal: 12,
        fontSize: 14,
        fontWeight: '700',
        color: theme.text,
      },
      quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: theme.secondary,
        alignItems: 'center',
        justifyContent: 'center',
      },
      quantityButtonText: {
        color: theme.text,
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 18,
      },
    });
  }, [theme]);

  const handleAdd = () => {
    onAction({
      type: 'ADD_TO_CART',
      payload: { id: item.id, quantity: 1 },
    });
  };

  const handleRemove = () => {
    useCartStore.getState().removeItem(item.id);
  };

  return (
    <View style={[styles.card, style]}>
      <View style={styles.imageContainer}>
        <Image {...getCachedImageProps(item.imageUrl)} style={styles.image} />
        {item.badge ? (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        ) : null}
        {item.rating ? (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {item.rating}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.name} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.price}>₹{item.price}</Text>

      <View style={styles.buttonContainer}>
        {qty === 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={handleAdd} activeOpacity={0.8}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton} onPress={handleRemove} activeOpacity={0.8}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{qty}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={handleAdd} activeOpacity={0.8}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export const ProductCard = React.memo(ProductCardComponent, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
});
