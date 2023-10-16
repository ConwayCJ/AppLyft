export default function Navigation({ toggleFeature }: { toggleFeature: (feature: string) => void }) {

  type NavButtonProps = {
    feature: string,
    title: string
  }

  const NavButton = ({ feature, title }: NavButtonProps) => {
    return (
      <input className="btn btn-sm join-item" onClick={() => toggleFeature(feature)} type="radio" name="options" aria-label={title}></input>
    )
  }

  return (
    <div className="join join-vertical w-full">
      <NavButton feature="home" title='Home' />
      <NavButton feature="newjob" title='Add Job' />
      <NavButton feature="table" title='View Jobs' />
      <NavButton feature='disabled' title='Disabled' />
      <NavButton feature='disabled' title='Stats' />
    </div>
  )
}