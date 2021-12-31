import { useState, useEffect } from "react";
import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";
import Resizable from "./resizable";
import bundleCode from "../bundler";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const { updateCell } = useActions();

  useEffect(() => {
    let timer = setTimeout(async () => {
      let output = await bundleCode(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      // gets called next time useEffect callback get called
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            // initialValue="const root = document.querySelector('#root');"
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} bundlingErrorMessage={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
