import { IItem, IItemPosition, IRootPosition } from '../../Interfaces/IRoot';
import { DragEvent, WheelEvent } from 'react';

export default class LayoutHook {
    private static eventCoordinates: { x: number, y: number };
    private static rootPosition: { x: number; y: number; scale: number };

    static getRootRect(items: Array<IItem>) {
        let startX = Infinity;
        let startY = Infinity;
        let endX = -Infinity;
        let endY = -Infinity;
        items.forEach((item: IItem) => {
            const itemStartX = item.position?.x;
            const itemStartY = item.position?.y;

            if (itemStartX < startX) {
                startX = itemStartX;
            }
            if (itemStartY < startY) {
                startY = itemStartY;
            }

            const itemEndX = item.position?.x + item.size.width;
            const itemEndY = item.position?.y + item.size.height;
            if (itemEndX > endX) {
                endX = itemEndX;
            }
            if (itemEndY > endY) {
                endY = itemEndY;
            }
        });

        return {
            x: startX,
            y: startY,
            width: Math.abs(endX - startX),
            height: Math.abs(endY > startY ? endY - startY : startY - endY)
        };
    }

    static getScale(a: number, b: number) {
        return (a / b).toFixed(2);
    }

    static getCenterRootPosition(items: Array<IItem>) {
        const rootRect = this.getRootRect(items);
        const contentRect = document.getElementById('root').getBoundingClientRect();
        contentRect.width -= 100;
        contentRect.height -= 40;
        let scale: number = this.rootPosition?.scale || 1;
        if (contentRect.width < rootRect.width || contentRect.height < rootRect.height) {
            const widthScale = this.getScale(contentRect.width, rootRect.width);
            const heightScale = this.getScale(contentRect.height, rootRect.height);
            scale = +(widthScale > heightScale ? heightScale : widthScale);
        }
        rootRect.width *= scale;
        rootRect.height *= scale;
        // const centerRoot = {
        //     x: rootRect.x + rootRect.width / 2,
        //     y: rootRect.y + rootRect.height / 2
        // };
        const centerContent = {
            x: contentRect.x + contentRect.width / 2,
            y: contentRect.y + contentRect.height / 2
        };
        const translateFromCenterContent = {
            x: centerContent.x - rootRect.x / 2,
            y: centerContent.y - rootRect.y / 8
        };

        const newPosition = {
            x: translateFromCenterContent.x,
            y: translateFromCenterContent.y,
            width: rootRect.width,
            height: rootRect.height,
            scale
        };
        this.rootPosition = newPosition;
        return newPosition;
    }

    static generatePosition(event: DragEvent<HTMLDivElement>) {
        const { top, left, x, y } = document.getElementById('root-zone').getBoundingClientRect();
        const offsetX = event.clientX - left;
        const offsetY = event.clientY - top; // отклонение от 0 0 на базовом графике

        const canvasPosition = { ...this.rootPosition };
        // const canvasPosition = {
        //     x: ((event.clientX - this.rootPosition.x) / x) * this.rootPosition.scale,
        //       y: ((event.clientY - this.rootPosition.y) / y) * this.rootPosition.scale
        // };
        return {
            x: offsetX / this.rootPosition.scale, // FIXME! zoom!
            y: offsetY / this.rootPosition.scale
        };
    }

    static dragStart(event: DragEvent<HTMLDivElement>) {
        this.eventCoordinates = {
            x: event.clientX,
            y: event.clientY
        };
    }

    static dragDrag(event: DragEvent<HTMLDivElement>, position: IRootPosition) {
        setTimeout(() => {}, 800);
        const offset = {
            x: event.clientX - this.eventCoordinates.x,
            y: event.clientY - this.eventCoordinates.y
        };
        const newPosition = { ...position };
        newPosition.x = position.x + offset.x;
        newPosition.y = position.y + offset.y;
        this.eventCoordinates = {
            x: event.clientX,
            y: event.clientY
        };
        return newPosition;
    }

    static dragEnd(event: DragEvent<HTMLDivElement>, position: IRootPosition) {
        const offset = {
            x: event.clientX - this.eventCoordinates.x,
            y: event.clientY - this.eventCoordinates.y
        };
        const newPosition = { ...position };
        newPosition.x = position.x + offset.x;
        newPosition.y = position.y + offset.y;
        this.eventCoordinates = null;
        this.rootPosition = newPosition;
        return newPosition;
    }

    static zoom(event: WheelEvent<HTMLDivElement>, position: IRootPosition) {
        let scale = 1;
        if (event.deltaY < 0) {
            // Zoom in
            const newPosition = { ...position };
            if (newPosition.scale <= 2.8) {
                newPosition.scale += 0.1;
            }
            return newPosition;
        } else {
            // Zoom out
            const newPosition = { ...position };
            if (newPosition.scale >= 0.6) {
                newPosition.scale -= 0.1;
            }
            this.rootPosition = newPosition;
            return newPosition;
        }
    }


    static dragDragItem(event: DragEvent<HTMLDivElement>, position: IItemPosition) {
        setTimeout(() => {}, 200);
        const offset = {
            x: event.clientX - this.eventCoordinates.x,
            y: event.clientY - this.eventCoordinates.y
        };
        const newPosition = { ...position };
        newPosition.x = position.x + offset.x;
        newPosition.y = position.y + offset.y;
        this.eventCoordinates = {
            x: event.clientX,
            y: event.clientY
        };
        return newPosition as IItemPosition;
    }

    static dragEndItem(event: DragEvent<HTMLDivElement>, position: IItemPosition) {
        const offset = {
            x: event.clientX - this.eventCoordinates.x,
            y: event.clientY - this.eventCoordinates.y
        };
        const newPosition = { ...position };
        newPosition.x = position.x + offset.x;
        newPosition.y = position.y + offset.y;
        this.eventCoordinates = null;
        return newPosition as IItemPosition;
    }
}
