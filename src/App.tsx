import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Header } from "./components/Header/Header";
import { About } from "./components/About/About";
import { AccountsTable } from "./components/AccountsTable/AccountsTable";

function App() {
  return (
    <>
      <Header />
      <About />
      <AccountsTable />
    </>
  );
}

export default App;
