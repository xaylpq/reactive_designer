import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem, IItemPosition } from '@src/components/DiagramDesigner/Designer/Interfaces/IRoot';

interface RootPosition {
  x: number,
  y: number,
  scale: number,
  width: number,
  height: number
}

interface DesignerState {
  value: number,
  rootPosition: RootPosition,
  items: Array<IItem>
}

const initialState: DesignerState = {
  value: 0,
  rootPosition: {
    x: 0,
    y: 0,
    scale: 0,
    width: 10,
    height: 10
  },
  items: []
}

const designerSlice = createSlice({
  name: 'designer',
  initialState,
  reducers: {
    setDiagramItems(state, action: PayloadAction<Array<IItem>>) {
      state.items = action.payload;
    },
    addItem(state, action: PayloadAction<IItem>) {
      state.items.push(action.payload);
    },
    setRootPosition(state, action: PayloadAction<RootPosition>) {
      state.rootPosition = action.payload;
    },
    setItemPosition(state, action: PayloadAction<{item: IItem, changedPosition: IItemPosition}>) {
      const item = state.items.find(item => item.id === action.payload.item.id);
      item.position = action.payload.changedPosition;
    }
  },
})

export const { addItem, setDiagramItems, setRootPosition, setItemPosition } = designerSlice.actions;
export default designerSlice.reducer;
