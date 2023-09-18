import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import { ILive } from "../../../../../models/LiveStream";
import { IRadio } from "../../../../../models/Radio";
import nvkLogo from "../../../../../assets/img/nvk.svg";
import mamont from "../../../../../assets/img/mamont.svg";
import yakutia from "../../../../../assets/img/yakutia.svg";
import teteam from "../../../../../assets/img/teteam.svg";

import "./LiveStreamSelector.css";

const TMP_IMAGE = (index: number) => {
  switch (index) {
    case 0:
      return nvkLogo;

    case 1:
      return mamont;

    case 2:
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
    const [selectedStreamIndex, setSelectedStreamIndex] = useState(0);
    const [streams, setStreams] = useState<Array<ILive | IRadio>>([]);

    useImperativeHandle<unknown, LiveStreamSelectorHandle>(ref, () => ({
      setStreams,
    }));

    useEffect(() => {
      if (streams[selectedStreamIndex]) onSelect(streams[selectedStreamIndex]);
    }, [streams, selectedStreamIndex]);

    return (
      <div className="stream-list">
        {streams.map((element, index) => (
          <LiveStreamCard
            key={element.id}
            index={index}
            stream={element}
            onSelect={setSelectedStreamIndex}
            selected={index === selectedStreamIndex}
          />
        ))}
      </div>
    );
  }
);

export default LiveStreamSelector;
