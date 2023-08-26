import { useEffect, useRef } from 'react'
import "./LiveStream.css";

import VideoPlayer, { VideoPlayerHandle } from '../../components/VideoPleer/VideoPlayer';


import { ILive } from '../../models/LiveStream';

import { IRadio } from '../../models/Radio';
import LiveStreamSelector, { LiveStreamSelectorHandle } from '../../components/UI/blocks/liveStream/LiveStreamSelector/LiveStreamSelector';
import Shedule, { SheduleHandle } from '../../components/UI/blocks/liveStream/Shedule/Shedule';
import { fetchStreams } from './utils';




export default function LiveStream() {


  const liveStreamSelectorRef = useRef<LiveStreamSelectorHandle>();
  const videoPleerRef = useRef<VideoPlayerHandle>();
  const sheduleRef = useRef<SheduleHandle>();

  const onStreamSelect = (stream: ILive | IRadio) => {
    videoPleerRef.current?.setStream(stream);
    sheduleRef.current?.setPograms(stream.programs ?? [])
  }

  useEffect(() => {
    (async function () {
      try {
        const streams = await fetchStreams();

        liveStreamSelectorRef.current?.setStreams(streams);
      } catch (e) {
        console.log('fetchStreamsError:', e);
      }
    })();
  }, []);


  return (
    <div className='stream'>

      <div className='stream-block'>
        <LiveStreamSelector ref={liveStreamSelectorRef} onSelect={onStreamSelect} />

        <div className='stream-pleer'>
          <VideoPlayer ref={videoPleerRef} />
        </div>

      </div>

      <Shedule ref={sheduleRef} />
    </div>
  )
}
