import { Segment } from 'semantic-ui-react';
import './App.css';
import Rotas from './Rotas';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Rotas/>

      <div style={{marginTop: '6%'}}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2024 - Projeto TA em Eng de Soft II - IFPE Jaboatão dos Guararapes - Enio Batalha, Jonathas Gabriel e Lucas Emanuel
        </Segment>
      </div>

    </div>
  );
}

export default App;
