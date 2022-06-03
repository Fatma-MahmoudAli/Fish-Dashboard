import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from './Component/ol code/pieChart';
import Datamap from './Component/ol code/datapopup';

function App() {
  return (
    <div className="container-fluid ">
      <h4 style={{"text-align":"center"}}>Egypt's lakes Dashboard</h4>
      <div >
        <Datamap />
      </div>
      <div >
        <Chart />
      </div>

    </div>
  );
}

export default App;
