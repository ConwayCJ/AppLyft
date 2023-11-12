import ChangeLog from "@renderer/components/ChangeLog";
import useAppProvider from "@renderer/context/UseAppProvider";

export default function Home() {
  const { username } = useAppProvider()

  // If timer is active, patch notes will get removed. useEffect removes timer



  return (
    <div className="w-full flex flex-col justify-between h-screen">
      <div className="w-full flex flex-col items-center py-6">
        <h1 className=' font-bold text-4xl text-primary'>Welcome back, {username}!</h1>
        <div className="divider"></div>
      </div>

      <div className="flex flex-col items-center flex-grow justify-center">
        Content Placeholder
      </div>

      <ChangeLog />
    </div>
  )
}