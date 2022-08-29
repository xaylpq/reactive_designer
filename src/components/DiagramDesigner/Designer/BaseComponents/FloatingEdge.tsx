import React, { MouseEvent, useCallback } from 'react';
import { useStore, getBezierPath, getSmoothStepPath } from 'react-flow-renderer';
import { Node } from 'react-flow-renderer/dist/esm/types/nodes';
import { getEdgeParams } from './FlowService';
import { EdgeProps } from 'react-flow-renderer/dist/esm/types/edges';

function FloatingEdge({ id, source, target, markerEnd, style }: EdgeProps) {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source])) as Node;
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target])) as Node;

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  const d = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  const onMouseDown = (event: MouseEvent) => {console.log(event, 'mouse down')}
  const onMouseEnter = (event: MouseEvent) => {console.log(event, 'mouse enter')}
  const onMouseMove = (event: MouseEvent) => {console.log(event, 'mouse enter')}
  const onMouseLeave = (event: MouseEvent) => {console.log(event, 'mouse enter')}


  const onClick = (event: MouseEvent) => {console.log(event, 'click')}

  return (
    // <g className="react-flow__connection" >
      <path
        id={id}
        className="react-flow__edge-path"
        d={d} markerEnd={markerEnd}
        style={style}
      />
    // </g>
  );
}

export default FloatingEdge;
