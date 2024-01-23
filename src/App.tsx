import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BasicTable } from "./components/BasicTable";
import { ProfilesTable } from "./components/ProfilesTable";
import { CampaignsTable } from "./components/CampaignsTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BasicTable />} />
        <Route path="/campaignsTable" element={<CampaignsTable />} />
        <Route path="/profilesTable" element={<ProfilesTable />} />
      </Routes>
    </Router>
  );
};
