import { Key } from 'react';

interface IPaletteItem {
  id: Key,
  draggable: boolean
}

export interface IDiagramPaletteProps {
  paletteItems: Array<IPaletteItem>;
  dragEndCallback: Function;
  clickCallback: Function;
}
