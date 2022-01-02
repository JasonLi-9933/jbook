import { useTypedSelector } from "../hooks/use-typed-selector";
import { useActions } from "../hooks/use-actions";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment, useRef, useEffect } from "react";
import "./cell-list.css";

const CellList: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const { fetchCells, saveCells } = useActions();
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });
  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map((cell, i) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellID={cell.id} isLastOne={i === cells.length - 1} />
    </Fragment>
  ));

  return (
    <div ref={listRef} className="list-container">
      <AddCell
        forceVisible={cells.length === 0}
        previousCellID={null}
        isLastOne={false}
      />
      {renderedCells}
    </div>
  );
};

export default CellList;
