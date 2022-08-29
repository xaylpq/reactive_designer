interface IPaletteItem {
  draggable: boolean;
  name?: String;
}

export interface IPaletteItemComponentProps {
  item: IPaletteItem;
  dragEndCallback: Function;
  clickCallback: Function;
}