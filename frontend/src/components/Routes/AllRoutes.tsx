import { Routes , Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Register from '../../pages/Register'
import Login from '../../pages/Login'
import PageNotFound from '../../pages/PageNotFound'
const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='*' element={ <PageNotFound/> } />
    </Routes>
  )
}

export default AllRoutes