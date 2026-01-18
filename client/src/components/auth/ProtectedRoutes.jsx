import React from 'react'
import {isAuth} from '../../utils/helper';
import {Navigate,Outlet} from 'react-router-dom';

const ProtectedRoutes = () => {
  return isAuth() ? <Outlet/> : <Navigate to='/login'/>
}

export default ProtectedRoutes