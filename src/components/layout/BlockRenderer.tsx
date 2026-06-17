import React from 'react';
import { BlockRendererProps } from '../../types/payload.types';
import { componentRegistry } from '../../registry/componentRegistry';
import { FallbackBlock } from '../blocks/FallbackBlock';
import { BlockErrorBoundary } from './BlockErrorBoundary';

const BlockRendererComponent: React.FC<BlockRendererProps> = ({ block, onAction }) => {
  const ResolvedComponent = componentRegistry.resolve(block.type);

  return (
    <BlockErrorBoundary blockId={block.id}>
      {ResolvedComponent ? (
        <ResolvedComponent block={block} onAction={onAction} />
      ) : (
        <FallbackBlock blockType={block.type} />
      )}
    </BlockErrorBoundary>
  );
};

export const BlockRenderer = React.memo(BlockRendererComponent, (prevProps, nextProps) => {
  return prevProps.block.id === nextProps.block.id;
});
