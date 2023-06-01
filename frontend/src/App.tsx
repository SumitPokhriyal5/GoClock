import AllRoutes from "./components/Routes/AllRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isAuth = localStorage.getItem('isAuth');
  const parsedIsAuth = isAuth ? JSON.parse(isAuth) : false;
    
  return <div className="App">
    <ToastContainer />
    <AllRoutes/>
  </div>;
}

export default App;
