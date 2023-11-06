import { memo } from 'react'

type NavigationProps = {
  toggleFeature: (feature: string) => void,
}

const Navigation = memo(function Navigation({ toggleFeature }: NavigationProps) {

  type NavButtonProps = {
    feature: string,
    title: string
  }

  const NavButton = ({ feature, title }: NavButtonProps) => {
    return (
      <input className="btn btn-sm join-item" onChange={() => toggleFeature(feature)} type="radio" name="options" aria-label={title}></input>
    )
  }

  return (
    <div className="join join-vertical w-full">

      <NavButton feature="home" title='Home' />
      <NavButton feature="newjob" title='Add Job' />
      <NavButton feature="table" title='View Jobs' />
      <NavButton feature="pomodoro" title='Pomo Doro' />
      <NavButton feature='about' title='about' />
      {/* 
      <NavButton feature='stats' title='Stats' />
       */}
    </div>
  )
})

export default Navigation