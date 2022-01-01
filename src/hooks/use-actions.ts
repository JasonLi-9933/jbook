import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { useMemo } from "react";

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
		// only bind function one time
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};

/**
 * Usage
 * const {updateCell} = useActions();
 * updateCell("balabla");
 */
