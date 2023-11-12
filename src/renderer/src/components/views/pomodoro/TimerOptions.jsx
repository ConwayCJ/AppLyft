import useTimerProvider from '../../../context/UseTimerProvider'

export default function TimerOptions() {

  const { setTimeLeft } = useTimerProvider()

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center m-4">
          <p className=" text-3xl text-info">Start Work:</p>
          <div className="join my-4">
            <button onClick={() => setTimeLeft(25 * 60)} className="btn btn-md join-item">25</button>
            <button onClick={() => setTimeLeft(20 * 60)} className="btn btn-md join-item">20</button>
          </div>
        </div>
        <div className="m-4">
          <p className=" text-3xl text-info">Start Break:</p>
          <div className="join my-4">
            <button onClick={() => setTimeLeft(5 * 60)} className=" btn btn-md join-item">5</button>
            <button onClick={() => setTimeLeft(15 * 60)} className=" btn btn-md join-item">15</button>
          </div>
        </div>
      </div>
    </div>
  )
}