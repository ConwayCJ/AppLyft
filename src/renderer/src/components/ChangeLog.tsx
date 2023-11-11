import { useEffect, useState } from "react"
import useAppProvider from "@renderer/context/UseAppProvider"

type Changes = Array<{ version: string, changes: string[] }>

export default function ChangeLog() {
  const { changelog } = useAppProvider()
  const [changes, setChanges] = useState<Changes>([])

  async function formatChangeLog() {
    const log = await changelog()
    const decode = new TextDecoder().decode(new Uint8Array(log))

    const formattedChangelog = decode.replace(/<!--[\s\S]*?-->\s*/, '').split(/\n(?=###)/);
    const readmeFormatted = formattedChangelog.map(section => {
      const [versionLine, ...changes] = section.trim().split('\n');
      const version = versionLine.replace(/###\s+/, '').trim();
      const changesText = changes.join('\n').trim().split("-");
      return { version, changes: changesText.map(text => text.trim()) };
    })
    setChanges(readmeFormatted)
  }
  useEffect(() => {
    formatChangeLog()
  }, [])

  const RenderChanges = () => {
    return (
      <div className="overflow-y-scroll h-[160px] text-sm">

        {changes.map((log, i) => (
          <div key={i}>
            <h6 className=" text-info py-2 font-semibold italic">
              {log.version}
            </h6>
            {log.changes.splice(1, log.changes.length).map((change, index) => (
              <p key={index}>
                - {change !== "-" ? change : null}
              </p>
            ))}
          </div>))}
      </div>
    )
  }

  return (
    <div className=" flex flex-col w-full">
      <h4 className="text-primary font-bold text-2xl">Latest Changes:</h4>
      <div className="divider my-0"></div>
      <RenderChanges />
    </div>

  )
}