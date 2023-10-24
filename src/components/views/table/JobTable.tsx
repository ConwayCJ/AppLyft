import { Job } from "../../../../types"

import JobTableRow from "./JobTableRow"


type JobTableProps = {
  filterOption: string,
  jobs: Array<Job & { checked: boolean }>,
  tableSize: string,
  checkJob: (job: Job & { checked: boolean }) => void,
  checkAll: boolean,
  setCheckAll: (checked: boolean) => void
}

export default function JobTable({ jobs, tableSize, checkJob, checkAll, setCheckAll }: JobTableProps) {



  return (
    <div className='overflow-x-auto'>
      <table className={`table ${tableSize} table-pin-rows`}>
        <thead className='text-info'>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={checkAll}
                className="checkbox"
                onChange={() => setCheckAll(!checkAll)} />
            </th>
            <th>Job <span></span></th>
            <th>📅 Applied</th>
            <th>📅 Past</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>

          {jobs.map((job, index) => (
            <JobTableRow key={index} job={job} checkJob={checkJob} tableSize={tableSize} />
          ))}

        </tbody>
        <tfoot className='text-info'>
          <tr>
            <th></th>
            <th>Job</th>
            <th>📅 Applied</th>
            <th>📅 Past</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </tfoot>
      </table>
    </div >
  )
}