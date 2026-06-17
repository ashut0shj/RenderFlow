import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { AppTheme } from '../types/theme.types';
import { useCampaign } from './CampaignContext';

export const ThemeContext = createContext<AppTheme | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme: AppTheme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const { activeCampaign } = useCampaign();

  const mergedTheme = useMemo(() => {
    if (activeCampaign && activeCampaign.theme) {
      return {
        ...initialTheme,
        ...activeCampaign.theme,
      };
    }
    return initialTheme;
  }, [initialTheme, activeCampaign]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
