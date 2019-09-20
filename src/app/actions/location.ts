import { createAction } from 'redux-actions';

export namespace LocationActions {
  export enum Type {
    MOVE_UP = 'MOVE_UP',
    MOVE_DOWN = 'MOVE_DOWM',
    MOVE_RIGHT = 'MOVE_RIGHT',
    MOVE_LEFT = 'MOVE_LEFT',
    UPDATE_DIRECTION = 'UPDATE_DIRECTION',
    SCROLL_RIGHT = 'SCROLL_RIGHT',
    SCROLL_LEFT = 'SCROLL_LEFT',
    SCROLL_UP = 'SCROLL_UP',
    SCROLL_DOWN = 'SCROLL_DOWN',
  }

  export const moveUp = createAction(Type.MOVE_UP);
  export const moveDown = createAction(Type.MOVE_DOWN);
  export const moveRight = createAction(Type.MOVE_RIGHT);
  export const moveLeft = createAction(Type.MOVE_LEFT);
  export const scrollRight = createAction(Type.SCROLL_RIGHT);
  export const scrollLeft = createAction(Type.SCROLL_LEFT);
  export const scrollUp = createAction(Type.SCROLL_UP);
  export const scrollDown = createAction(Type.SCROLL_DOWN);

  export function updateDirection(direction: number) {
    return {
      type: Type.UPDATE_DIRECTION,
      payload: {direction},
    };
  }
}


export type LocationActions = Omit<typeof LocationActions, 'Type'>;
