import React, { DragEvent, WheelEvent } from 'react';

import LayoutHook from './BaseComponents/Hooks/LayoutHook';
import BaseItem from './BaseComponents/BaseItem';

import { IRootPosition } from './Interfaces/IRoot';

import { store } from '@src/app/store';
import { useAppSelector } from '@src/app/hooks';
import { setRootPosition } from '@src/components/DiagramDesigner/designerReducer';

const styles = {
    root: (position: IRootPosition) => ({
        transform: `translate(${position.x}px, ${position.y}px) scale(${position.scale})`,
        // backgroundColor: '#0063803d',
        // border: `1px solid black`,
        // borderRadius: 4,
        width: position.width,
        height: position.height
    }),
    canvas: { height: '100%', width: '100%' }
};

export default function RootView() {
    const items = useAppSelector((state) => state.content.designer.items);
    const rootPosition = useAppSelector((state) => state.content.designer.rootPosition);
    if (!rootPosition.scale) { // todo проверять нормально!
        const centeredPosition = LayoutHook.getCenterRootPosition(items); // var t = d3.zoomIdentity.translate(x, y).scale(k);
        store.dispatch(setRootPosition(centeredPosition));
    }

    const onWheelCanvas = (event: WheelEvent<HTMLDivElement>) => {
        const action = setRootPosition(LayoutHook.zoom(event, rootPosition as IRootPosition));
        store.dispatch(action);
    };

    const onDragStartCanvas = (event: DragEvent<HTMLDivElement> & { target: { classList: Array<string>}}) => {
        if (event.target.classList[0] === 'canvas') {
            event.dataTransfer.setDragImage(new Image(), 0, 0);
            event.dataTransfer.dropEffect = 'copy';
            LayoutHook.dragStart(event);
        }
    };

    const onDragDragCanvas = (event: DragEvent<HTMLDivElement> & { target: { classList: Array<string>}}) => {
        if (event.target.classList[0] === 'canvas') {
            const action = setRootPosition(LayoutHook.dragDrag(event, rootPosition as IRootPosition));
            store.dispatch(action);
        }
    };

    const onDragEndCanvas = (event: DragEvent<HTMLDivElement> & { target: { classList: Array<string>}}) => {
        if (event.target.classList[0] === 'canvas') {
            const action = setRootPosition(LayoutHook.dragEnd(event, rootPosition as IRootPosition));
            store.dispatch(action);
        }
    };

    return (
        <div
            className={'canvas'}
            draggable={true}
            style={styles.canvas}
            onWheel={onWheelCanvas}
            onDrag={onDragDragCanvas}
            onDragStart={onDragStartCanvas}
            onDragEnd={onDragEndCanvas}
            // onDragEnter={() => console.log('onDragEnter')} // наведение на элемент
        >
                <div id={'root-zone'} style={styles.root(rootPosition as IRootPosition)}>
                    {items.map(item => {
                        return <BaseItem key={item.id} item={item} />;
                    })}
                </div>
        </div>
    );
}
