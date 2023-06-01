import React, { useEffect, useState } from "react";
import { IUserLogin } from "../../types/user.types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { loginUserApi } from "../../utils/api";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading , error , isAuth , token , user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<ThunkDispatch<any, null, AnyAction>>()
  const navigate = useNavigate();

  const handleLogin = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const userData: IUserLogin = {
      username,
      password,
    };
    await dispatch(loginUserApi(userData))
  };

  useEffect(() => {
    localStorage.setItem("isAuth" , JSON.stringify(isAuth))
    localStorage.setItem("token" , JSON.stringify(token))
    localStorage.setItem('user', JSON.stringify(user))
    if(isAuth){
      toast.success('Login Successful')
      navigate('/')
    }
    else if(error)toast.error(error);
  },[isAuth,error])

  return (
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Enter your Username"
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </div>
        <div>New User? <Link to={'/register'}>Sign Up</Link></div>
        <button disabled={loading} type="button" onClick={handleLogin} className={loading ? "loading" : ""}>
          {loading ? "Loading.." : "Login"}
        </button>
      </form>
  );
};

export default LoginForm;
