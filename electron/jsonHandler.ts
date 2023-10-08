import fs from "fs";
import { Job } from "../types";

// function checkIds(jobsArray: object[]) {
//   return jobsArray.forEach((job, index) => {
//     if (jobsArray[index].id != index) {
//       jobsArray[index].id = index;
//     }
//   });
// }

export function removeJobs(jobIds: number[], profile: string) {
  try {
    const curData = fs.readFileSync(`data/profile.${profile}.json`, "utf-8");
    const dataArray = JSON.parse(curData);
    
    dataArray.jobs = dataArray.jobs.filter((job) => !jobIds.includes(job.id));

    fs.writeFileSync(`data/profile.${profile}.json`,JSON.stringify(dataArray))

  } catch (jsonError) {
    console.log("Remove Job Error: ", jsonError);
  }
}

export function addJob(newJob: Job, profile: string) {
  try {
    const curData = fs.readFileSync(`data/profile.${profile}.json`, "utf-8");
    const jobsKeyArray = JSON.parse(curData);
    newJob.id = jobsKeyArray.jobs.length;
    jobsKeyArray.jobs.push(newJob);

    fs.writeFileSync(
      `data/profile.${profile}.json`,
      JSON.stringify(jobsKeyArray)
    );
  } catch (jsonError) {
    console.error("Add Job Error: ", jsonError);
  }
}

export async function getAllJobs(profileName: string) {
  try {
    const jobData = await fs.readFileSync(
      `data/profile.${profileName}.json`,
      "utf-8"
    );
    const jobsArray = await JSON.parse(jobData);

    return jobsArray.jobs;
  } catch (jsonError) {
    console.error(jsonError);
  }
}

export async function getProfiles() {
  const profiles = fs.readFileSync("data/existingProfiles.json", "utf-8");
  const jsonProfiles = JSON.parse(profiles);
  return jsonProfiles.profiles;
}

export function createProfile(profileName: string) {
  console.log("Creating profile");
  const defaultJson: string = `{"jobs": []}`;

  try {
    const curData = fs.readFileSync(`data/existingProfiles.json`, "utf-8");
    const profilesArray = JSON.parse(curData);

    if (!profilesArray.profiles.includes(profileName)) {
      profilesArray.profiles.push(profileName);
      fs.writeFileSync(
        `data/existingProfiles.json`,
        JSON.stringify(profilesArray)
      );
      fs.writeFileSync(`data/profile.${profileName}.json`, defaultJson);
      console.log("Successfully created new profile");
    } else {
      console.log("profile already exists");
    }
  } catch (e) {
    console.error(e);
  }
}