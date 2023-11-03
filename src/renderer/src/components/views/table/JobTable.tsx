import { Swap } from "react-daisyui"
import { Job } from '../../../assets/types'
import JobTableRow from "./JobTableRow"
import { useCallback, useState } from 'react'

type JobTableProps = {
  jobs: Array<Job & { checked: boolean }>,
  tableSize: string,
  checkJob: (job: Job & { checked: boolean }) => void,
  checkAll: boolean,
  setCheckAll: (checked: boolean) => void
  setJobs: (jobArr: Array<Job & { checked: boolean }>) => void
}

export default function JobTable({ jobs, tableSize, checkJob, checkAll, setCheckAll, setJobs }: JobTableProps) {

  const [reversed, setReversed] = useState(false)

  const TableHeader = useCallback(({ title, sortBy }: { title: string | null, sortBy?: string }) => {

    function handleSortJobs() {

      if (sortBy == 'date') {
        const sortedJobs = jobs.sort((a, b) => new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime());
        setJobs(reversed ? [...sortedJobs.reverse()] : [...sortedJobs])
        setReversed(!reversed)
      } else if (sortBy) {
        const sortedJobs = jobs.sort(function (a: any, b: any) {
          const x = a[sortBy]; const y = b[sortBy];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        setJobs(reversed ? [...sortedJobs.reverse()] : [...sortedJobs])
        setReversed(!reversed)
      }

    }


    function SwapSortButton() {
      const buttonSize = 14

      return (
        //@ts-expect-error
        <Swap
          className="mr-1"
          onElement={<svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width={`${buttonSize}px`} height={`${buttonSize}px`} viewBox="0 0 15 15"><path fill="currentColor" d="m3.5.5l.354-.354a.5.5 0 0 0-.708 0L3.5.5ZM3.146.146l-3 3l.708.708l3-3l-.708-.708Zm0 .708l3 3l.708-.708l-3-3l-.708.708ZM3 .5V15h1V.5H3ZM9 4h6V3H9v1Zm0 4h4V7H9v1Zm0 4h2v-1H9v1Z" /></svg>}
          offElement={<svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width={`${buttonSize}px`} height={`${buttonSize}px`} viewBox="0 0 15 15"><path fill="currentColor" d="m3.5 14.5l-.354.354a.5.5 0 0 0 .708 0L3.5 14.5Zm.354.354l3-3l-.708-.708l-3 3l.708.708Zm0-.708l-3-3l-.708.708l3 3l.708-.708ZM3 0v14.5h1V0H3Zm6 4h6V3H9v1Zm0 4h4V7H9v1Zm0 4h2v-1H9v1Z" /></svg>}
          onChange={handleSortJobs}
          active={reversed}
        />
      )
    }

    return (
      <th>
        <p className="flex w-full">
          {sortBy && <SwapSortButton />}
          {title}
        </p>
      </th>
    )

  }, [jobs, reversed, setJobs])

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
            <TableHeader title="Job" sortBy="title" />
            <TableHeader title="Applied" sortBy="date" />
            <TableHeader title="📅 Past" />
            <TableHeader title="Status" sortBy="status" />
            <TableHeader title="Details" />
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