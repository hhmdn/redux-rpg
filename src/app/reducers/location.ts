import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { LocationActions } from 'app/actions';
import { LocationModel } from 'app/models';
import { CONSTANTS } from 'app/constants';


// iniitial values
const initialState: RootState.LocationState =
{
  posX: 160,
  posY: 160,
  directionFacing: 'frontStand',
  direction: 0,
  backgroundX: 0,
  backgroundY: 0,
};

export const LocationReducer = handleActions<RootState.LocationState, LocationModel>(
  {
    [LocationActions.Type.MOVE_UP]: (state, action) => {
      return { ...state, posY: (state.posY - CONSTANTS.BIT_SIZE) };
    },
    [LocationActions.Type.MOVE_DOWN]: (state, action) => {
      return { ...state, posY: (state.posY + CONSTANTS.BIT_SIZE) };
    },
    [LocationActions.Type.MOVE_RIGHT]: (state, action) => {
      return { ...state, posX: (state.posX + CONSTANTS.BIT_SIZE) };
    },
    [LocationActions.Type.MOVE_LEFT]: (state, action) => {
      return { ...state, posX: (state.posX - CONSTANTS.BIT_SIZE) };
    },
    [LocationActions.Type.UPDATE_DIRECTION]: (state, action) => {
     if (action.payload) {
        if (action.payload.direction === CONSTANTS.KEY_ARROW_UP) {
          if (state.directionFacing === CONSTANTS.DIRECTION_BACK_STAND) {
            return { ...state, directionFacing: CONSTANTS.DIRECTION_BACK_RIGHT};
          }
          if (state.directionFacing === CONSTANTS.DIRECTION_BACK_RIGHT) {
            return { ...state, directionFacing: CONSTANTS.DIRECTION_BACK_LEFT};
          }
          if (state.directionFacing === CONSTANTS.DIRECTION_BACK_LEFT) {
            return { ...state, directionFacing: CONSTANTS.DIRECTION_BACK_RIGHT};
          }

          return { ...state, directionFacing: CONSTANTS.DIRECTION_BACK_STAND};
        }
        if (action.payload.direction === CONSTANTS.KEY_ARROW_DOWN) {
          if (state.directionFacing === CONSTANTS.DIRECTION_FRONT_STAND) {
            return { ...state, directionFacing: CONSTANTS.DIRECTION_FRONT_RIGHT};
          }
          if (state.directionFacing === CONSTANTS.DIRECTION_FRONT_RIGHT) {
            return { ...state, directionFacing: CONSTANTS.DIRECTION_FRONT_LEFT};
          }
          if (state.directionFacing === CONSTANTS.DIRECTION_FRONT_LEFT) {
            return { ...state, directionFacing: CONSTANTS.DIRECTION_FRONT_RIGHT};
          }

          return { ...state, directionFacing: CONSTANTS.DIRECTION_FRONT_STAND};
        }
        if (action.payload.direction === CONSTANTS.KEY_ARROW_LEFT) {
            if (state.directionFacing === CONSTANTS.DIRECTION_LEFT_STAND) {
              return { ...state, directionFacing: CONSTANTS.DIRECTION_LEFT_RIGHT};
            }
            if (state.directionFacing === CONSTANTS.DIRECTION_LEFT_RIGHT) {
              return { ...state, directionFacing: CONSTANTS.DIRECTION_LEFT_LEFT};
            }
            if (state.directionFacing === CONSTANTS.DIRECTION_LEFT_LEFT) {
              return { ...state, directionFacing: CONSTANTS.DIRECTION_LEFT_RIGHT};
            }

            return { ...state, directionFacing: CONSTANTS.DIRECTION_LEFT_STAND};
          }
          if (action.payload.direction === CONSTANTS.KEY_ARROW_RIGHT) {
            if (state.directionFacing === CONSTANTS.DIRECTION_RIGHT_STAND) {
              return { ...state, directionFacing: CONSTANTS.DIRECTION_RIGHT_RIGHT};
            }
            if (state.directionFacing === CONSTANTS.DIRECTION_RIGHT_RIGHT) {
              return { ...state, directionFacing: CONSTANTS.DIRECTION_RIGHT_LEFT};
            }
            if (state.directionFacing === CONSTANTS.DIRECTION_RIGHT_LEFT) {
              return { ...state, directionFacing: CONSTANTS.DIRECTION_RIGHT_RIGHT};
            }

            return { ...state, directionFacing: CONSTANTS.DIRECTION_RIGHT_STAND};
          }
          if (action.payload.direction === 0) {
            if ((state.directionFacing).startsWith('f')) {
              return { ...state, directionFacing: CONSTANTS.DIRECTION_FRONT_STAND};
            }
            else if ((state.directionFacing).startsWith('b')) {
              return { ...state, directionFacing: CONSTANTS.DIRECTION_BACK_STAND};
            }
            else if ((state.directionFacing).startsWith('r')) {
              return { ...state, directionFacing: CONSTANTS.DIRECTION_RIGHT_STAND};
            }
            else if ((state.directionFacing).startsWith('l')) {
              return { ...state, directionFacing: CONSTANTS.DIRECTION_LEFT_STAND};
            }

            return { ...state, directionFacing: CONSTANTS.DIRECTION_FRONT_STAND};
          }
        }  
      return { ...state };
    },
    [LocationActions.Type.SCROLL_RIGHT]: (state, action) => {
      return { ...state, backgroundX: state.backgroundX - ((CONSTANTS.SQUARES_PER_ROW/2) * CONSTANTS.BIT_SIZE) };
    },
    [LocationActions.Type.SCROLL_LEFT]: (state, action) => {
      return { ...state, backgroundX: (state.backgroundX + ((CONSTANTS.SQUARES_PER_ROW/2) * CONSTANTS.BIT_SIZE)) };
    },
    [LocationActions.Type.SCROLL_UP]: (state, action) => {
      return { ...state, backgroundY: (state.backgroundY + ((CONSTANTS.SQUARES_PER_ROW/2) * CONSTANTS.BIT_SIZE)) };
    },
    [LocationActions.Type.SCROLL_DOWN]: (state, action) => {
      return { ...state, backgroundY: (state.backgroundY - ((CONSTANTS.SQUARES_PER_ROW/2) * CONSTANTS.BIT_SIZE)) };
    },
  },
  initialState
);
