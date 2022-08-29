import React from 'react';
import { useCallback } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';

function IntermediateEventNode({ data }: NodeProps) {
  const onChange = useCallback((evt: { target: { value: any; }; }) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="intermediate-event__node" style={{width: data.size.width, height: data.size.height}}>
      <Handle type="target" position={Position.Top} id="b" isConnectable={true}/>
      <Handle type="target" position={Position.Left} id="c" isConnectable={true}/>
      <svg xmlns={"http://www.w3.org/2000/svg"}
           viewBox={"0 0 24 24"}
           style={{width: '100%', height: '100%'}}>
        <circle fill={'yellow'} stroke={'#5d5d5d'} cx={12} cy={12} r={11} />
      </svg>
      <div style={{textAlign: 'center'}}>{data.name}</div>
      <Handle type="source" position={Position.Bottom} id="f" isConnectable={true}/>
      <Handle type="source" position={Position.Right} id="h" isConnectable={true}/>
    </div>
  );
}

export default IntermediateEventNode;