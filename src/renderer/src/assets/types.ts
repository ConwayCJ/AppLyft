export type Job = {
  title: string,
  company: string,
  url: string,
  pocname: string,
  pocurl: string,
  description: string,
  status: string,
  dateApplied: Date,
  checked: boolean
  id?: number
}

export type API = {
  username: string,
  timeLeft: number,
  setTimeLeft: (newTime: number) => void
}