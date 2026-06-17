import React, { useEffect } from 'react';

interface FallbackBlockProps {
  blockType: string;
}

const FallbackBlockComponent: React.FC<FallbackBlockProps> = ({ blockType }) => {
  useEffect(() => {
    if (__DEV__) {
      console.warn(`[SDUI] Unknown block type dropped: "${blockType}"`);
    }
  }, [blockType]);

  return null;
};

export const FallbackBlock = React.memo(FallbackBlockComponent);
