import { useRef } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { useCartStore } from '../context/CartContext';
import { actionRegistry } from '../registry/actionRegistry';
import { ActionObject } from '../types/action.types';

export const useActionDispatcher = () => {
  // Call hooks inside to satisfy context coupling
  const campaignContext = useCampaign();
  const cartStore = useCartStore();
  const registeredRef = useRef(false);

  if (!registeredRef.current) {
    actionRegistry.register('ADD_TO_CART', (action) => {
      if (action.type === 'ADD_TO_CART') {
        cartStore.addItem(action.payload.id, action.payload.quantity);
      }
    });

    actionRegistry.register('DEEP_LINK', (action) => {
      if (action.type === 'DEEP_LINK') {
        console.log('Navigate to:', action.payload.url);
      }
    });

    actionRegistry.register('NAVIGATE_CATEGORY', (action) => {
      if (action.type === 'NAVIGATE_CATEGORY') {
        console.log('Category:', action.payload.categorySlug);
      }
    });

    actionRegistry.register('OPEN_BOOKING', (action) => {
      if (action.type === 'OPEN_BOOKING') {
        console.log('Booking:', action.payload.eventId);
      }
    });

    actionRegistry.register('APPLY_MYSTERY_GIFT_COUPON', (action) => {
      if (action.type === 'APPLY_MYSTERY_GIFT_COUPON') {
        console.log('Coupon applied:', action.payload.couponCode);
      }
    });

    registeredRef.current = true;
  }

  const dispatch = (action: ActionObject) => {
    actionRegistry.dispatch(action);
  };

  return dispatch;
};
