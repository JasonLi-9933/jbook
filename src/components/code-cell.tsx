import { useState, useEffect } from "react";
import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";
import Resizable from "./resizable";
import bundleCode from "../bundler";
const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState('');

  useEffect(() => {
    let timer = setTimeout(async () => {
      let output = await bundleCode(input);
      setCode(output.code);
      setErr(output.err)
    }, 1000);

    return () => {
      // gets called next time useEffect callback get called
      clearTimeout(timer);
    }
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const root = document.querySelector('#root');"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview code={code} bundlingErrorMessage={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
