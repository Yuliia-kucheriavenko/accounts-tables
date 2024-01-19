import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BasicTable } from "./components/BasicTable";
import { ProfilesTable } from "./components/ProfilesTable";
import { CampaignsTable } from "./components/CampaignsTable";

function App() {
  return (
    <>
      <BasicTable />
      <ProfilesTable />
      <CampaignsTable />
    </>
  );
}

export default App;
