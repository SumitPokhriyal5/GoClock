import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import AllRoutes from "./components/Routes/AllRoutes";
import { RootState } from "./store/store";
import { useSelector } from 'react-redux';

function App() {
  const { isAuth } = useSelector( ( state: RootState ) => state.user)
  // console.log(import.meta.env.VITE_REACT_URL)
  
  return <div className="App">
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
