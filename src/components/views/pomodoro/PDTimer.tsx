import { ProfileContext } from "../../../ProfileContext"
import { useContext } from 'react'

export default function PDTimer() {
  const profile = useContext(ProfileContext)

  const dateObj = new Date(profile.timeLeft * 1000);
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();

  const timeString = minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0');

  return (
    <div className="stat">
      <div className="stat-value">{timeString}</div>
      <div className="stat-title text-accent">{profile.timeLeft > 0 ? 'Time Left' : 'Take a break!'}</div>
      {/* <div className="stat-desc text-secondary">PomoDoro Timer</div> */}
    </div>
  )
}