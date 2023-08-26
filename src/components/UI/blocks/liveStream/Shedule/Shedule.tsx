import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { number } from 'yup';

import { IProgram } from '../../../../../models/Program';
import ProgramElement from './Program/ProgramElement';

import './style.css'
import { generateDaysArray, sortAndGroupProgramsByDay, TEST_DATE } from './utils';

type TBlockProps = {
    programs?: Array<IProgram>;
}


export type SheduleHandle = {
    setPograms: React.Dispatch<React.SetStateAction<(IProgram)[]>>

}

const TODAY = new Date(TEST_DATE);
const FORMATED_TODAY = TODAY.toISOString().slice(0, 10);


const DAYS = generateDaysArray();

const Shedule = forwardRef(({ programs: programsInner = [] }: TBlockProps, ref) => {

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

            <div className="nav-bar">
                {
                    DAYS.map((element, index) =>
                        <div className="date-wrapper" onClick={() => setSelectedDay(element.date)}>
                            {element.label}
                            {
                                element.date === selectedDay &&
                                <svg xmlns="http://www.w3.org/2000/svg" width="131" height="4" viewBox="0 0 131 4" fill="none">
                                    <path d="M0 4C0 1.79086 1.79086 0 4 0H127C129.209 0 131 1.79086 131 4H0Z" fill="#F6A80B" />
                                </svg>
                            }
                        </div>
                    )
                }
            </div>
            <div className="program-list">
                {groupedPrograms[selectedDay]?.map((element, index) =>
                    <ProgramElement program={element} live={index === currentIndex && selectedDay === FORMATED_TODAY} />
                )}
            </div>
        </div>
    )
});


export default Shedule;