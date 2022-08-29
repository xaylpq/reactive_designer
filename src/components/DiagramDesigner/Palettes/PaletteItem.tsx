import React from 'react';

import { IPaletteItemComponentProps } from './Interfaces/IPaletteItem';

import './scss/PaletteItem.scss';

export default function PaletteItem({ item, dragEndCallback, clickCallback }: IPaletteItemComponentProps) {
    const onDragStartItem = (event: React.SyntheticEvent) => {
        event.stopPropagation();
    };

    const onDragDragItem = (event: React.SyntheticEvent) => {
        event.stopPropagation();
    };

    const onDragEndItem = (event: React.SyntheticEvent) => {
        dragEndCallback(event, item);
        event.stopPropagation();
    };

    const onClickItem = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        if (!item.draggable) {
            clickCallback(event, item);
        }
    };

    return (
        <div
            className={'diagram-designer__palette-item'}
            draggable={item.draggable}
            onDragStart={onDragStartItem}
            onDrag={onDragDragItem}
            onDragEnd={onDragEndItem}
            onClick={onClickItem}
            // onDragEnter={() => console.log('onDragEnter')} // наведение на элемент
        >
            {item.name}
        </div>
    );
}
