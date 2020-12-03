
import './App.css';
import TableClass from './TableClass';
import Laskuri from './Laskuri';
/*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and saave to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
function App() {
  return <div>
    <h2>Tehtävä 18</h2>
    <TableClass />
    <h2>tehtävä 19</h2>
<TableClass data={[
  {nimi:"nimi1", osoite:"aa11", aloitusvuosi:2026}, 
  {nimi:"nimi2", osoite:"aa22", aloitusvuosi:2029}, 
  {nimi:"nimi3", osoite:"aa33", aloitusvuosi:2027}, 
  {nimi:"nimi4", osoite:"aa44", aloitusvuosi:2023}, 
  {nimi:"nimi5", osoite:"aa55", aloitusvuosi:2024}
  ]} />
  <TableClass data={[
  {nimi:"nimi6", osoite:"aa66", aloitusvuosi:2021}, 
  {nimi:"nimi7", osoite:"aa77", aloitusvuosi:2022}, 
  {nimi:"nimi8", osoite:"aa88", aloitusvuosi:2025}, 
  {nimi:"nimi9", osoite:"aa99", aloitusvuosi:2026}, 
  {nimi:"nimi10", osoite:"aa00", aloitusvuosi:2021}
  ]} />
  <h2>Laskuri</h2>
  <Laskuri />
  </div>;
}

export default App;
