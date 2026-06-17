import { AppTheme } from './theme.types';
import { DynamicCollectionBlock } from './payload.types';

export type CampaignId = 'BACK_TO_SCHOOL' | 'SUMMER_PLAYHOUSE' | 'MYSTERY_CARNIVAL';

export interface CampaignConfig {
  id: CampaignId;
  theme: AppTheme;
  overlayAnimation?: string;
  overlayType?: 'FULL_SCREEN_OVERLAY';
  specialRows?: DynamicCollectionBlock[];
}
