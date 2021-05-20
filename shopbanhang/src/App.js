
import './App.css';

import RegisterForm from './component/admin/Register'
import DeleteDialog from './component/admin/deleteDialog';
import ModalDialog from 'react-bootstrap/ModalDialog'
import addUser from './component/admin/user/addUser';
import AddCategory from './component/admin/category/addCategory';
import LoginRouter from './LoginRouter';
import AdminRouter from './component/admin/AdminRouter';
import { Fragment } from 'react';



function App() {
  return (
    <Fragment key={1}>

      {/* <LoginForm/> */}
      {/* <LoginForm/> */}

      {/* <RegisterForm/> */}
      {/* <DeleteDialog /> */}
      {/* <AddUser /> */}
      {/* <AddCategory/> */}
     

      {/* <BasicExample/> */}
      {/* <AdminRouter/> */}
      <LoginRouter/>
       
      
    </Fragment>
  );
}

export default App;
