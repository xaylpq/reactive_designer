import { Key } from 'react';

export interface IRootPosition {
  x: number,
  y: number,
  scale: number,
  width: number,
  height: number
}

export interface IItemPosition {
  x: number,
  y: number
}

export interface IItemSize {
  width: number,
  height: number
}

export interface IItem {
  id: Key,
  name: String,
  isDisabled?: Boolean,
  position: IItemPosition,
  size: IItemSize,
  kind: String,
  type: String,
  isInterrupting?: Boolean,
  isDefault?: Boolean,
  clientId: Key,
  linkedModel?: String,
  linkedModelType?: String,
  adHocSubprocess?: Boolean,
  compensation?: Boolean,
  isHidden?: Boolean,
  isExpendable?: Boolean,
  titleRatio?: Number,
  order?: Number
}

export interface IRootProps {
  items: Array<IItem>
}
