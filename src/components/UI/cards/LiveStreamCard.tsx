import React, { useCallback } from 'react';
import { ILive } from '../../../models/LiveStream';
import './style.css';

type TProps = {
    liveStream: ILive;
    selected?: boolean;
    index: number;
    onSelect: (index: number) => void;
}

const LiveStreamCard = (
    {
        liveStream,
        selected,
        index,
        onSelect: onSelectInner
    }: TProps
) => {

    const onSelect = useCallback(() =>
        onSelectInner(index), [])

    return (
        <div className="live-stream-card" onClick={onSelect} style={{ backgroundImage: `url(${liveStream.cover})` }}>
            <div className="group">
                {!selected && <div className="LIVE">
                    <div className="overlap-group">
                        <div className="ellipse" />
                        <div className="text-wrapper">LIVE</div>
                    </div>
                </div>}
            </div>
        </div >
    );
};

export default LiveStreamCard;
