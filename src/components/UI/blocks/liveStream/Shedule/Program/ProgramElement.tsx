import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { ILiveProgram } from '../../../../../../models/LiveStream'
import { IProgram } from '../../../../../../models/Program';
import { IRadioProgram } from '../../../../../../models/Radio'

import '../style.css'
import { formatTimeToHHMM } from '../utils';

type TCardProps = {
    program: ILiveProgram | IRadioProgram | IProgram;    
    live?: boolean;
}

const ProgramElement = (
    {
        program,    
        live
    }: TCardProps
) => {

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