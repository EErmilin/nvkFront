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

import "./Shedule.css";
import {
  generateDaysArray,
  sortAndGroupProgramsByDay,
  TEST_DATE,
} from "./utils";
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

const TODAY = new Date(TEST_DATE);
const FORMATED_TODAY = TODAY.toISOString().slice(0, 10);

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

const dates = [0, 1, 2, 3, 4, 5, 6].map((item) => {
  return {
    date: new Date(getStartDate().getTime() + item * 1000 * 60 * 60 * 24),
  };
});


const Shedule = forwardRef(
  ({ programs: programsInner = [], onProgramChanged }: TBlockProps, ref) => {
    const [programs, setPograms] = useState(programsInner);

    const [selectDate, setSelectDate] = React.useState({
      date: dates[0].date,
      index: 0,
    });

    const groupedPrograms = getProgramsForDate(programs, selectDate.date)

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
              live={element.id === currentProgram?.id}
              onProgramChanged={onProgramChanged}
            />
          ))}
        </div>
        <div className="nav-bar">
          <div className="dates-container">
            {dates.map((item, index) => (
              <div
                className="date-wrapper"
                onClick={() =>
                  setSelectDate({
                    date: item.date,
                    index: index,
                  })
                }
              >
                <div style={{ width: "150px" }}>
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
                {index === selectDate.index && (
                  <div className="date-wrapper-indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="131"
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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default Shedule;
