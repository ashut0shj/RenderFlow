import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCartStore } from '../../context/CartContext';
import { useTheme } from '../../hooks/useTheme';

const CartBadge: React.FC = () => {
  const count = useCartStore((state) => state.totalCount);
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      badge: {
        backgroundColor: theme.accent,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
        marginLeft: 6,
      },
      text: {
        color: theme.background,
        fontSize: 10,
        fontWeight: 'bold',
      },
    });
  }, [theme]);

  if (count === 0) return null;

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

export const Header: React.FC = () => {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        height: 56,
        backgroundColor: theme.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      title: {
        fontSize: 18,
        fontWeight: '800',
        color: theme.background,
      },
      rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    });
  }, [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All4Kids 🛒</Text>
      <View style={styles.rightSection}>
        <CartBadge />
      </View>
    </View>
  );
};
