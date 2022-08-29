import React from 'react';
import PaletteItem from './PaletteItem';

import './scss/DiagramPalette.scss';

import { IDiagramPaletteProps } from './Interfaces/IDiagramPalette';

export default function DiagramPaletteView({ paletteItems, dragEndCallback, clickCallback }: IDiagramPaletteProps) {
    return (
        <div className={'diagram-designer__palette'}>
            {paletteItems.map(item => (
                <PaletteItem key={item.id} item={item} dragEndCallback={dragEndCallback} clickCallback={clickCallback} />
            ))}
        </div>
    ); // todo добавить кнопки внутрь
}
