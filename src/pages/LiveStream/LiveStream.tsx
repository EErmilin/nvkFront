import { useEffect, useRef } from 'react'
import "./LiveStream.css";

import { ILive } from '../../models/LiveStream';
import { IRadio } from '../../models/Radio';
import VideoPlayer, { VideoPlayerHandle } from '../../components/VideoPleer/VideoPlayer';
import LiveStreamSelector, { LiveStreamSelectorHandle } from '../../components/UI/blocks/liveStream/LiveStreamSelector/LiveStreamSelector';
import Shedule, { SheduleHandle } from '../../components/UI/blocks/liveStream/Shedule/Shedule';

import { fetchStreams } from './utils';
import AskQuestionModal from '../../components/modals/AskQuestionModal/AskQuestionModal';
import useToggleVisibility from '../../hooks/useToggleVisibility';


export default function LiveStream() {

  const liveStreamSelectorRef = useRef<LiveStreamSelectorHandle>();
  const videoPleerRef = useRef<VideoPlayerHandle>();
  const sheduleRef = useRef<SheduleHandle>();


  const [isModalOpen, setIsModalOpen, closeModal] = useToggleVisibility(false)

  const onStreamSelect = (stream: ILive | IRadio) => {
    videoPleerRef.current?.setStream(stream);
    sheduleRef.current?.setPograms(stream.programs ?? [])
  }


  const onProgramChanged = (programTitle: string) => {
    videoPleerRef.current?.setProgramTitle(programTitle);
  }


  const askModal = isModalOpen && (
    <AskQuestionModal
      closeModal={closeModal}
      btnCancelClick={closeModal}
    />
  )


  useEffect(() => {
    (async function () {
      try {
        const streams = await fetchStreams();
        liveStreamSelectorRef.current?.setStreams(streams);
        console.log({streams})
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
          <VideoPlayer ref={videoPleerRef} onAsk={setIsModalOpen} />
        </div>

      </div>

      <Shedule ref={sheduleRef} onProgramChanged={onProgramChanged} />
      {askModal}
    </div>
  )
}
