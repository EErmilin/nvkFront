import { useEffect, useRef, useState } from "react";
import "./LiveStream.scss";
import React from "react";
import { ILive } from "../../models/LiveStream";
import { IRadio } from "../../models/Radio";
import VideoPlayer, {
  VideoPlayerHandle,
} from "../../components/VideoPleer/VideoPlayer";
import LiveStreamSelector, {
  LiveStreamSelectorHandle,
} from "../../components/UI/blocks/liveStream/LiveStreamSelector/LiveStreamSelector";
import Shedule, {
  SheduleHandle,
} from "../../components/UI/blocks/liveStream/Shedule/Shedule";

import { fetchStreams } from "./utils";
import AskQuestionModal from "../../components/modals/AskQuestionModal/AskQuestionModal";
import useToggleVisibility from "../../hooks/useToggleVisibility";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setModalVisible } from "../../redux/slices/routerSlice";

export default function LiveStream() {
  const dispatcher = useAppDispatch();
  const liveStreamSelectorRef = useRef<LiveStreamSelectorHandle>();
  const videoPleerRef = useRef<VideoPlayerHandle>();
  const sheduleRef = useRef<SheduleHandle>();
  const streamIdRef = useRef<number | undefined>();
  const userId = useAppSelector((state) => state.user.data?.id);

  const [isModalOpen, setIsModalOpen, closeModal] = useToggleVisibility(false);

  const onStreamSelect = (stream: ILive | IRadio) => {
    streamIdRef.current = stream.id;
    videoPleerRef.current?.setStream(stream);
    sheduleRef.current?.setPograms(stream.programs ?? []);
  };

  const onProgramChanged = (programTitle: string) => {
    videoPleerRef.current?.setProgramTitle(programTitle);
  };

  const askModal = isModalOpen && (
    <AskQuestionModal
      streamId={streamIdRef.current}
      closeModal={closeModal}
      btnCancelClick={() => setIsModalOpen(false)}
    />
  );

  useEffect(() => {
    (async function () {
      try {
        const streams = await fetchStreams();
        liveStreamSelectorRef.current?.setStreams(streams);
      } catch (e) {
        console.log("fetchStreamsError:", e);
      }
    })();
  }, []);

  return (
    <div className="stream">
      <div className="stream-block">
        <LiveStreamSelector
          ref={liveStreamSelectorRef}
          onSelect={onStreamSelect}
        />

        <div className="stream-pleer">
          <VideoPlayer
            ref={videoPleerRef}
            onAsk={() => {
              if (!!userId) setIsModalOpen(true);
              else dispatcher(setModalVisible(true));
            }}
          />
        </div>
      </div>
      <div className="wrp">
        <Shedule ref={sheduleRef} onProgramChanged={onProgramChanged} />
      </div>
      {askModal}
    </div>
  );
}
