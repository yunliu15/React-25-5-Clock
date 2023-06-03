import {useState, useEffect, useRef} from 'react';
import LengthControl from './LengthControl';
import TimeDisplay from './TimeDisplay';

const DEFAULT_SESSION: number = 1;
const DEFAULT_BREAK: number = 5;
const audioUrl = "https://goo.gl/65cBl1";
const beepAudio = new Audio(audioUrl); 
let timeInterval: undefined | NodeJS.Timer;
export default function Clock() {
    const [sessionLength, setSessionLength] = useState<number>(DEFAULT_SESSION);
    const [breakLength, setBreakLength] = useState<number>(DEFAULT_BREAK);
    const [timeRemain, setTimeRemain] = useState<number>(DEFAULT_SESSION * 60);
    const [displayType, setDisplayType] = useState<'session' | 'break'>('session');
    const [timerStopped, setTimerStopped] = useState<boolean>(true);

    const startTimer = () => {
        setTimerStopped(false);
        if (!timeInterval) {
            timeInterval = setInterval(() => {
                setTimeRemain(prev => prev - 1);
            }, 1000)
        }
    }
    const stopTimer = () => {
        clearInterval(timeInterval)
        timeInterval = undefined;
        setTimerStopped(true);
        beepAudio.currentTime = 0;
        beepAudio.pause();
    }
    const resetTimer = () => {
        stopTimer();
        setSessionLength(DEFAULT_SESSION);
        setBreakLength(DEFAULT_BREAK);
        displayType === 'session'? setTimeRemain(sessionLength * 60)
        : setTimeRemain(breakLength * 60);
    }
    const toggleTimer = () => {
        timerStopped? startTimer() : stopTimer();
    }

    useEffect(() => {
        if (timeRemain <= 0) {
            if(displayType === 'session') {
                setDisplayType('break');
                setTimeRemain(breakLength * 60);
            } else {
                setDisplayType('session');
                setTimeRemain(sessionLength * 60);
            }
        }
        if (timeRemain === 59) {
            beepAudio.currentTime = 0;
            const playPromise = beepAudio.play();
            if (playPromise !== null){
                playPromise.catch(() => { beepAudio.play(); })
            }
        }

    }, [timeRemain]);

  return (
    <>
        
        <LengthControl
        displayType={displayType}
        breakLength = {breakLength}
        setBreakLength = {setBreakLength}
        sessionLength = {sessionLength}
        setSessionLength = {setSessionLength}
        timerStopped = {timerStopped}
        setTimeRemain={setTimeRemain}
        />
        <section className='display-section'>
            <span id="timer-label">{displayType}</span>
            <TimeDisplay timeRemain={timeRemain} />
            <button id="start_stop" onClick={toggleTimer}>Start / Pause</button>
            <button id="reset" onClick={resetTimer}>Reset</button>
        </section>

    </>
  )
}
