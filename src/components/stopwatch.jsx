import React, { useEffect, useRef, useState } from "react";
import styles from "./stopwatch.module.css"
import flag from "../assets/flag.png"

function Stopwatch() {

    const [running, setRunning] = useState(false);
    const intervalId = useRef(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const startTime = useRef(0);

    const [laps, setLaps] = useState([]);

    useEffect(() => {
        if (running) {
            intervalId.current = setInterval(() => {
                setElapsedTime(Date.now() - startTime.current);
            }, 10)
        }

        //cleanup componennt on unmount
        return () => {
            clearInterval(intervalId.current);
        }
    }, [running])



    function start() {
        console.log("Start called!");
        setRunning(true);
        startTime.current = Date.now() - elapsedTime;
    }


    function stop() {
        console.log("Stop Called!");
        setRunning(false);

    }


    function reset() {
        console.log("Reset Called!")
        setRunning(false);
        setElapsedTime(0);
        setLaps([]);
    }

    function takeLap() {
        setLaps(prevLaps => [...prevLaps, formatTime()]);
        console.log(laps);
    }


    function formatTime() {
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let ms = Math.floor((elapsedTime % 1000) / 10);


        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        ms = String(ms).padStart(2, "0");

        return `${minutes}:${seconds}:${ms}`
    }





    return (
        <div className={styles.stopwatchWrapper}>



            <div className={styles.stopwatch}>
                <div className={styles.display}>{formatTime()}</div>
                <div className={styles.controls}>
                    <button className={styles["start-button"]} onClick={start}>Start</button>
                    <button className={styles["stop-button"]} onClick={stop}>Stop</button>
                    <button className={styles["lap-button"]} onClick={takeLap}>Lap</button>
                    <button className={styles["reset-button"]} onClick={reset}>Reset</button>
                </div>

            </div>

            <div className={styles.lapTimes} style={ laps.length >0 ? {border:'1px solid black'}:{border:'none',backgroundColor:"unset"}}>
                {laps.length > 0 && <h3>Laps:</h3>}
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>Lap {index + 1}: {lap} </li>
                    ))}
                </ul>
            </div>

        </div>

    )
}


export default Stopwatch;