// import React, { useState, DragEvent } from 'react';
//
// import RootView from './Designer/RootView';
// import DiagramPaletteView from './Palettes/DiagramPaletteView';
// import { IDiagramProps } from './Designer/Interfaces/IDiagram';
//
// import './Designer/scss/Diagram.scss';
//
// import { startItems } from './Designer/BaseComponents/CONSTANTS';
// import LayoutHook from './Designer/BaseComponents/Hooks/LayoutHook';
// import { store } from '@src/app/store';
// import { setDiagramItems, addItem } from '@src/components/DiagramDesigner/designerReducer';
// import { useAppSelector } from '@src/app/hooks';
// import { IItem } from '@src/components/DiagramDesigner/Designer/Interfaces/IRoot';
//
// const devPaletteItems = [
//     {
//         id: Math.random(),
//         name: 'drag',
//         type: 'Task',
//         size: { height: 60, width: 80 },
//         draggable: true
//     }
// ];
//
// export default function DiagramView({ sln = 'sln.1', id = 'vere.01' }: IDiagramProps) {
//     const [errorMessage, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(true);
//     const [items, setItems] = useState(startItems);
//     const [name, setName] = useState(null);
//     const [paletteItems, setPaletteItems] = useState([]);
//
//     // useEffect(() => {
//     //     Ajax.ProcessModelDiagram.GetSession(id).then(
//     //         result => {
//     //             setIsLoaded(true);
//     //             setItems(result.elements.filter(item => item.type !== 'Flow'));
//     //             setName(result.name);
//     //             setPaletteItems(() => {
//     //                 const diagramType = result.type;
//     //                 return devPaletteItems; // todo получить список кнопок
//     //             });
//     //         },
//     //         error => {
//     //             setIsLoaded(true);
//     //             setError(error);
//     //         }
//     //     );
//     // }, []);
//
//     if (errorMessage) {
//         return <div>Ошибка: {errorMessage.message}</div>;
//     } else if (!isLoaded) {
//         return <div>Загрузка...</div>;
//     }
//
//     const storeItems = useAppSelector((state) => state.content.designer.items);
//     if (!storeItems.length) {
//         store.dispatch(setDiagramItems(items));
//     }
//
//     const onDragEndPaletteItem = (event: DragEvent<HTMLDivElement>, item: IItem) => {
//         const position = LayoutHook.generatePosition(event);
//         const newItem = {
//             id: Math.random(),
//             name: item.name,
//             position,
//             size: item.size,
//             kind: item.kind,
//             type: item.type,
//             clientId: Math.random(),
//         }
//
//         store.dispatch(addItem(newItem));
//     };
//
//     const onClickPaletteItem = (event: DragEvent<HTMLDivElement>, item: { id: String; name: String; type: String; position: Object }) => {
//         console.log(event, item);
//     };
//
//     return (
//         <div className="diagram-designer">
//             <div className="diagram-designer__log">
//                 <strong>
//                     Элементы для {sln}: {name}
//                 </strong>
//                 <ul>
//                     {items.map(item => (
//                         <li key={item.id}>
//                             {item.type}: {item.name}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <DiagramPaletteView paletteItems={devPaletteItems} dragEndCallback={onDragEndPaletteItem} clickCallback={onClickPaletteItem} />
//             <RootView />
//         </div>
//     );
// }

import React, { MouseEvent as ReactMouseEvent, MouseEvent, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  ConnectionMode,
  ConnectionLineType,
  Controls,
  DefaultEdgeOptions,
  Edge,
  MiniMap,
  Node,
  XYPosition,
  MarkerType,
} from 'react-flow-renderer';

import useStore from '@src/app/store';

import IntermediateEventNode from './intermediateEventNode';
import Tooltip from './Designer/BaseComponents/Tooltip';
import FloatingEdge from './Designer/BaseComponents/FloatingEdge';

import './Designer/scss/Diagram.scss';
import { HandleType } from 'react-flow-renderer/dist/esm/types/handles';
import FloatingConnectionLine from '@src/components/DiagramDesigner/Designer/FloatingConnectionLine';
import { OnConnectStart } from 'react-flow-renderer/dist/esm/types/general';

const nodeTypes = { intermediateEvent: IntermediateEventNode };

const onInit = (reactFlowInstance: any) => console.log('flow loaded:', reactFlowInstance);

let lastDraggedNodeId = undefined as any;
let selectedNode = undefined as any;

const OverviewFlow = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onEdgeUpdate, onConnect, onSelectionChange, showTooltip } = useStore();
  const updateNodeParent = useStore((s) => s.updateNodeParent);
  const onShowTooltip = useStore((s) => s.onShowTooltip);

  const onNodeDragStart = (event: MouseEvent, node: Node) => {
    onShowTooltip(false);
    if (node.extent !== 'parent') {
      const newPos = { ...node.position };
      if (node.parentNode) {
        newPos.x = newPos.x + nodes.find(nd => nd.id === node.parentNode)?.data.size.width - node.data.size.width / 2; // ad hoc
        updateNodeParent(node.id, undefined, newPos);
      }
      lastDraggedNodeId = node.id;
    }
  };
  const onNodeDrag = (event: MouseEvent, node: Node) => {};
  const __elementOnElement = (pos: XYPosition, node: Node) => {
    const position = node.position;
    const size = node.data.size;
    if (pos.x > position.x && pos.x < position.x + size.width && pos.y > position.y && pos.y < position.y + size.height) {
      return true;
    }
    return;
  };
  const onNodeDragStop = useCallback((event: MouseEvent, node: Node) => {
      nodes.map((nd) => {
        if (nd.id === node.id) {
          nodes.map(element => {
            if (__elementOnElement(node.position, element)) {
              const newPos = { ...node.position };
              newPos.x -= element.data.size.width; // TODO FIXME
              newPos.x += node.data.size.width / 2; // TODO FIXME
              updateNodeParent(node.id, element.id, newPos);
            }
          });
        }
        return nd;
      })
  }, []);
  useEffect(() => { // ad hoc при размонтировании
    const lastNode = nodes.find(nd => nd.id === lastDraggedNodeId);
    if (lastNode && !lastNode.parentNode && lastNode.positionAbsolute && lastNode.position.x !== lastNode.positionAbsolute.x) {
      updateNodeParent(lastNode.id, lastNode.parentNode, lastNode.positionAbsolute);
    }
  });

  const onNodeClick = (event: MouseEvent, node: Node) => {
    if (!showTooltip) {
      onShowTooltip(true);
    }
    selectedNode = node;
  };
  const onNodeMouseEnter = (event: MouseEvent, node: Node) => {console.log(node.id, 'enter')}
  const onNodeMouseMove = (event: MouseEvent, node: Node) => {console.log(node.id, 'move')}
  const onNodeMouseLeave = (event: MouseEvent, node: Node) => {console.log(node.id, 'leave')}
  const onNodeContextMenu = (event: MouseEvent, node: Node) => {console.log(node)}
  const onNodeDoubleClick = (event: MouseEvent, node: Node) => {console.log(node)}

  const onNodesDelete = (nodes: Node[]) => {
    if (showTooltip) {
      onShowTooltip(false);
    }
  }

  const edgeTypes = {
    Flow: FloatingEdge
  };
  const defaultEdgeOptions: DefaultEdgeOptions = {
    type: 'Flow',
    animated: false
  };
  const onEdgeClick = (event: React.MouseEvent, node: Edge) => {
    if (!showTooltip) {
      onShowTooltip(true);
    }
    selectedNode = node;
  };

  // const onEdgeMouseEnter = () => {console.log('enter')}
  // const onEdgeMouseMove = () => {console.log('move')}
  // const onEdgeMouseLeave = () => {console.log('leave')}
  const onEdgeUpdateStart = (event: ReactMouseEvent, edge: Edge, handleType: HandleType) => {
    console.log('update start');
  }
  const onEdgeUpdateEnd = (event: MouseEvent) => {
    console.log('update end')
  }
  const onMouseDown = (event: MouseEvent) => {console.log(event, 'mouse down')}

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}

        onNodesChange={onNodesChange}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        // onNodeMouseEnter={onNodeMouseEnter}
        // onNodeMouseMove={onNodeMouseMove}
        // onNodeMouseLeave={onNodeMouseLeave}
        // onNodeContextMenu={onNodeContextMenu}
        // onNodeDoubleClick={onNodeDoubleClick}
        onNodesDelete={onNodesDelete}
        onNodeClick={onNodeClick}

        // onEdgeMouseEnter={onEdgeMouseEnter}
        // onEdgeMouseMove={onEdgeMouseMove}
        // onEdgeMouseLeave={onEdgeMouseLeave}
        // onMouseDown={onMouseDown}
        onEdgeClick={onEdgeClick}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onEdgesChange={onEdgesChange}

        onSelectionChange={onSelectionChange}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        onInit={onInit}

        defaultEdgeOptions={defaultEdgeOptions}
        edgeTypes={edgeTypes}
        // connectionLineComponent={FloatingConnectionLine} // drag float
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionMode = {ConnectionMode.Loose}

        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={[5,5]}
        minZoom={0.3}
        maxZoom={3}
        fitView
        deleteKeyCode='Delete'
        multiSelectionKeyCode='Control'
        attributionPosition="bottom-right"
      >
          <MiniMap
            // nodeStrokeColor={(n) => {
            //     if (n.style?.background) return n.style.background;
            // }}
            // nodeColor={(n) => {}}
            className={'arch-dd-minimap'}
            nodeBorderRadius={2}
          />
          <Controls />
          <Background color="#a5a5a5" gap={16} />
      </ReactFlow>
      <Tooltip selectedElement={selectedNode} showTooltip={showTooltip} onCloseTooltip={() => onShowTooltip(false)}/>
    </>
    );
};

export default OverviewFlow;
