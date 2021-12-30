import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";
import { useEffect, useState } from "react";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [editorWidth, setEditorWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < editorWidth) {
          setEditorWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [editorWidth]);

  let resizableProps: ResizableBoxProps;
  if (direction === "vertical") {
    resizableProps = {
      height: 400,
      width: Infinity,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, innerHeight * 0.1],
    };
  } else {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width: editorWidth,
      resizeHandles: ["e"],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.25, Infinity],
      onResizeStop: (event, data) => {
        console.log(data);
        setEditorWidth(data.size.width);
      },
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
