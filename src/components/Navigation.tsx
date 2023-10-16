type NavigationProps = {
  toggleFeature: (feature: string) => void,
  currentFeature: string
}

export default function Navigation({ toggleFeature, currentFeature }: NavigationProps) {

  type NavButtonProps = {
    currentFeature: string,
    feature: string,
    title: string
  }

  const NavButton = ({ currentFeature, feature, title }: NavButtonProps) => {
    console.log(currentFeature, feature)

    return (
      <input className="btn btn-sm join-item" checked={currentFeature === feature} onChange={() => toggleFeature(feature)} type="radio" name="options" aria-label={title}></input>
    )
  }

  return (
    <div className="join join-vertical w-full">

      <NavButton currentFeature={currentFeature} feature="home" title='Home' />
      <NavButton currentFeature={currentFeature} feature="newjob" title='Add Job' />
      <NavButton currentFeature={currentFeature} feature="table" title='View Jobs' />
      <NavButton currentFeature={currentFeature} feature='disabled' title='Disabled' />
      <NavButton currentFeature={currentFeature} feature='disabled' title='Stats' />
    </div>
  )
}