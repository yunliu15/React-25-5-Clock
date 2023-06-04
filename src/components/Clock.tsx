import {useState, useRef} from 'react';
import LengthControl from './LengthControl';
import TimeDisplay from './TimeDisplay';

const DEFAULT_SESSION: number = 0.1;
const DEFAULT_BREAK: number = 5;
let timeInterval: undefined | NodeJS.Timer;
export default function Clock() {
    const [sessionLength, setSessionLength] = useState<number>(DEFAULT_SESSION);
    const [breakLength, setBreakLength] = useState<number>(DEFAULT_BREAK);
    const [timeRemain, setTimeRemain] = useState<number>(DEFAULT_SESSION * 60);
    const [displayType, setDisplayType] = useState<'session' | 'break'>('session');
    const [timerStopped, setTimerStopped] = useState<boolean>(true);
    const beepAudio = useRef<HTMLAudioElement>(null);

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
        if(beepAudio.current) { 
            beepAudio.current.currentTime = 0;
            beepAudio.current.pause();
        }
    }
    const resetTimer = () => {
        stopTimer();
        setSessionLength(DEFAULT_SESSION);
        setBreakLength(DEFAULT_BREAK);
        setDisplayType('session');
        setTimeRemain(DEFAULT_SESSION * 60);
    }
    const toggleTimer = () => {
        timerStopped? startTimer() : stopTimer();
    }

    if (timeRemain < 0) {
        if(displayType === 'session') {
            setDisplayType('break');
            setTimeRemain(breakLength * 60);
        } else {
            setDisplayType('session');
            setTimeRemain(sessionLength * 60);
        }
    }

    if (timeRemain === 0 && beepAudio.current) {
        beepAudio.current.currentTime = 0;
        beepAudio.current.play();
    }

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
        <section className={timeRemain < 60? "display-section color-red" : "display-section"}>
            <span id="timer-label">{displayType}</span>
            <TimeDisplay timeRemain={timeRemain} />
            <button id="start_stop" onClick={toggleTimer}>
                <span className={timerStopped? '':'hide'}>Start</span>
                <span className={timerStopped? 'hide':''}>Pause</span>
            </button>
            <button id="reset" onClick={resetTimer}>Reset</button>
        </section>
        <audio id="beep" preload="auto" 
          src="http://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav"
          ref={beepAudio} />
    </>
  )
}
