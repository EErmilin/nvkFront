

import classes from "./LiveItem.module.scss";
import React, { useEffect, useRef } from 'react';
import fakeNews from '../../../../assets/img/fakeTop.png';
import { fetchStreams } from "../../../LiveStream/utils";
import VideoPlayer, { VideoPlayerHandle } from "../../../../components/VideoPleer/VideoPlayer";
import { ILive } from "../../../../models/LiveStream";

function LiveItem({stream }: any) {

    const videoPleerRef = useRef<VideoPlayerHandle>();

    useEffect(()=>{
        videoPleerRef.current?.setStream(stream);
    },[stream])


    return (
        <div className={classes.show}>
            <VideoPlayer ref={videoPleerRef} play={false} isShowBtn={false} isMain={true}/>
            <div className={classes.show_title}>{stream.name}</div>
        </div>
    )
}

export default LiveItem