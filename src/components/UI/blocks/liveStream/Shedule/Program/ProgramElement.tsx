import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import { ILiveProgram } from "../../../../../../models/LiveStream";
import { IProgram } from "../../../../../../models/Program";
import { IRadioProgram } from "../../../../../../models/Radio";

import "./ProgramElement.css";
import { formatTimeToHHMM } from "../utils";
import { yakutiaTime } from "../../../../../../api/helper";
const timeZone = 'Asia/Yakutsk';

type TCardProps = {
  program: ILiveProgram | IRadioProgram | IProgram;
  nextProgram?: ILiveProgram | IRadioProgram | IProgram;

  onProgramChanged: (title: string) => void;
};

const ProgramElement = ({
  program,
  nextProgram,
  onProgramChanged,
}: TCardProps) => {
  useEffect(() => {
    if (nextProgram) onProgramChanged(program.name);
  }, [nextProgram]);

  const [percentageComplete, setPercentageComplete] = useState(
    nextProgram ? 0 : null
  );

  useEffect(() => {
    const calculatePercentage = () => {
      if (!nextProgram) return null;

      let start = new Date(program.date + "T" + program.startTime).getTime();
      let end = new Date(
        nextProgram.date + "T" + nextProgram.startTime
      ).getTime();

      let currentTime = yakutiaTime().getTime();

      
      let elapsedTime = currentTime - start;
      let totalTime = end - start;

      
      // Рассчитываем процент времени, который прошел
      let newPercentageComplete = (elapsedTime / totalTime) * 100;

      console.log({newPercentageComplete, end, start})

      setPercentageComplete(newPercentageComplete);
    };

    calculatePercentage(); // Вычисляем процент в начале

    // Обновляем процент каждую минуту
    const intervalId = setInterval(() => {
      calculatePercentage();
    }, 60000); // 60000 миллисекунд (1 минута)

    // Очищаем интервал при размонтировании компонента
    return () => {
      clearInterval(intervalId);
    };
  }, [program, nextProgram]);

  //   const durationPercent = useMemo(() => {
  //     if (!nextProgram) return null;

  //     let start = new Date(program.date + "T" + program.startTime).getTime();
  //     let end = new Date(nextProgram.date + "T" + nextProgram.startTime).getTime();

  //     let currentTime = new Date().getTime();
  //     let elapsedTime = currentTime - start;
  //     let totalTime = end - start;

  //     // Рассчитываем процент времени, который прошел
  //     let percentageComplete = (elapsedTime / totalTime) * 100;

  //     return percentageComplete;
  //   }, []);

  return (
    <div className={nextProgram ? "program program-active" : "program"}>
      <span className="time">{formatTimeToHHMM(program.startTime)}</span>
      <div className="info-wrapper">
        {nextProgram ? (
          <>
            <span className="name">{program.name}</span>
            <span className="now">Сейчас в эфире</span>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${percentageComplete}%` }}
              ></div>
            </div>
          </>
        ) : (
          <span className="name">{program.name}</span>
        )}
      </div>
    </div>
  );
};

export default ProgramElement;
