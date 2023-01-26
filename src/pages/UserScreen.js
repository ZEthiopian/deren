import  Axios  from 'axios';
import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Store} from '../component/Store';




function UserScreen() {
  
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
   const {state, dispatch: ctxDispatch} = useContext(Store);

const submitHandler = async (e) => {
e.preventDefault();
try {
    const {data} = await Axios.post('/api/users/signin', {
        email,
        password,
        
    });
    ctxDispatch({type: 'USER_SIGNIN', payload: data})
    localStorage.setItem('userInfo', JSON.stringify(data));
    navigate('Form'  || '/');
} catch (err) {
    alert('Invalid email or password');
}
};



  return (
    <div className='form'>
           
    <form >
      
        <label>Email</label>
        <input type='text' required onChange= {e => setEmail(e.target.value)}></input>
       
    
        <label>Password</label>
        <input type='text' required  onChange= {e => setPassword(e.target.value)}></input>
        
        <button className='btn' onClick={submitHandler} >Submit</button>
          
        </form>
 
</div>
  )
}

export default UserScreen