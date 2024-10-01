import './App.css';

function App() {

  const irene = "Irene";


  return (
    <div className="App">
      <header className="App-header">
        <p>{irene}</p>
        <input onChange={(e) => console.log(e.target.value)}></input>
        <label>Carga tu EXCEL Aquí</label>
      </header>
    </div>
  );
}

export default App;
