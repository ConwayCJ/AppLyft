import PDTimer from "./PDTimer";
import useAppProvider from "../../../context/UseAppProvider";
import { useCallback, useRef, useState } from "react";
import { Button, Modal } from "react-daisyui";

export default function PomoDoro() {
  const { setTimeLeft, settings, methods, username } = useAppProvider()

  const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  // const [muteAudio, setMuteAudio] = useState(false)
  // const [autoStartBreak, setAutoStartBreak] = useState(true)


  const Settings = () => {

    const [PDSettings, setPDSettings] = useState(settings.pomoDoro)

    const saveSettings = () => {
      methods.updateSettings(username, { hi: "hi", yes: "yes" })
    }

    const handleUpdateSetting = (e, setting) => {
      setPDSettings(prev => ({ ...prev, [setting]: !setting }))
      console.log(PDSettings)
    }

    type SettingProps = {
      label: string,
      setting: string
    }

    const Setting = ({ label, setting }: SettingProps) => {

      return (
        <div className="flex items-center">
          <input defaultChecked={PDSettings[setting]} onChange={(e) => handleUpdateSetting(e, setting)} className="checkbox checkbox-xs checkbox-info mx-4" type="checkbox" />
          <label>{label}</label>
        </div>
      )
    }

    return (
      <Modal ref={ref}>
        <form method="dialog">
          <Button size="sm" color="ghost" shape="circle" className="absolute right-2 top-2">
            x
          </Button>
        </form>
        <Modal.Header className="font-bold text-primary m-0 p-0">PomoDoro Settings</Modal.Header>
        <div className="divider"></div>
        <Modal.Body>
          <Setting label="Auto Start Break" setting="autoStartBreak" />
          <Setting label="Mute Audio" setting="mute" />
        </Modal.Body>
        <Modal.Actions>
          <form onSubmit={saveSettings} method="dialog">
            <Button>Save</Button>
          </form>
        </Modal.Actions>
      </Modal>
    )
  }

  return (
    <div className=" place-self-start w-full">
      <div className="flex w-full px-12 items-center justify-between lg:justify-center">
        <div>
          <div>
            <h6 className="font-bold text-4xl text-secondary">PomoDoro</h6>
            <div>
              <Button className="btn-xs" onClick={handleShow}>Settings</Button>
              <Settings />
            </div>
          </div>
        </div>
        <div>
          <PDTimer />
        </div>
      </div>
      <div className=" divider m-0"></div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center m-4">
          <p className=" text-3xl text-info">Start Work:</p>
          <div className="join my-4">
            <button onClick={() => setTimeLeft(25 * 60)} className="btn btn-md join-item">25</button>
            <button onClick={() => setTimeLeft(20 * 60)} className="btn btn-md join-item">20</button>
          </div>
        </div>
        <div className="m-4">
          <p className=" text-3xl text-info">Start Break:</p>
          <div className="join my-4">
            <button onClick={() => setTimeLeft(5 * 60)} className=" btn btn-md join-item">5</button>
            <button onClick={() => setTimeLeft(15 * 60)} className=" btn btn-md join-item">15</button>
          </div>
        </div>

      </div>




      <div className="hero-content text-center">
        <div className="max-w-md">
          <article className="text-center">
            <h1 className="text-5xl font-bold text-info">What is PomoDoro?</h1>
            <p className="py-6">
              The PomoDoro technique is a popular time-management method invented by Franceso Cirillo.
              It separates projects and tasks by implementing breaks. For example: After 25 minutes of work, you take 5 minutes of break. After 4 sessions, you take a longer break.
            </p>
          </article>

        </div>
      </div>

    </div>
  )
}