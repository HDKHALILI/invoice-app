import Nav from "./Nav";
import Invoices from "./Invoices";
import "../styles/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <main className="App-content">
        <Invoices />
      </main>
    </div>
  );
}

export default App;
