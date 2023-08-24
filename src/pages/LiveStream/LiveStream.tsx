import React, { useMemo, useState } from 'react'
import "./LiveStream.css";

import LiveStreamCard from '../../components/UI/cards/LiveStreamCard';
import { ILive } from '../../models/LiveStream';
import VideoPlayer from '../../components/VideoPleer/VideoPlayer';
import { IProgram } from '../../models/Program';


const TEST_PROGRAMS: IProgram[] = [
  {
    startTime: '06:00',
    name: 'Программа 1',
    id: 1,
    endTime: '09:00',
    date: '2023-08-25'
  },
  {
    startTime: '09:00',
    name: 'Программа 2',
    id: 2,
    endTime: '10:00',
    date: '2023-08-25'
  },
  {
    startTime: '09:00',
    name: 'Программа 3',
    id: 3,
    endTime: '12:00',
    date: '2023-08-25'
  },
  {
    startTime: '12:00',
    name: 'Программа 4',
    id: 4,
    endTime: '14:00',
    date: '2023-08-25'
  },
  {
    startTime: '14:00',
    name: 'Программа 5',
    id: 5,
    endTime: '16:00',
    date: '2023-08-25'
  }
]

const STREAMS: Array<ILive> = [
  {
    id: 0,
    url: "https://www.youtube.com/watch?v=S2m2fpMRMnc",
    programs: TEST_PROGRAMS,
    name: "First",
    cover: "",

  },
  {
    id: 1,
    url: "https://www.youtube.com/watch?v=S2m2fpMRMnc",
    programs: TEST_PROGRAMS,
    name: "Second",
    cover: "",

  }, {
    id: 2,
    url: "https://www.youtube.com/watch?v=S2m2fpMRMnc",
    programs: TEST_PROGRAMS,
    name: "Third",
    cover: "",

  }, {
    id: 3,
    url: "https://www.youtube.com/watch?v=S2m2fpMRMnc",
    programs: TEST_PROGRAMS,
    name: "Five",
    cover: "",

  }
]

const DAYS = [
  "Сегодня, 19.10",
  "Завтра, 20.10",
  "Пт, 21.10",
  "Сб, 22.10",
  "Вс, 23.10"
]

export default function LiveStream() {

  const [selectedStreamIndex, setSelectedStreamIndex] = useState(0);

  return (
    <div className='stream'>

      <div className='stream-block'>
        <div className="stream-list">
          {
            STREAMS.map((element, index) =>
              <LiveStreamCard
                key={element.id}
                index={index}
                liveStream={element}
                onSelect={setSelectedStreamIndex}
                selected={index === selectedStreamIndex}
              />
            )
          }
        </div>

        <div className='stream-pleer'>
          <VideoPlayer video={STREAMS[selectedStreamIndex]} />
        </div>
      </div>


      <div className='stream-shedule'>

        <div className="nav-bar">
          {
            DAYS.map((element, index) =>
              <div className="date-wrapper">
                {element}
                {
                  index === 0 &&
                  <svg xmlns="http://www.w3.org/2000/svg" width="131" height="4" viewBox="0 0 131 4" fill="none">
                    <path d="M0 4C0 1.79086 1.79086 0 4 0H127C129.209 0 131 1.79086 131 4H0Z" fill="#F6A80B" />
                  </svg>
                }
              </div>
            )
          }
        </div>

        <div className="program-list">
          {STREAMS[selectedStreamIndex].programs.map((element, index) =>
            <div className={index === 3 ? "program program-active" : "program"}>
              <span className='time'>{element.startTime}</span>
              <div className='info-wrapper'>
                {index === 3 ?
                  <>
                    <span className='name'>{element.name}</span>
                    <span className='now'>Сейчас в эфире</span>
                    <div className="progress-bar-container">
                      <div className="progress-bar" style={{ width: '50%' }}></div>
                    </div>
                  </>
                  :
                  <span className='name'>{element.name}</span>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
