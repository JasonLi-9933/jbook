import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
const App = () => {
  const [input, setInput] = useState("");
  const ref = useRef<any>();
  const iframeRef = useRef<any>();

  const startService = async () => {
    // API for esbuild has changed for 0.9.0
    // initialize is used instead of startService
    ref.current = await esbuild.startService({
      worker: true,
      // wasmURL: "/esbuild.wasm",
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) return;

    iframeRef.current.srcdoc = html; // reset html in the iframe

    // const result = await ref.current.transform(input, {
    // 	loader: 'jsx',
    // 	target: 'es2015'
    // });
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*'); // triggers `message` event on window object of iframe
  };
  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', e => {
            try {
              eval(e.data);
            } catch (err) {
              let root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>' + err + '</h4></div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;
  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe title="preview" srcDoc={html} sandbox="allow-scripts" ref={iframeRef}></iframe>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
