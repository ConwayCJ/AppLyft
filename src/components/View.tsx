import NewJobForm from "./views/NewJobForm";
import Home from "./views/Home";
import JobTable from "./views/table/JobTable";
import { Dispatch, SetStateAction } from "react";


type ViewProps = {
  username: string,
  feature: string,
  setFeature: Dispatch<SetStateAction<string>>
}

export default function View({ feature, setFeature }: ViewProps) {

  const handleView = (feature: string) => {
    switch (feature) {
      case 'home':
        return <Home />
        break
      case 'table':
        return <JobTable setFeature={setFeature} />
        break
      case 'newjob':
        return <NewJobForm />
    }
  }

  return handleView(feature)

}