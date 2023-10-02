import NewJobForm from "./features/NewJobForm";
import Home from "./features/Home";
import JobTable from "./features/JobTable";

type ViewProps = {
  username: string,
  feature: string,
}

export default function View({ username, feature }: ViewProps) {



  const handleView = (feature: string) => {
    switch (feature) {
      case 'home':
        return <Home />
        break
      case 'table':
        return <JobTable />
        break
      case 'newjob':
        return <NewJobForm />
    }
  }

  return (
    <div>
      {handleView(feature)}
    </div>
  )
}