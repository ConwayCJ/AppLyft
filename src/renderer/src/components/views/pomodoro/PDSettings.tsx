import { useState, useRef, useCallback, memo } from "react"
import { Modal, Button } from 'react-daisyui'
import useAppProvider from "@renderer/context/UseAppProvider"

export default memo(function PDSettings() {
  const { settings, methods, username } = useAppProvider()
  const ref = useRef<HTMLDialogElement>(null)

  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  const [PDSettings, setPDSettings] = useState(settings.pomoDoro)

  const saveSettings = () => {
    methods.updateSettings(username, { hi: "hi", yes: "yes" })
  }

  const handleUpdateSetting = (_e, setting) => {
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
        <input defaultChecked={PDSettings[setting]} onChange={(e) => handleUpdateSetting(e, setting)} className="btn btn-md checkbox-info mx-4" type="checkbox" />
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
})