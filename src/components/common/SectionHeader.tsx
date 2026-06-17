import React, { useMemo } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface SectionHeaderProps {
  title: string;
  style?: TextStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = React.memo(({ title, style }) => {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      text: {
        color: theme.text,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
        paddingHorizontal: 16,
      },
    });
  }, [theme]);

  return <Text style={[styles.text, style]}>{title}</Text>;
});
