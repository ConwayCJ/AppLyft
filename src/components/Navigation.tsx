export default function Navigation({ toggleFeature }: { toggleFeature: (feature: string) => void }) {
  return (
    <div className="join join-vertical w-full">
      <button onClick={() => toggleFeature('home')} className="btn btn-sm w-full mb-3">Home</button>
      <button onClick={() => toggleFeature('newjob')} className="btn btn-sm w-full join-item">Add Job</button>
      <button onClick={() => toggleFeature('table')} className="btn btn-sm w-full join-item">View Jobs</button>
      <button onClick={() => toggleFeature('disabled')} className="btn btn-sm w-full join-item">Button</button>
      <button onClick={() => toggleFeature('disabled')} className="btn btn-sm w-full join-item">Button</button>
      <button onClick={() => toggleFeature('disabled')} className="btn btn-sm w-full join-item">Button</button>
      <button onClick={() => toggleFeature('disabled')} className="btn btn-sm w-full join-item">Stats</button>
    </div>
  )
}