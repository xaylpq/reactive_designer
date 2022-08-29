// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import designerReducer from '../components/DiagramDesigner/designerReducer';
//
// export const store = configureStore({
//   reducer: {
//     // root: rootReducer,
//     // breadcrumbs: breadcrumbsReducer,
//     // navigation: navigationReducer,
//     content: combineReducers({
//       // pageReducer,
//       designer: designerReducer
//     }),
//     // right: rightReducer
//   }
// });
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import create from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  OnSelectionChangeFunc,
  OnSelectionChangeParams,
  OnEdgeUpdateFunc,
  updateEdge,
} from 'react-flow-renderer';

import { initialNodes, initialEdges } from './initial-elements';
import { XYPosition } from 'react-flow-renderer/dist/esm/types';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onEdgeUpdate: OnEdgeUpdateFunc;
  onSelectionChange: OnSelectionChangeFunc;
  showTooltip: boolean;
  onShowTooltip: (show: boolean) => void;
  updateNodeParent: (nodeId: string, parentId: string, pos: XYPosition) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  showTooltip: false,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  onEdgeUpdate: (oldEdge, newConnection) => {
    set({
      edges: updateEdge(oldEdge, newConnection, get().edges),
    });
  },
  onSelectionChange: ({ nodes, edges }: OnSelectionChangeParams) => {
    if (nodes.length === 1 || edges.length === 1) {
      set({ showTooltip: true });
    } else  {
      set({ showTooltip: false });
    }
  },
  onShowTooltip: (showTooltip: boolean) => {
    set({ showTooltip });
  },
  updateNodeParent: (nodeId: string, parentId: string, pos: XYPosition) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.parentNode = parentId;
          node.position = pos;
        }
        return node;
      }),
    });
  },
}));

export default useStore;
