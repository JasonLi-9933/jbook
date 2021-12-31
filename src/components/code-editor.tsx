import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef, useEffect, useState } from "react";
import "./code-editor.css";
interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();
  const [defaultCode, _] = useState(initialValue);
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    // get the current value from editor
    let unformatted = editorRef.current.getModel().getValue();
    // format the value
    let formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  const onResetClick = () => {
    editorRef.current.setValue(defaultCode);
  };

  return (
    <div className="editor-wrapper">
      <button
        onClick={onFormatClick}
        className="button button-format is-primary is-small button-hide"
      >
        Format
      </button>
      <button
        onClick={onResetClick}
        className="button button-reset is-link is-small button-hide"
      >
        Reset
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height="100%"
        language="javascript"
        theme="dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 2,
          fontSize: 16,
          scrollBeyondLastLine: false,
          // automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
