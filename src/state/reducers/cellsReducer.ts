import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import produce from "immer";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const _reducer = (state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return;

    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;
			state.order[index] = state.order[targetIndex];
			state.order[targetIndex] = action.payload.id;
      return;

    case ActionType.INSERT_CELL_BEFORE:
			const newCell: Cell = {
				id: randomId(),
				type: action.payload.type,
				content: '',
			}
			state.data[newCell.id] = newCell;

      const i = state.order.findIndex((id) => id === action.payload.id);
			if (i < 0) {
				state.order.push(newCell.id);
			} else {
				state.order.splice(i, 0, newCell.id);
			}
      return;
    default:
      return state;
  }
};

const randomId = () => {
	return Math.random().toString(36).substring(2,7);
}

// passing initial state as second argument avoid getting errors
// saying return value is undefined
const reducer = produce(_reducer, initialState);

export default reducer;
