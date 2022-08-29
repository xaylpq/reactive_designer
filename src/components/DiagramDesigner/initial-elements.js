import React from 'react';
import { MarkerType } from 'react-flow-renderer';

export const nodes = [
  {
    id: '1',
    data: {
      label: (
        <div className={'rect-element'}>
          <div className={'element-title'}>task</div>
          <div className={'element-linker'}>
            <div className='element-linker__plus'></div>
          </div>
        </div>
      ),
      type: 'task',
      size: { width: 80, height: 45 }
    },
    position: { x: 250, y: 0 },
    style: {
      background: '#fff',
      color: '#000000'
    }
  },
  {
    id: '2',
    data: {
      label: (
        <>
          This is a <strong>default node</strong>
        </>
      ),
      size: { width: 80, height: 45 }
    },
    position: { x: 100, y: 100 },
    parentNode: '1',
    targetPosition: 'right',
    // extent: 'parent', // запрет на вывод за пределы пэрента
  },
  { id: 'node-1', type: 'intermediateEvent', position: { x: 0, y: 0 }, data: { value: 123,name: 'event 1', size: { width: 30, height: 30 } }, label: <></>},
  // {
  //   label: JSX.Element;
  //   type: string;
  //   value?: undefined;
  //   width?: undefined;
  //   height?: undefined;
  //   name?: undefined;
  // }
  // {
  //   id: '3',
  //   data: {
  //     label: (
  //       <>
  //         This one has a <strong>custom style</strong>
  //       </>
  //     ),
  //   },
  //   position: { x: 400, y: 100 },
  //   sourcePosition: 'left',
  //   className: 'ffdsfsdfsdf',
  // },
  // {
  //   id: '4',
  //   position: { x: 250, y: 200 },
  //   data: {
  //     label: 'Another default node',
  //   },
  // },
  // {
  //   id: '5',
  //   data: {
  //     label: 'Node id: 5',
  //   },
  //   position: { x: 250, y: 325 },
  // },
  // {
  //   id: '6',
  //   type: 'output',
  //   data: {
  //     label: (
  //       <>
  //         An <strong>output node</strong>
  //       </>
  //     ),
  //   },
  //   position: { x: 100, y: 480 },
  // },
  // {
  //   id: '7',
  //   type: 'output',
  //   data: { label: 'Another output node' },
  //   position: { x: 400, y: 450 },
  // },
];

export const edges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', /*label: 'this is an edge label'*/ markerEnd: { type: MarkerType.ArrowClosed }, markerStart: { type: MarkerType.ArrowClosed }},
  // { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' },
  // {
  //   id: 'e3-4',
  //   source: '3',
  //   target: '4',
  //   type: 'floating',
  //   animated: true,
  //   label: 'animated floating edge',
  // },
  // {
  //   id: 'e4-5',
  //   source: '4',
  //   target: '5',
  //   type: 'smoothstep',
  //   // label: 'edge with arrow head',
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed,
  //   },
  //   markerStart: {
  //     type: MarkerType.ArrowClosed,
  //   },
  //   style: {
  //     fill: 'transparent'
  //   }
  // },
  // {
  //   id: 'e5-6',
  //   source: '5',
  //   target: '6',
  //   type: 'floating',
  //   label: 'smooth step edge',
  // },
  // {
  //   id: 'e5-7',
  //   source: '5',
  //   target: '7',
  //   type: 'step',
  //   style: { stroke: '#f6ab6c' },
  //   label: 'a step edge',
  //   animated: true,
  //   labelStyle: { fill: '#f6ab6c', fontWeight: 700 },
  // },
];


/* Reality is here */
const processTypes = {
  FLOW: 'Flow',
  TASK: 'Task',
  INTERMEDIATE_EVENT: 'IntermediateEvent',
  POOL: 'Pool',
  LANE: 'Lane'
}

const elements = [
  {
    "id": "vere.1323",
    "name": "Embedded subprocess 2",
    "isDisabled": false,
    "position": {
      "x": -910.0,
      "y": 100.0
    },
    "size": {
      "height": 100.0,
      "width": 305.0
    },
    "kind": "Embedded",
    "type": "Subprocess",
    "isInterrupting": false,
    "isDefault": false,
    "clientId": "3ab054f9-f117-4bc6-ba15-690df8adca4a",
    "linkedModel": "ver.47",
    "linkedModelType": "ProcessModel",
    "adHocSubprocess": false,
    "compensation": false,
    "isHidden": false,
    "isExpendable": false,
    "titleRatio": 0.0,
    "order": 0
  },
  {
    "id": "vere.1322",
    "name": "Task 3",
    "isDisabled": false,
    "position": {
      "x": -940.0,
      "y": -100.0
    },
    "size": {
      "height": 70.0,
      "width": 120.0
    },
    "kind": "User",
    "type": "Task",
    "isInterrupting": false,
    "isDefault": false,
    "clientId": "12ddf194-7d1e-4479-9b51-8b2b0a13fa52",
    "adHocSubprocess": false,
    "loop": "Sequential",
    "compensation": false,
    "isHidden": false,
    "isExpendable": false,
    "titleRatio": 0.0,
    "order": 0
  },
  {
    "id": "vere.1321",
    "name": "Embedded subprocess 1",
    "isDisabled": false,
    "position": {
      "x": -300.0,
      "y": 120.0
    },
    "size": {
      "height": 100.0,
      "width": 221.0
    },
    "kind": "Embedded",
    "type": "Subprocess",
    "isInterrupting": false,
    "isDefault": false,
    "clientId": "1a358be6-d93d-4360-9a5b-46e4e8ca7ba8",
    "linkedModel": "ver.46",
    "linkedModelType": "ProcessModel",
    "adHocSubprocess": false,
    "compensation": false,
    "isHidden": false,
    "isExpendable": false,
    "titleRatio": 0.0,
    "order": 0
  },
  {
    "id": "vere.1320",
    "name": "Task 2",
    "isDisabled": false,
    "position": {
      "x": -600.0,
      "y": -100.0
    },
    "size": {
      "height": 76.1616172790527,
      "width": 120.0
    },
    "kind": "User",
    "type": "Task",
    "isInterrupting": false,
    "isDefault": false,
    "clientId": "ffa7fe5b-ef82-4f6c-9e79-f969193e7d0e",
    "adHocSubprocess": false,
    "loop": "Parallel",
    "compensation": false,
    "isHidden": false,
    "isExpendable": false,
    "titleRatio": 0.0,
    "order": 0
  },
  {
    "id": "vere.1319",
    "name": "Task 1",
    "isDisabled": false,
    "position": {
      "x": -240.0,
      "y": -150.0
    },
    "size": {
      "height": 86.0,
      "width": 120.0
    },
    "kind": "Abstract",
    "type": "Task",
    "isInterrupting": false,
    "isDefault": false,
    "clientId": "6cc99a5d-1fc5-49f4-9e4d-cdf74c6ddf19",
    "adHocSubprocess": false,
    "compensation": false,
    "isHidden": false,
    "isExpendable": false,
    "titleRatio": 0.0,
    "order": 0
  }
];

const __getNodesAndEdges = (elements) => {
  const nodes = [];
  const edges = [];
  elements.forEach(element => {
    if (element.type === processTypes.Flow) {
      // todo из серверной модельки сделать темплейт
    }
  });
  return [nodes, edges];
}

// const [nodes, edges] = __getNodesAndEdges(elements);
