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
const DATA_PATH = `${filePath}/applyft/data`
const version = app.getVersion()
/* APPLICATION INITILIZATION */

export async function getVersion() {
  return version
}

export async function getSettings(profileName) {
  try {
    const profileData = await fs.readFileSync(`${DATA_PATH}/profile.${profileName}.json`, 'utf-8')
    const profileDetails = await JSON.parse(profileData)

    return profileDetails.settings
  } catch (jsonError) {
    console.error(jsonError)
  }
}

export async function updateSettings(username, newSettings) {
  console.log('new s ettings', newSettings)

  const profileData = await fs.readFileSync(`${DATA_PATH}/profile.${username}.json`, 'utf-8')

  const profileObject = await JSON.parse(profileData)
  profileObject.settings = newSettings

  fs.writeFileSync(`${DATA_PATH}/profile.${username}.json`, JSON.stringify(profileObject))
}

export async function getChangeLog() {
  return fs.readFileSync(changelog)
}

export async function getProfiles() {
  const profiles = fs.readFileSync(`${DATA_PATH}/existingProfiles.json`, 'utf-8')
  const jsonProfiles = JSON.parse(profiles)
  return jsonProfiles.profiles
}

export function createFolderStructure() {
  const existingProfilesJson = `{"profiles":[]}`

  try {
    console.log('data folder doesnt exist, making required file structure')
    console.log('Creating data folder: ')
    fs.mkdirSync(DATA_PATH)
    fs.writeFileSync(`${DATA_PATH}/existingProfiles.json`, existingProfilesJson)
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
    const curData = fs.readFileSync(`${DATA_PATH}/profile.${profile}.json`, 'utf-8')
    const dataArray = JSON.parse(curData)

    dataArray.jobs = dataArray.jobs.filter((job: Job) => {
      return jobs.some((jobToRemove) => jobToRemove.id === job.id)
    })

    checkIds(dataArray.jobs)
    fs.writeFileSync(`${DATA_PATH}/profile.${profile}.json`, JSON.stringify(dataArray))
  } catch (jsonError) {
    console.log('Remove Job Error: ', jsonError)
  }
}

export function addJob(newJob: Job, profile: string) {
  try {
    const curData = fs.readFileSync(`${DATA_PATH}/profile.${profile}.json`, 'utf-8')
    const jobsKeyArray = JSON.parse(curData)
    newJob.id = jobsKeyArray.jobs.length
    jobsKeyArray.jobs.push(newJob)
    checkIds(jobsKeyArray.jobs)

    fs.writeFileSync(`${DATA_PATH}/profile.${profile}.json`, JSON.stringify(jobsKeyArray))
  } catch (jsonError) {
    console.error('Add Job Error: ', jsonError)
  }
}

export async function getAllJobs(profileName: string) {
  try {
    const jobData = await fs.readFileSync(`${DATA_PATH}/profile.${profileName}.json`, 'utf-8')
    const jobsArray = await JSON.parse(jobData)

    return jobsArray.jobs
  } catch (jsonError) {
    console.error(jsonError)
  }
}
export async function getJobsByStatus(profileName: string, filter: string) {
  try {
    const jobData = await fs.readFileSync(`${DATA_PATH}/profile.${profileName}.json`, 'utf-8')
    const jobsArray = await JSON.parse(jobData)
    jobsArray.jobs.filter((job: Job) => job.status === filter)
    return jobsArray.jobs
  } catch (jsonError) {
    console.error(jsonError)
  }
}

export function createProfile(profileName: string) {
  const defaultJson: string = `{"jobs": [], "settings": {"pomoDoro": {"mute": false, "autoStartBreak": true}}}`

  try {
    const curData = fs.readFileSync(`${DATA_PATH}/existingProfiles.json`, 'utf-8')
    const profilesArray = JSON.parse(curData)

    if (!profilesArray.profiles.includes(profileName)) {
      profilesArray.profiles.push(profileName)
      fs.writeFileSync(`${DATA_PATH}/existingProfiles.json`, JSON.stringify(profilesArray))
      fs.writeFileSync(`${DATA_PATH}/profile.${profileName}.json`, defaultJson)
    } else {
      console.error('profile already exists')
    }
  } catch (e) {
    console.error(e)
  }
}

export function updateJobs(jobs: Job[], profile: string) {
  try {
    const jobData = fs.readFileSync(`${DATA_PATH}/profile.${profile}.json`, 'utf-8')
    const jobsArray = JSON.parse(jobData)

    jobsArray.jobs = jobs
    checkIds(jobsArray.jobs)
    fs.writeFileSync(`${DATA_PATH}/profile.${profile}.json`, JSON.stringify(jobsArray))
  } catch (jsonError) {
    console.error(jsonError)
  }
}

export function updateSingleJob(job: Job, profile: string) {
  try {
    const jobData = fs.readFileSync(`${DATA_PATH}/profile.${profile}.json`, 'utf-8')
    const data = JSON.parse(jobData)

    data.jobs = data.jobs.filter((jobToRemove: Job) => {
      return jobToRemove.id !== job.id
    })

    data.jobs.push(job)
    fs.writeFileSync(`${DATA_PATH}/profile.${profile}.json`, JSON.stringify(data))
  } catch (jsonError) {
    console.error(jsonError)
  }
}

export function deleteProfile(profile:string){
  try{
    const profileData = fs.readFileSync(`${DATA_PATH}/existingProfiles.json`, 'utf-8')
    const data = JSON.parse(profileData)

    data.profiles = data.profiles.filter((p: string) => {
      return p !== profile;
    });

    fs.writeFileSync(`${DATA_PATH}/existingProfiles.json`, JSON.stringify(data))
  }catch(error){
    console.error(error)
  }
}
