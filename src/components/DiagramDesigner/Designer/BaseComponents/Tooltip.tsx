import React from 'react';
import { useCallback } from 'react';
import { Node } from 'react-flow-renderer/dist/esm/types/nodes';

interface ITooltipProps {
  selectedElement: Node,
  showTooltip: boolean,
  onCloseTooltip: () => void
}

const padding = {
  left: 10,
  top: 0
};

const containerWidth = 150;

const Tooltip = ({ selectedElement, showTooltip, onCloseTooltip }: ITooltipProps) => {
  const onChange = useCallback((evt: { target: { value: any; }; }) => {
    console.log(evt.target.value);
  }, []);
  const position = getPosition(selectedElement);

  const hideTooltip = () => {
    onCloseTooltip();
  };

  return (
    <div className='diagram-designer__tooltip'
         hidden={!showTooltip}
         style={{ ...position, width: containerWidth }}>
      <div className='diagram-designer-tooltip__container'>
        <div className={'close'} onClick={hideTooltip}></div>
      </div>
    </div>
  );
}

export default Tooltip;

const getPosition = (selectedElement: Node) => {
  let position = { top: 0, left: 0 }
  const selectedNode = document.getElementsByClassName('selected')[0];
  const rootPosition = document.getElementById('root').getBoundingClientRect();
  let selectedNodeRect;
  if (selectedNode) {
    selectedNodeRect = selectedNode.getBoundingClientRect();
  }

  position.left = selectedNodeRect?.left - rootPosition.x + selectedNodeRect?.width + padding.left;
  position.top = selectedNodeRect?.top + padding.top;

  return position;
};
