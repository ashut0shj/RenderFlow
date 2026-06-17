import React, { ReactNode } from 'react';
import { CampaignProvider } from './CampaignContext';
import { ThemeProvider } from './ThemeContext';
import { AppTheme } from '../types/theme.types';

interface AppProvidersProps {
  children: ReactNode;
  initialTheme: AppTheme;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children, initialTheme }) => {
  return (
    <CampaignProvider>
      <ThemeProvider initialTheme={initialTheme}>
        {children}
      </ThemeProvider>
    </CampaignProvider>
  );
};

export * from './CampaignContext';
export * from './ThemeContext';
export * from './CartContext';
