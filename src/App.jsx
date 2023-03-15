import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppContextProvider from './context/AppContext';
import MyRoutes from './routes/MyRoutes';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AppContextProvider>
          <MyRoutes />
        </AppContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
