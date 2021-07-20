import './App.css';
import CreateOrder from './CreateOrder.js'

function App() {
    return (
      <div className='App'>
        <div className='Container' style ={{borderWidth: "10vw",borderColor: "blue",}}>
            <div className='Title'>
                <h3>
                    Create Order
                </h3>
            </div>  
            

            <CreateOrder/>  




        </div>
      </div>
    );
}

export default App;
