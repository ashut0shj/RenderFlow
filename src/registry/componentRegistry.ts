import React from 'react';
import { BlockRendererProps } from '../types/payload.types';
import { BannerHero } from '../components/blocks/BannerHero';
import { ProductGrid2x2 } from '../components/blocks/ProductGrid2x2';
import { DynamicCollection } from '../components/blocks/DynamicCollection';

class ComponentRegistry {
  private registry = new Map<string, React.ComponentType<BlockRendererProps>>();

  register(type: string, component: React.ComponentType<BlockRendererProps>): void {
    this.registry.set(type, component);
  }

  resolve(type: string): React.ComponentType<BlockRendererProps> | null {
    return this.registry.get(type) ?? null;
  }

  isRegistered(type: string): boolean {
    return this.registry.has(type);
  }
}

export const componentRegistry = new ComponentRegistry();

componentRegistry.register('BANNER_HERO', BannerHero as unknown as React.ComponentType<BlockRendererProps>);
componentRegistry.register('PRODUCT_GRID_2X2', ProductGrid2x2 as unknown as React.ComponentType<BlockRendererProps>);
componentRegistry.register('DYNAMIC_COLLECTION', DynamicCollection as unknown as React.ComponentType<BlockRendererProps>);
