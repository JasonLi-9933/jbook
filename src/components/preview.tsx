import { useRef, useEffect } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  bundlingErrorMessage: string;
}
const html = `
	<html>
		<head></head>
		<body>
			<div id="root"></div>
			<script>
				const handleError = (err) => {
					let root = document.querySelector('#root');
					root.innerHTML = '<div style="color: red;"><h4>' + err + '</h4></div>';
					console.error(err);
				}
				window.addEventListener('error', (e) => {
					e.preventDefault();
					// will be used to handle async errors
					handleError(e.error);
				});
				window.addEventListener('message', e => {
					try {
						eval(e.data);
					} catch (err) {
						handleError(err);
					}
				}, false);
			</script>
		</body>
	</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, bundlingErrorMessage }) => {
  const iframeRef = useRef<any>();
  useEffect(() => {
    iframeRef.current.srcdoc = html; // reset html in the iframe
    setTimeout(() => {
      // wait for new html get set up
      iframeRef.current.contentWindow.postMessage(code, "*"); // triggers `message` event on window object of iframe
    }, 50);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
      />
			{bundlingErrorMessage && <div className="preview-error">{bundlingErrorMessage}</div>}
    </div>
  );
};

export default Preview;
