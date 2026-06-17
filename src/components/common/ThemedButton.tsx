import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ThemedButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const ThemedButton: React.FC<ThemedButtonProps> = React.memo(({ label, onPress, style }) => {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      button: {
        backgroundColor: theme.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: theme.background,
        fontSize: 14,
        fontWeight: 'bold',
      },
    });
  }, [theme]);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} activeOpacity={0.8}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
});
