import { useEffect, useRef, useState } from "react";
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Time() {
    const miliRef = useRef(null);
    const secondRef = useRef(null);
    const minuteRef = useRef(null);
    const hourRef = useRef(null);
    const timeRef = useRef(null);

    const h = useRef(null);
    const m = useRef(null);

    const [active, setActive] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (active) {
            const startTime = Date.now() - time;
            timeRef.current = setInterval(() => {
                const currentTime = Date.now();
                const newtime = currentTime - startTime;
                setTime(newtime);

                miliRef.current.textContent = Math.floor((newtime % 1000) / 10);
                secondRef.current.textContent = Math.floor((newtime / 1000) % 60);
                minuteRef.current.textContent = Math.floor((newtime / 60000) % 60);
                hourRef.current.textContent = Math.floor(newtime / 3600000);

                if (minuteRef.current.textContent > 0) {
                    minuteRef.current.classList.remove('hidden');
                    m.current.classList.remove('hidden');
                } else {
                    minuteRef.current.classList.add('hidden');
                    m.current.classList.add('hidden');
                }

                if (hourRef.current.textContent > 0) {
                    hourRef.current.classList.remove('hidden');
                    h.current.classList.remove('hidden');
                } else {
                    hourRef.current.classList.add('hidden');
                    h.current.classList.add('hidden');
                }
            }, 10);
        } else {
            clearInterval(timeRef.current);
        }

        return () => clearInterval(timeRef.current);
    }, [active]);

    function handlePlay() {
        setActive(prevActive => !prevActive);
    }

    function handleClear() {
        setActive(false);
        setTime(0);
        miliRef.current.textContent = '0';
        secondRef.current.textContent = '0';
        minuteRef.current.textContent = '0';
        hourRef.current.textContent = '0';

        minuteRef.current.classList.add('hidden');
        m.current.classList.add('hidden');
        hourRef.current.classList.add('hidden');
        h.current.classList.add('hidden');
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-3">
                        <h1 className="text-center mt-5">Stop Watch</h1>
                        <div className="hahaha">
                            <div ref={hourRef} className="hidden">0</div><span ref={h} className="hidden">h</span>
                            <div ref={minuteRef} className="hidden">0</div><span ref={m} className="hidden">m</span>
                            <div ref={secondRef}>0</div><span>s</span>
                            <div ref={miliRef}>00</div>
                        </div>
                        <div className="button">
                            <button onClick={handlePlay}>{active ? "Dừng" : "Bắt Đầu"}</button>
                            <button onClick={handleClear}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Time;
