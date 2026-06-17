import { ActionObject } from './action.types';
import { AppTheme } from './theme.types';
import { CampaignConfig } from './campaign.types';

export interface BaseBlock {
  id: string;
  type: string;
  visible?: boolean;
  action?: ActionObject;
}

export interface BannerHeroBlock extends BaseBlock {
  type: 'BANNER_HERO';
  imageUrl: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  badge?: string;
  rating?: number;
  action?: ActionObject;
}

export interface ProductGrid2x2Block extends BaseBlock {
  type: 'PRODUCT_GRID_2X2';
  title?: string;
  products: ProductItem[];
}

export interface CollectionItem {
  id: string;
  label: string;
  imageUrl: string;
  action?: ActionObject;
}

export interface DynamicCollectionBlock extends BaseBlock {
  type: 'DYNAMIC_COLLECTION';
  title: string;
  theme?: string;
  items: CollectionItem[];
}

export interface UnknownBlock extends BaseBlock {
  type: string;
}

export type SDUIBlock =
  | BannerHeroBlock
  | ProductGrid2x2Block
  | DynamicCollectionBlock
  | UnknownBlock;

export interface HomepagePayload {
  theme: AppTheme;
  campaign?: CampaignConfig;
  blocks: SDUIBlock[];
}
