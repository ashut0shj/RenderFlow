import { ActionObject } from '../types/action.types';

export type ActionHandler = (action: ActionObject) => void;

class ActionRegistry {
  private handlers = new Map<string, ActionHandler>();

  register(type: string, handler: ActionHandler): void {
    this.handlers.set(type, handler);
  }

  dispatch(action: ActionObject): void {
    const handler = this.handlers.get(action.type);
    if (handler) {
      handler(action);
    } else {
      console.warn(`No registered handler for action type: ${action.type}`);
    }
  }

  getRegisteredTypes(): string[] {
    return Array.from(this.handlers.keys());
  }
}

export const actionRegistry = new ActionRegistry();
