export interface AddToCartAction {
  type: 'ADD_TO_CART';
  payload: {
    id: string;
    quantity?: number;
  };
}

export interface DeepLinkAction {
  type: 'DEEP_LINK';
  payload: {
    url: string;
  };
}

export interface ApplyMysteryGiftCouponAction {
  type: 'APPLY_MYSTERY_GIFT_COUPON';
  payload: {
    couponCode?: string;
  };
}

export interface OpenBookingAction {
  type: 'OPEN_BOOKING';
  payload: {
    eventId: string;
  };
}

export interface NavigateCategoryAction {
  type: 'NAVIGATE_CATEGORY';
  payload: {
    categorySlug: string;
  };
}

export type ActionObject =
  | AddToCartAction
  | DeepLinkAction
  | ApplyMysteryGiftCouponAction
  | OpenBookingAction
  | NavigateCategoryAction;

export type ActionHandler = (action: ActionObject) => void;
