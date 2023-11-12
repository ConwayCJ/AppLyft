import { Checkbox, Swap } from "react-daisyui"
import { Job } from '../../../assets/types'
import JobTableRow from "./JobTableRow"
import { useCallback, useState } from 'react'

type JobTableProps = {
  jobs: Array<Job & { checked: boolean }>,
  checkJob: (job: Job & { checked: boolean }) => void,
  checkAll: boolean,
  setCheckAll: (checked: boolean) => void
  setJobs: (jobArr: Array<Job & { checked: boolean }>) => void
}

export default function JobTable({ jobs, checkJob, checkAll, setCheckAll, setJobs }: JobTableProps) {

  const [reversed, setReversed] = useState(false)
  const [tableSize, setTableSize] = useState("md")
  console.log('rerender')
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
      <table className={`table table-${tableSize} table-pin-rows`}>
        <thead className='text-info'>
          <tr>

            <th>
              {/* Checkall box */}
              <Checkbox
                type="checkbox"
                checked={checkAll}
                onChange={() => setCheckAll(!checkAll)}
              />
            </th>
            <TableHeader title="Job" sortBy="title" />
            <TableHeader title="Applied" sortBy="date" />
            <TableHeader title="📅 Past" />
            <TableHeader title="Status" sortBy="status" />
            <TableHeader title="Details" />
            {/* Resize Table */}
            <th className="flex items-center self-end w-max">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M288 96l49.9 49.9-63.9 63.8-128.1 128.2L96 288v128h128l-49.9-49.9 183.3-183.2 8.7-8.8L416 224V96z" fill="currentColor" /></svg>
              <select defaultValue={"Table Size"} className="select mr-2 select-xs select-ghost uppercase w-max" onChange={(e) => setTableSize(e.target.value)}>
                <option className="text-info" value={'xs'}>sm</option>
                <option className="text-info" value={'sm'}>md</option>
                <option className="text-info" value={'lg'}>lg</option>
              </select>
            </th>
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