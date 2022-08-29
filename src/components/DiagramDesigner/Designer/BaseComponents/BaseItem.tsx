import React, { DragEvent } from 'react';

import LayoutHook from './Hooks/LayoutHook';

import './scss/BaseItem.scss';
import { IBaseItemProps } from './Interfaces/IBaseItem';
import { IItemPosition, IItemSize } from '@src/components/DiagramDesigner/Designer/Interfaces/IRoot';

import { store } from '@src/app/store';
import { setItemPosition } from '@src/components/DiagramDesigner/designerReducer';

const styles = {
    item: (position: IItemPosition, size: IItemSize) => ({
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: size.width,
        height: size.height
    })
};

export default function BaseItem({ item }: IBaseItemProps) {
    const position = item.position;
    const size = item.size;
    const onDragStartItem = (event: DragEvent<HTMLDivElement>) => {
        LayoutHook.dragStart(event);
        event.dataTransfer.setDragImage(new Image(), 0, 0);
        event.stopPropagation();
    };

    const onDragDragItem = (event: DragEvent<HTMLDivElement>) => {
        const changedPosition = LayoutHook.dragDragItem(event, position as IItemPosition);
        store.dispatch(setItemPosition({item, changedPosition}));
        event.stopPropagation();
    };

    const onDragEndItem = (event: DragEvent<HTMLDivElement>) => {
        const changedPosition = LayoutHook.dragEndItem(event, position as IItemPosition);
        store.dispatch(setItemPosition({item, changedPosition}));
        event.stopPropagation();
    };

    return (
      <div
        className={'diagram-designer__item'}
        draggable={true}
        style={styles.item(position, size)}
        onDragStart={onDragStartItem}
        onDrag={onDragDragItem}
        onDragEnd={onDragEndItem}
        // onDragEnter={() => console.log('onDragEnter')} // наведение на элемент
      >
          {item.name}
      </div>
    );
}
