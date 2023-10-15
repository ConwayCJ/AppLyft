import NewJobForm from "./views/NewJobForm";
import Home from "./views/Home";
import JobTable from "./views/table/JobTable";

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
        return <JobTable username={username} />
        break
      case 'newjob':
        return <NewJobForm username={username} />
    }
  }

  return handleView(feature)

}