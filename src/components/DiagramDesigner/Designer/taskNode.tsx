import React, { FormEventHandler } from 'react';
import { useCallback } from 'react';
import { NodeProps } from 'react-flow-renderer';

function IntermediateEventNode({ data }: NodeProps) {
  const onChange = useCallback((evt: FormEventHandler<HTMLDivElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className={'rect-element'} onChange={onChange}>
      <div className={'element-title'}>task</div>
      <div className={'element-linker'}>
        <div className='element-linker__plus'></div>
      </div>
    </div>
  );
}

export default IntermediateEventNode;