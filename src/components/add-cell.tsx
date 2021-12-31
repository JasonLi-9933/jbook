import "./add-cell.css";
import { useActions } from "../hooks/use-actions";

interface AddCellProps {
  previousCellID: string | null;
  forceVisible?: boolean;
  isLastOne: boolean;
}

const AddCell: React.FC<AddCellProps> = ({
  previousCellID,
  forceVisible,
  isLastOne,
}) => {
  const { insertCellAfter } = useActions();
  const scrollToBottom = () => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
      console.log("autoscorll");
    }, 10); // wait for new cell to get rendered
  };

  const onClick = (
    previousCellID: string | null,
    cellType: "code" | "text"
  ) => {
    insertCellAfter(previousCellID, cellType);
    if (isLastOne) scrollToBottom();
  };

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          onClick={() => onClick(previousCellID, "code")}
          className="button is-rounded is-primary is-small"
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          onClick={() => onClick(previousCellID, "text")}
          className="button is-rounded is-primary is-small"
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
