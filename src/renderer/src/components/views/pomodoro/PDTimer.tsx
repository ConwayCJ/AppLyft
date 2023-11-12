import useTimerProvider from "@renderer/context/UseTimerProvider";

export default function PDTimer() {
  const { timeLeft } = useTimerProvider()

  const dateObj = new Date(timeLeft * 1000);
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();

  const timeString = minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0');

  return (
    <div className="stat">
      <div className="stat-title">PomoDoro:</div>

      <div className={`stat-value ${timeLeft > 0 ? 'text-success' : 'text-warning'} w-[100px]`}>{timeString}</div>
      <div className="stat-figure">
        {
          timeLeft > 0 ?
            <svg className=" text-success" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8zm.5-13H11v6l5.25 3.15l.75-1.23l-4.5-2.67z" /></svg>
            :
            <svg className=" text-warning" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m22 5.72l-4.6-3.86l-1.29 1.53l4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86L2 5.71l1.29 1.53l4.59-3.85zM12.5 8H11v6l4.75 2.85l.75-1.23l-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a9 9 0 0 0 0-18zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z" /></svg>
        }
      </div>
    </div>
  )
}