import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AddUser from './component/admin/user/addUser';
import UpdateUser from './component/admin/user/updateUser';
import ListUser from './component/admin/user/listUser';
import ListCategory from './component/admin/category/listCategory';

import AddPost from './component/admin/post/addPost';
import ListPost from './component/admin/post/listPost';
import ListComment from './component/admin/comment/listComment';

ReactDOM.render(
  <React.StrictMode>
    
    {/* <AddUser/> */}
    {/* <UpdateUser/> */}

    {/* <ListCategory/> */}
   
    {/* <ListUser/> */}
    <App />
    {/* <Login /> */}
    {/* <AddPost/> */}

    {/* <ListPost/> */}

    {/* <ListComment /> */}


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
