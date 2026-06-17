import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { AppProviders, useTheme } from './src/context';
import { Header } from './src/components/common';
import { HomeFeed } from './src/components/layout';
import { CampaignOverlay, CampaignSwitcher } from './src/components/campaign';
import homepagePayload from './src/assets/mock/homepage.json';
import { HomepagePayload } from './src/types/payload.types';

const castedPayload = homepagePayload as unknown as HomepagePayload;

function AppContent() {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      safeArea: {
        flex: 1,
        backgroundColor: theme.background || '#FFFFFF',
      },
    });
  }, [theme]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={theme.background === '#FFFFFF' ? 'dark-content' : 'light-content'}
        backgroundColor={theme.primary}
      />
      <Header />
      <HomeFeed payload={castedPayload} />
      <CampaignOverlay />
      <CampaignSwitcher />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AppProviders initialTheme={castedPayload.theme}>
      <AppContent />
    </AppProviders>
  );
}
