import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CampaignConfig, CampaignId } from '../types/campaign.types';

export interface CampaignContextType {
  activeCampaign: CampaignConfig | null;
  setCampaign: (id: CampaignId | null) => Promise<void>;
}

export const CampaignContext = createContext<CampaignContextType | null>(null);

const campaignMap: Record<CampaignId, () => Promise<any>> = {
  BACK_TO_SCHOOL: () => import('../assets/campaigns/back_to_school.json'),
  SUMMER_PLAYHOUSE: () => import('../assets/campaigns/summer_playhouse.json'),
  MYSTERY_CARNIVAL: () => import('../assets/campaigns/mystery_carnival.json'),
};

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCampaign, setActiveCampaign] = useState<CampaignConfig | null>(null);

  const setCampaign = async (id: CampaignId | null) => {
    if (!id) {
      setActiveCampaign(null);
      return;
    }
    try {
      const module = await campaignMap[id]();
      const data = module.default || module;
      setActiveCampaign(data as CampaignConfig);
    } catch (error) {
      console.error('Failed to load campaign data:', error);
    }
  };

  return (
    <CampaignContext.Provider value={{ activeCampaign, setCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
