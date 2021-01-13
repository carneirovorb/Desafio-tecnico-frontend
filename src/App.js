import React, {useState,useEffect} from 'react';
import axios from 'axios'
import './App.css';

const api = axios.create();

function App() {

  /**
   * Application states
   */ 
  const [producers, setProducers] = useState([]);
  const [models, setModels] = useState(null);
  const [activeLink, setActiveLink] = useState(null);

  /**
   * Funcional Constructor
   * Fetch producers
  */
  useEffect(() => {
    async function fetch(){
      let response = await api.get('https://parallelum.com.br/fipe/api/v1/carros/marcas');
      setProducers(response.data);
    }
    fetch();
  }, []);

  /**
   * Fetch models of a procucer
  */
  const handleProducer = async (codModel) => {
      let response = await api.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codModel}/modelos`);
      setModels(response.data.modelos);
      setActiveLink(codModel);
  }

  /**
   * UI render
  */
  return (
    <div className="App">
      <nav className="AppHeader Container">
        <p>Navita</p>
      </nav>
      <div className="Container">
        <p className="Header">Veículos</p>
          <div className="Producers">
          <div className="ModelsHeader Container">
                  <div className="Title">Marcas</div>
            </div> 
            <div className="Item Container">
                  <div className="Title">Marca</div>
            </div>
            { 
              producers.map(producer=>(
                <div className="Item Container" key={producer.codigo}>
                  <div className="Producer">{producer.nome}</div>
                  <div className="InfoModel"><a className={activeLink===producer.codigo?'Active':''} onClick={() => handleProducer(producer.codigo)} href="/#">Ver modelos</a></div>
                </div>
              ))
            }
          </div>
          { 
          
          models!=null &&
          <div className="Models">
            <div className="ModelsHeader Container">
                  <div className="Title">Modelos</div>
            </div> 
            <div className="Item Container">
                  <div className="Title">Modelo</div>
            </div> 
            { 
              models.map(model=>(
                <div className="Item Container" key={model.codigo}>
                  <div className="Model">{model.nome}</div>
                  
                </div>
              ))
            }
          </div>
          }  
      </div>
      <footer>
        <p>
          Copyright © Navita 2021
        </p>
      </footer>
    </div>
  );



}

export default App;
