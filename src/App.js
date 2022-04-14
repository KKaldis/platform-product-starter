import NavBar from "./components/ui/NavBar";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <div className="vh-100 vw-100 d-flex align-items-center">
        <NavBar />
        <Dashboard />
      </div>
    </>
  );
}

export default App;
