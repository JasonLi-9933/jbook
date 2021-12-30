import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import "./text-editor.css";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const textEditorRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState("# Header");

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        textEditorRef.current &&
        e.target &&
        textEditorRef.current.contains(e.target as Node)
      ) {
        return;
      }
      // make sure set `editing` to false only when clicking outside the text editor
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={textEditorRef}>
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </div>
    );
  }
  return (
    <div
      onClick={() => {
        setEditing(true);
      }}
      className="text-editor card"
    >
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
