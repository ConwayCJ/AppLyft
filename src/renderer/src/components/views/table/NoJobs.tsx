type NoJobProps = {
  setFeature: (feature: string) => void
}

export default function NoJobs({ setFeature }: NoJobProps) {
  return (
    <div className='flex flex-col w-96 py-12 md:justify-center md:w-full items-center'>
      <div className='flex flex-col items-center justify-center font-bold text-warning'>
        <p>Looks like we don&apos;t have any jobs yet.</p>
        <p>Click to get started!</p>
      </div>
      <button className="btn btn-primary mt-8 w-36" onClick={() => setFeature('newjob')}>Add a job</button>
    </div>
  )
}