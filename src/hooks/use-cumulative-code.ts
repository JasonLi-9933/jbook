import { useTypedSelector } from "./use-typed-selector";
export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => {
      return data[id];
    });
    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      var show = value => {
        const root = document.querySelector('#root');
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, document.querySelector('#root'));
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      }
      `;
    const showFuncNoOp = "var show = () => {};";
    let cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        cumulativeCode.push(c.id === cellId ? showFunc : showFuncNoOp); // make sure show functions from previous cell wouldn't take effect on later ones
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) break;
    }
    return cumulativeCode;
  }).join('\n');
};
