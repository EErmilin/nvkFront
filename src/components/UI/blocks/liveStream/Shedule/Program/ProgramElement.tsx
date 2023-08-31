import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

import { ILiveProgram } from '../../../../../../models/LiveStream'
import { IProgram } from '../../../../../../models/Program';
import { IRadioProgram } from '../../../../../../models/Radio'

import './ProgramElement.css'
import { formatTimeToHHMM } from '../utils';

type TCardProps = {
    program: ILiveProgram | IRadioProgram | IProgram;
    live?: boolean;
    onProgramChanged: (title: string) => void;
}

const ProgramElement = (
    {
        program,
        live,
        onProgramChanged
    }: TCardProps
) => {


    useEffect(() => {
        if (live)
            onProgramChanged(program.name)
    }, [live])

    return (
        <div className={live ? "program program-active" : "program"}>
            <span className='time'>{formatTimeToHHMM(program.startTime)}</span>
            <div className='info-wrapper'>
                {live ?
                    <>
                        <span className='name'>{program.name}</span>
                        <span className='now'>Сейчас в эфире</span>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: '50%' }}></div>
                        </div>
                    </>
                    :
                    <span className='name'>{program.name}</span>
                }
            </div>
        </div>
    );
};


export default ProgramElement;