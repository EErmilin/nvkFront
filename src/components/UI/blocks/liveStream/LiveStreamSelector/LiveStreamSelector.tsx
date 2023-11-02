import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import React from 'react';
import { ILive } from "../../../../../models/LiveStream";
import { IRadio } from "../../../../../models/Radio";
import nvkLogo from "../../../../../assets/img/nvk.svg";
import mamont from "../../../../../assets/img/mamont.svg";
import yakutia from "../../../../../assets/img/yakutia.svg";
import teteam from "../../../../../assets/img/teteam.svg";

import "./LiveStreamSelector.scss";
import { useSearchParams } from "react-router-dom";

const TMP_IMAGE = (index: number) => {
  switch (index) {
    case 1:
      return nvkLogo;
    case 2:
      return mamont;
    case 3:
      return yakutia;
    default:
      return teteam;
  }
};

type TLiveStreamCardProps = {
  index: number;
  stream: ILive | IRadio;
  selected?: boolean;
  onSelect: (index: number) => void;
};

const LiveStreamCard = ({
  index,
  stream,
  selected,
  onSelect: onSelectInner,
}: TLiveStreamCardProps) => {
  const onSelect = useCallback(() => onSelectInner(index), []);
  return (
    <div
      className="live-stream-card"
      onClick={onSelect}
      style={{
        backgroundImage: `url(${TMP_IMAGE(index)})`,
        backgroundSize: "100% auto",
        backgroundPosition: "center",
      }}
    >
      <div className="group">
        {!selected && (
          <div className="LIVE">
            <div className="overlap-group">
              <div className="ellipse" />
              <div className="text-wrapper">LIVE</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

type TLiveStreamBlockProps = {
  onSelect: (stream: ILive | IRadio) => void;
};

export type LiveStreamSelectorHandle = {
  setStreams: React.Dispatch<React.SetStateAction<(ILive | IRadio)[]>>;
};

const LiveStreamSelector = forwardRef(

  ({ onSelect }: TLiveStreamBlockProps, ref) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedStreamIndex, setSelectedStreamIndex] = useState(Number(searchParams.get("id")));
    const [streams, setStreams] = useState<Array<ILive | IRadio>>([]);


    useImperativeHandle<unknown, LiveStreamSelectorHandle>(ref, () => ({
      setStreams,
    }));

    useEffect(() => {
      if (streams && streams.length) {
        const currentStream = streams.find((stream) => stream.id === selectedStreamIndex)
        if (currentStream) {
          let obj = {
            id: `${selectedStreamIndex}`
          }
          setSearchParams(obj, { replace: true })
          onSelect(currentStream);
        } else if (streams.length) {
          setSelectedStreamIndex(streams[0].id)
          onSelect(streams[0]);
        }
      }
    }, [streams, selectedStreamIndex, searchParams]);

    return (
      <div className="stream-list">
        {streams.map((element, index) => (
          <LiveStreamCard
            key={index}
            index={element.id}
            stream={element}
            onSelect={setSelectedStreamIndex}
            selected={element.id === selectedStreamIndex}
          />
        ))}
      </div>
    );
  }
);

export default LiveStreamSelector;
