import { Edge, MarkerType, Node } from 'react-flow-renderer';

export const initialNodes = [
  {
    id: '1',
    data: {
      label: 'Task',
      type: 'task',
      size: { width: 280, height: 150 }
    },
    position: { x: 250, y: 0 },
    zIndex: -1,
    style: {
      background: '#fff',
      color: '#000000',
      width: 280,
      height: 150
    }
  },
  {
    id: '2',
    data: {
      label: 'item 2',
      size: { width: 100, height: 45 }
    },
    position: { x: 10, y: 100 },
    style: { maxWidth: 100, maxHeight: 45 },
    // parentNode: '1',
    targetPosition: 'left',
    sourcePosition: 'right',
    extent: 'parent', // запрет на вывод за пределы пэрента
  },
  {
    id: '3',
    data: {
      label: 'item 3',
      size: { width: 80, height: 45 }
    },
    targetPosition: 'left',
    sourcePosition: 'right',
    position: { x: 80, y: 150 },
  },
  {
    id: '4',
    data: {
      label: 'item 4',
      size: { width: 80, height: 45 }
    },
    targetPosition: 'left',
    sourcePosition: 'right',
    position: { x: 80, y: 0 },
  },
 { id: 'node-1', type: 'intermediateEvent', position: { x: 0, y: 0 }, data: { value: 123,name: 'event 1', size: { width: 30, height: 30 } }, label: 'gdsgf'}
] as Node[];

  export const initialEdges = [
    {
      id: 'e3-2',
      source: '3',
      target: '4',
      type: 'Flow',
      // label: 'this is an edge label',
      markerEnd: { type: MarkerType.ArrowClosed },
      // markerStart: { type: MarkerType.ArrowClosed },
    },
    {
      id: 'e4-2',
      source: '4',
      target: '2',
      type: 'smoothstep', /*label: 'this is an edge label'*/
      markerEnd: { type: MarkerType.ArrowClosed },
      // markerStart: { type: MarkerType.ArrowClosed },
    },
  ] as unknown as Edge[];

