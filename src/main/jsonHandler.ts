import fs from 'fs'
import changelog from '../../resources/CHANGELOG.md?asset'
import { app } from 'electron'

type Job = {
  title: string
  company: string
  url: string
  pocname: string
  pocurl: string
  description: string
  status: string
  dateApplied: Date
  checked: boolean
  id?: number
}

const filePath = app.getPath('appData')
const version = app.getVersion()
/* APPLICATION INITILIZATION */

export async function getVersion() {
  return version
}

export async function getChangeLog() {
  return fs.readFileSync(changelog)
}

export async function getProfiles() {
  const profiles = fs.readFileSync(`${filePath}/applyft/data/existingProfiles.json`, 'utf-8')
  const jsonProfiles = JSON.parse(profiles)
  return jsonProfiles.profiles
}

export function createFolderStructure() {
  const existingProfilesJson = `{"profiles":[]}`

  try {
    console.log('data folder doesnt exist, making required file structure')
    console.log('Creating data folder: ')
    fs.mkdirSync(`${filePath}/applyft/data`)
    fs.writeFileSync(`${filePath}/applyft/data/existingProfiles.json`, existingProfilesJson)
  } catch (e) {
    console.log('error initializing filestructure: ', e)
  }
}

/* CHECKS JOBS FOR UNIQUE IDS */
function checkIds(jobsArray: Job[]) {
  for (let i = 0; i < jobsArray.length; i++) {
    if (jobsArray[i].id != i) {
      jobsArray[i].id = i
    }
  }
}

/* JSON HELPERS FOR JOB DATA */
export function removeJobs(jobs: Job[], profile: string) {
  try {
    const curData = fs.readFileSync(`${filePath}/applyft/data/profile.${profile}.json`, 'utf-8')
    const dataArray = JSON.parse(curData)

    dataArray.jobs = dataArray.jobs.filter((job: Job) => {
      return jobs.some((jobToRemove) => jobToRemove.id === job.id)
    })

    checkIds(dataArray.jobs)
    fs.writeFileSync(`${filePath}/applyft/data/profile.${profile}.json`, JSON.stringify(dataArray))
  } catch (jsonError) {
    console.log('Remove Job Error: ', jsonError)
  }
}

export function addJob(newJob: Job, profile: string) {
  try {
    const curData = fs.readFileSync(`${filePath}/applyft/data/profile.${profile}.json`, 'utf-8')
    const jobsKeyArray = JSON.parse(curData)
    newJob.id = jobsKeyArray.jobs.length
    jobsKeyArray.jobs.push(newJob)
    checkIds(jobsKeyArray.jobs)

    fs.writeFileSync(
      `${filePath}/applyft/data/profile.${profile}.json`,
      JSON.stringify(jobsKeyArray)
    )
  } catch (jsonError) {
    console.error('Add Job Error: ', jsonError)
  }
}

export async function getAllJobs(profileName: string) {
  try {
    const jobData = await fs.readFileSync(
      `${filePath}/applyft/data/profile.${profileName}.json`,
      'utf-8'
    )
    const jobsArray = await JSON.parse(jobData)

    return jobsArray.jobs
  } catch (jsonError) {
    console.error(jsonError)
  }
}
export async function getJobsByStatus(profileName: string, filter: string) {
  try {
    const jobData = await fs.readFileSync(
      `${filePath}/applyft/data/profile.${profileName}.json`,
      'utf-8'
    )
    const jobsArray = await JSON.parse(jobData)
    jobsArray.jobs.filter((job: Job) => job.status === filter)
    return jobsArray.jobs
  } catch (jsonError) {
    console.error(jsonError)
  }
}

export function createProfile(profileName: string) {
  const defaultJson: string = `{"jobs": []}`

  try {
    const curData = fs.readFileSync(`${filePath}/applyft/data/existingProfiles.json`, 'utf-8')
    const profilesArray = JSON.parse(curData)

    if (!profilesArray.profiles.includes(profileName)) {
      profilesArray.profiles.push(profileName)
      fs.writeFileSync(
        `${filePath}/applyft/data/existingProfiles.json`,
        JSON.stringify(profilesArray)
      )
      fs.writeFileSync(`${filePath}/applyft/data/profile.${profileName}.json`, defaultJson)
    } else {
      console.error('profile already exists')
    }
  } catch (e) {
    console.error(e)
  }
}

export function updateJobs(jobs: Job[], profile: string) {
  try {
    const jobData = fs.readFileSync(`${filePath}/applyft/data/profile.${profile}.json`, 'utf-8')
    const jobsArray = JSON.parse(jobData)

    jobsArray.jobs = jobs
    checkIds(jobsArray.jobs)
    fs.writeFileSync(`${filePath}/applyft/data/profile.${profile}.json`, JSON.stringify(jobsArray))
  } catch (jsonError) {
    console.error(jsonError)
  }
}

export function updateSingleJob(job: Job, profile: string) {
  try {
    const jobData = fs.readFileSync(`${filePath}/applyft/data/profile.${profile}.json`, 'utf-8')
    const data = JSON.parse(jobData)

    console.log(job)

    data.jobs = data.jobs.filter((jobToRemove: Job) => {
      return jobToRemove.id !== job.id
    })

    data.jobs.push(job)
    fs.writeFileSync(`${filePath}/applyft/data/profile.${profile}.json`, JSON.stringify(data))
  } catch (jsonError) {
    console.error(jsonError)
  }
}
