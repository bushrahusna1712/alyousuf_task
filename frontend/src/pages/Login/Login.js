import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import "./style.css";

function Login() {
  const navigate = useNavigate()

  const [login, setLogin] = useState(true)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState('')

  const handleSubmit = async () => {
    if (login) {
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}users/login`, { email, password })
        if (data) {
          navigate('/home', { state: { user: data.data?.user?.name, id: data.data?.user?._id } })
        }
      } catch (error) {
        toast.error(error?.response?.data?.data?.message || JSON.stringify(error))
      }
    } else {
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}users/register`, { name: userName, email, password })
        if (data) {
          navigate('/home', { state: { user: data.data?.user?.name, id: data.data?.user?._id } })
        }
      } catch (error) {
        toast.error(error?.response?.data?.data?.message || JSON.stringify(error))
      }
    }
  }

  return (
    <div className="login_cmp">
      <ToastContainer />
      <div className="login">
        <div className="login_head">
          <h4>{login ? 'Login' : 'Register'}</h4>
        </div>
        <div className="login_inputs">
          {!login && <Input value={userName} setValue={setUserName} placeholder="User Name" />}
          <Input value={email} setValue={setEmail} type="email" placeholder="Email" />
          <Input value={password} setValue={setPassword} type="password" placeholder="Password" />
        </div>
        <div>
          <Button label="Submit" onClick={handleSubmit} />
        </div>
        <hr />
        {login && <div className="login_btns">
          <p>Don't have an account?&nbsp;</p>
          <Button label="Signup" ternary flex={0} onClick={() => setLogin(false)} />
        </div>}
        {!login && <div className="login_btns">
          <p>Already have an account?&nbsp;</p>
          <Button label="Login" ternary flex={0} onClick={() => setLogin(true)} />
        </div>}
      </div>
    </div>
  );
}

export default Login;
