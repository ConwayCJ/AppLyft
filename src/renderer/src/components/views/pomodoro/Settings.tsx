import { useState, useRef, useCallback, useEffect } from "react"
import { Modal, Button } from 'react-daisyui'
import useAppProvider from "@renderer/context/UseAppProvider"

export default function Settings() {
  const { settings, methods, username } = useAppProvider()
  const [PDSettings, setPDSettings] = useState(settings.pomoDoro)

  // modal ref
  const ref = useRef<HTMLDialogElement>(null)
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  useEffect(() => {

  }, [PDSettings])

  const saveSettings = () => {
    methods.updateSettings(username, PDSettings)
  }

  const handleUpdateSetting = (_e, setting) => {
    setPDSettings(prev => ({ ...prev, [setting]: !prev[setting] }))
    console.log(PDSettings)
  }

  type SettingProps = {
    label: string,
    setting: string
  }

  const Setting = ({ label, setting }: SettingProps) => {

    return (
      <div className="flex items-center">
        <input
          checked={PDSettings[setting]}
          onChange={(e) => handleUpdateSetting(e, setting)}
          className="checkbox checkbox-xs checkbox-info mx-4"
          type="checkbox" />
        <label>{label}</label>
      </div>
    )
  }

  return (
    <>
      <Button className="btn-xs" onClick={handleShow}>Settings</Button>
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
    </>
  )
}