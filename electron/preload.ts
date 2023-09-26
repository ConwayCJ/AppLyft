import { contextBridge, ipcRenderer } from 'electron'


// Save data to data.json file:

const saveData = (jobName: string, jobTitle: string, company: string, URL: string, pointOfContact: string) => {

  const data = {
    jobName,
    jobTitle,
    company,
    URL,
    pointOfContact,
    dateApplied: new Date(),
  }

  ipcRenderer.send("saveData", data)

}

const bridge = {
  saveData,
}

contextBridge.exposeInMainWorld("Bridge", bridge)