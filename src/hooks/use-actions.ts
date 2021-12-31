import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(actionCreators, dispatch);
}

/**
 * Usage
 * const {updateCell} = useActions();
 * updateCell("balabla");
 */