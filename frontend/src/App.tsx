import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import AllRoutes from "./components/Routes/AllRoutes";
import { RootState } from "./store/store";
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isAuth } = useSelector( ( state: RootState ) => state.user)
    
  return <div className="App">
    <ToastContainer />
    {isAuth && (
    <>
     <Header/>
     <Sidebar/>
    </>
  )}
  <AllRoutes/>
  </div>;
}

export default App;
