import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react'
import { number } from 'yup';

import { IProgram } from '../../../../../models/Program';
import ProgramElement from './Program/ProgramElement';

import './Shedule.css'
import { generateDaysArray, sortAndGroupProgramsByDay, TEST_DATE } from './utils';

type TBlockProps = {
    programs?: Array<IProgram>;
    onProgramChanged: (title: string) => void;
}


export type SheduleHandle = {
    setPograms: React.Dispatch<React.SetStateAction<(IProgram)[]>>

}

const TODAY = new Date(TEST_DATE);
const FORMATED_TODAY = TODAY.toISOString().slice(0, 10);


const DAYS = generateDaysArray();

const Shedule = forwardRef(({ programs: programsInner = [], onProgramChanged }: TBlockProps, ref) => {

    const [programs, setPograms] = useState(programsInner);

    const [selectedDay, setSelectedDay] = useState<string>(FORMATED_TODAY);

    const groupedPrograms = useMemo(() => sortAndGroupProgramsByDay(programs), [programs])



    const currentTime = TODAY.getTime();

    const currentIndex = Object.values(groupedPrograms[selectedDay] ?? {})
        .flatMap(programs => programs)
        .findIndex((program, index, array) => {
            const programDateTime = new Date(program.date + 'T' + program.startTime).getTime();
            const nextProgram = array[index + 1];
            const nextProgramDateTime = nextProgram ? new Date(nextProgram.date + 'T' + nextProgram.startTime).getTime() : Infinity;

            return programDateTime <= currentTime && currentTime < nextProgramDateTime;
        });

    useImperativeHandle<unknown, SheduleHandle>(ref, () => ({
        setPograms
    }));


    return (
        <div className='stream-shedule'>


            <div className="program-list">
                {groupedPrograms[selectedDay]?.map((element, index) =>
                    <ProgramElement
                        program={element}
                        live={index === currentIndex && selectedDay === FORMATED_TODAY}
                        onProgramChanged={onProgramChanged}
                    />
                )}
            </div>
            <div className="nav-bar">
                <div className="dates-container">
                    {
                        DAYS.map((element) =>
                            <div className="date-wrapper" onClick={() => setSelectedDay(element.date)}>
                                <div style={{ width: "150px" }}> {element.label}</div>
                                {
                                    element.date === selectedDay &&
                                    <div className='date-wrapper-indicator'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="131" height="4" viewBox="0 0 131 4" fill="none">
                                            <path d="M0 4C0 1.79086 1.79086 0 4 0H127C129.209 0 131 1.79086 131 4H0Z" fill="#F6A80B" />
                                        </svg>
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
});


export default Shedule;