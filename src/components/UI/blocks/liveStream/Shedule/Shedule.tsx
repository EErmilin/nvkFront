import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { number } from "yup";

import { IProgram } from "../../../../../models/Program";
import ProgramElement from "./Program/ProgramElement";

import "./Shedule.scss";

import {
  getCurrentProgram,
  getProgramsForDate,
  getWeekDay,
} from "../../../../../api/helper";

type TBlockProps = {
  programs?: Array<IProgram>;
  onProgramChanged: (title: string) => void;
};

export type SheduleHandle = {
  setPograms: React.Dispatch<React.SetStateAction<IProgram[]>>;
};

const getStartDate = () => {
  let now = new Date();
  now.setDate(now.getDate() - 1);
  let date = now.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  let start = new Date(`${date}T21:00:01.000Z`);
  return start;
};

const dates = [1, 2, 3, 4, 5, 6].map((item) => {
  return {
    date: new Date(getStartDate().getTime() + item * 1000 * 60 * 60 * 23.59),
  };
});

const Shedule = forwardRef(
  ({ programs: programsInner = [], onProgramChanged }: TBlockProps, ref) => {
    const [programs, setPograms] = useState(programsInner);

    const [selectDate, setSelectDate] = React.useState({
      date: dates[0].date,
      index: 0,
    });

    const groupedPrograms = getProgramsForDate(programs, selectDate.date);



    const currentProgram = getCurrentProgram(groupedPrograms);

    useImperativeHandle<unknown, SheduleHandle>(ref, () => ({
      setPograms,
    }));

    return (
      <div className="stream-shedule">
        <div className="program-list">
        {groupedPrograms.map((element, index) => (
            <ProgramElement
              program={element}
              nextProgram={
                element.id === currentProgram?.id
                  ? groupedPrograms[index + 1]
                  : undefined
              }
              onProgramChanged={onProgramChanged}
            />
          ))}
        </div>
        <div className="nav-bar">
          <ul className="dates-container">
            {dates.map((item, index) => (
              <li
                className={
                  selectDate.index === index ? "active" : ""
                }
                style={{ maxWidth: index < 2 ? "131px" : "80px" }}
                onClick={() =>
                  setSelectDate({
                    date: item.date,
                    index: index,
                  })
                }
              >
                <div className="date-wrapper">
                  {index === 0
                    ? "Сегодня, "
                    : index === 1
                    ? "Завтра, "
                    : getWeekDay(item.date.getDay()) + ", "}
                  {item.date.toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </div>
                {/* {index === selectDate.index && (
                  <div className="date-wrapper-indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={index < 2 ? 131 : 70}
                      height="4"
                      viewBox="0 0 131 4"
                      fill="none"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H127C129.209 0 131 1.79086 131 4H0Z"
                        fill="#F6A80B"
                      />
                    </svg>
                  </div>
                )} */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

export default Shedule;
