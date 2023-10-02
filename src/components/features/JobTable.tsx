import heman from '../../../public/heman.png'
export default function JobTable() {

  const data = [{
    "title": "SWDE 1",
    "company": "Microsoft",
    "url": "www.microsoft.com",
    "pocname": "Judy Rains",
    "pocurl": "linkedin.com/judy",
    "description": "Giga chad job with super giga chad giga chads",
    "dateApplied": "2023-09-27T00:07:43.123Z",
    "status": "Applied",
    "id": 0
  },
  {
    "title": "Data Test Engineer",
    "company": "Linkedin",
    "url": "linkedin.com",
    "pocname": "Suzy Halls",
    "pocurl": "linkedin.com/suzy",
    "description": "giga chad testing wow java",
    "dateApplied": "2023-09-27T00:07:59.194Z",
    "status": "Applied",
    "id": 1
  },
  {
    "title": "Data Test Engineer",
    "company": "Linkedin",
    "url": "linkedin.com",
    "pocname": "Suzy Halls",
    "pocurl": "linkedin.com/suzy",
    "description": "giga chad testing wow java",
    "dateApplied": "2023-09-27T00:07:59.194Z",
    "status": "Applied",
    "id": 1
  },
  {
    "title": "Data Test Engineer",
    "company": "Linkedin",
    "url": "linkedin.com",
    "pocname": "Suzy Halls",
    "pocurl": "linkedin.com/suzy",
    "description": "giga chad testing wow java",
    "dateApplied": "2023-09-27T00:07:59.194Z",
    "status": "Applied",
    "id": 1
  },
  {
    "title": "Data Test Engineer",
    "company": "Linkedin",
    "url": "linkedin.com",
    "pocname": "Suzy Halls",
    "pocurl": "linkedin.com/suzy",
    "description": "giga chad testing wow java",
    "dateApplied": "2023-09-27T00:07:59.194Z",
    "status": "Applied",
    "id": 1
  },
  {
    "title": "Data Test Engineer",
    "company": "Linkedin",
    "url": "linkedin.com",
    "pocname": "Suzy Halls",
    "pocurl": "linkedin.com/suzy",
    "description": "giga chad testing wow java",
    "dateApplied": "2023-09-27T00:07:59.194Z",
    "status": "Applied",
    "id": 1
  },
  {
    "title": "Data Test Engineer",
    "company": "Linkedin",
    "url": "linkedin.com",
    "pocname": "Suzy Halls",
    "pocurl": "linkedin.com/suzy",
    "description": "giga chad testing wow java",
    "dateApplied": "2023-09-27T00:07:59.194Z",
    "status": "Applied",
    "id": 1
  },
  {
    "title": "Data Test Engineer",
    "company": "Linkedin",
    "url": "linkedin.com",
    "pocname": "Suzy Halls",
    "pocurl": "linkedin.com/suzy",
    "description": "giga chad testing wow java",
    "dateApplied": "2023-09-27T00:07:59.194Z",
    "status": "Applied",
    "id": 1
  },
  {
    "title": "Data Test Engineer",
    "company": "Linkedin",
    "url": "linkedin.com",
    "pocname": "Suzy Halls",
    "pocurl": "linkedin.com/suzy",
    "description": "giga chad testing wow java",
    "dateApplied": "2023-09-27T00:07:59.194Z",
    "status": "Applied",
    "id": 1
  },
  {
    "title": "Data Test Engineer",
    "company": "Linkedin",
    "url": "linkedin.com",
    "pocname": "Suzy Halls",
    "pocurl": "linkedin.com/suzy",
    "description": "giga chad testing wow java",
    "dateApplied": "2023-09-27T00:07:59.194Z",
    "status": "Applied",
    "id": 1
  },
  {
    "title": "Data Test Engineer",
    "company": "Linkedin",
    "url": "linkedin.com",
    "pocname": "Suzy Halls",
    "pocurl": "linkedin.com/suzy",
    "description": "giga chad testing wow java",
    "dateApplied": "2023-09-27T00:07:59.194Z",
    "status": "Applied",
    "id": 1
  },
  {
    "title": "Data Test Engineer",
    "company": "Linkedin",
    "url": "linkedin.com",
    "pocname": "Suzy Halls",
    "pocurl": "linkedin.com/suzy",
    "description": "giga chad testing wow java",
    "dateApplied": "2023-09-27T00:07:59.194Z",
    "status": "Applied",
    "id": 1
  }]

  // const detailedTable = (jobdata: Job[]) => {

  // }

  // const condensedTable = (jobdata: Job[]) => {

  // }

  // const simpleTable = (jobdata: Job[]) => {

  // }

  return (
    <div className="overflow-x-auto overflow-y-auto h-screen">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                Checked
              </label>
            </th>
            <th>Motivator</th>
            <th>Job</th>
            <th>📅 Applied</th>
            <th>📅 Past</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((job, index) => {

            const date = new Date(job.dateApplied)
            const dateString = date.toLocaleDateString()

            const daysSince = Math.round((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24))



            return (
              <tr key={index}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={heman} alt="Job Picture" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {job.title}
                  <br />
                  <span className="badge badge-ghost badge-sm">{job.company}</span>
                </td>
                <td>{dateString}</td>
                <td>{daysSince} days</td>
                <td>
                  <select className="select select-ghost w-full max-w-m">
                    <option disabled defaultValue={"Status"}>Status</option>
                    <option>Applied</option>
                    <option>Emailed Followup</option>
                    <option>Interview Scheduled</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm" onClick={() => document.getElementById(`${job.id}`)?.showModal()}>Details</button>
                  <dialog id={`${job.id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Hello!</h3>
                      <p>Job Url: <a className=" link" href={job.url} target="_blank">{job.url}</a></p>
                      <article className="prose">
                        {job.description}
                      </article>
                      <section>
                        <h4>Person to Contact:</h4>
                        <p>{job.pocname}</p>
                        <p><a className="link" target="_blank" href={job.pocurl}>{job.pocurl}</a></p>
                      </section>
                      <p className="py-4">Press ESC key or click outside to close</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </td>
              </tr>
            )
          })}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>📅 Applied</th>
            <th>📅 Past</th>
            <th>Status</th>
            <th>URL</th>
            <th>Job Description</th>
            <th>Contact</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}