import { useEffect, useRef } from 'react'
import "./LiveStream.css";

import { ILive } from '../../models/LiveStream';
import { IRadio } from '../../models/Radio';
import VideoPlayer, { VideoPlayerHandle } from '../../components/VideoPleer/VideoPlayer';
import LiveStreamSelector, { LiveStreamSelectorHandle } from '../../components/UI/blocks/liveStream/LiveStreamSelector/LiveStreamSelector';
import Shedule, { SheduleHandle } from '../../components/UI/blocks/liveStream/Shedule/Shedule';

import { fetchStreams } from './utils';
import AskQuestionModal, { AskQuestionModalHandle } from '../../components/modals/AskQuestionModal/AskQuestionModal';


export default function LiveStream() {

  const liveStreamSelectorRef = useRef<LiveStreamSelectorHandle>();
  const videoPleerRef = useRef<VideoPlayerHandle>();
  const sheduleRef = useRef<SheduleHandle>();

  const askModal = useRef<AskQuestionModalHandle>();


  const onStreamSelect = (stream: ILive | IRadio) => {
    videoPleerRef.current?.setStream(stream);
    sheduleRef.current?.setPograms(stream.programs ?? [])
  }


  const onProgramChanged = (programTitle: string) => {
    videoPleerRef.current?.setProgramTitle(programTitle);
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
          <VideoPlayer ref={videoPleerRef} askModal={askModal}/>
        </div>

      </div>

      <Shedule ref={sheduleRef} onProgramChanged={onProgramChanged} />

      <AskQuestionModal ref={askModal} />
    </div>
  )
}
