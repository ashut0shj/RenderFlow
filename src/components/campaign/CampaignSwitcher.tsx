import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useCampaign } from '../../hooks/useCampaign';
import { ThemedButton } from '../common/ThemedButton';

const CampaignSwitcherComponent: React.FC = () => {
  const { setCampaign } = useCampaign();

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        position: 'absolute',
        bottom: 24,
        left: 16,
        right: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        zIndex: 1000,
        flexDirection: 'row',
      },
      scrollContent: {
        alignItems: 'center',
      },
      button: {
        marginHorizontal: 6,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedButton
          label="Default"
          onPress={() => setCampaign(null)}
          style={styles.button}
        />
        <ThemedButton
          label="Back to School"
          onPress={() => setCampaign('BACK_TO_SCHOOL')}
          style={styles.button}
        />
        <ThemedButton
          label="Summer Playhouse"
          onPress={() => setCampaign('SUMMER_PLAYHOUSE')}
          style={styles.button}
        />
        <ThemedButton
          label="Mystery Carnival"
          onPress={() => setCampaign('MYSTERY_CARNIVAL')}
          style={styles.button}
        />
      </ScrollView>
    </View>
  );
};

export const CampaignSwitcher = React.memo(CampaignSwitcherComponent);
