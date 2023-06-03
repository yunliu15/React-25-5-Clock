import React from 'react'

type Props = {
    timeRemain: number
}

export default function TimeDisplay({timeRemain}: Props) {
    const minute: number = Math.floor(timeRemain / 60);
    const minuteString: string = minute > 9? minute.toString() : '0' + minute;
    const second: number = timeRemain % 60;
    const secondString: string = second > 9? second.toString() : '0' + second;
  return (
    <div id="time-left">{`${minuteString} : ${secondString}`}</div>
  )
}
