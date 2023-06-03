import React from 'react'

type Props = {
    displayType: string,
    setBreakLength: React.Dispatch<React.SetStateAction<number>>,
    breakLength: number, 
    sessionLength: number,
    setSessionLength: React.Dispatch<React.SetStateAction<number>>,
    timerStopped: boolean,
    setTimeRemain:  React.Dispatch<React.SetStateAction<number>>
}

export default function LengthControl({displayType, breakLength, setBreakLength, sessionLength, setSessionLength, timerStopped, setTimeRemain}: Props) {
    const handleDecrease = (itemType: 'break' | 'session') => {
        if (!timerStopped) return;
        if (itemType === 'break' && breakLength > 1) {
            setBreakLength(breakLength - 1);
            if (displayType === 'break') {
                setTimeRemain((breakLength - 1) * 60);
            }
        } else if (itemType === 'session' && sessionLength > 1) {
            setSessionLength(sessionLength - 1);

            if (displayType === 'session') {
                setTimeRemain((sessionLength - 1) * 60);
            }
        }
    }

    const handleIncrease = (itemType: 'break' | 'session') => {
        if (!timerStopped) return;
        if (itemType === 'break' && breakLength < 60) {
            setBreakLength((prev: number) => prev + 1);
            if (displayType === 'break') {
                setTimeRemain((breakLength + 1) * 60);
            }
        } else if (itemType === 'session' && sessionLength < 60) {
            setSessionLength((prev: number) => prev + 1);
            if (displayType === 'session') {
                setTimeRemain((sessionLength + 1) * 60);
            }
        }
    }
  return (
    <section className='length-control'>
            <div>
                <span className='length-label' id="break-label">Break Length</span>
                <button className='decrease-btn' disabled={timerStopped? false : true} id="break-decrement" onClick={() => {handleDecrease('break')}}> - </button>
                <span id="break-length">{breakLength}</span>
                <button className='increase-btn' disabled={timerStopped? false : true} id="break-increment" onClick={() => {handleIncrease('break')}}> + </button>
            </div>

            <div>
                <span className='length-label' id="session-label">Session Length</span>
                <button className='decrease-btn' disabled={timerStopped? false : true} id="session-decrement" onClick={() => {handleDecrease('session')}}> - </button>
                <span id="session-length">{sessionLength}</span>
                <button className='increase-btn' disabled={timerStopped? false : true} id="session-increment" onClick={() => {handleIncrease('session')}}> + </button>
            </div>
        
        </section>
  )
}
