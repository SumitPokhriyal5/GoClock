import React, { useState } from "react";
import { IUserRegister } from "../../types/user.types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<"Manufacturer" | "Transporter">("Manufacturer");
  const [load , setLoad] = useState(false)
  const navigate = useNavigate();

  const handleRegister = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const userData: IUserRegister = {
      username,
      password,
      address,
      role,
    };

    setLoad(true)
    fetch(`${import.meta.env.VITE_REACT_URL}/user/register`,{
      method: 'POST',
      body: JSON.stringify(userData),
      headers:{
        'Content-type': 'application/json'
      }
    }).then((res) => res.json()).then((res) => {
      setLoad(false)
      toast.success(res.message)
     if(res.message === 'User registered successfully')navigate('/login')
      console.log("res:",res)
    }).catch((err) => {
      setLoad(false)
      toast.error(err.message)
    }
      )
  };

  return (
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Enter a Unique Username"
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
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            placeholder="Enter your Address"
            value={address}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value as "Manufacturer" | "Transporter")}
          >
            <option value="Manufacturer">Manufacturer</option>
            <option value="Transporter">Transporter</option>
          </select>
        </div>
        <div>Existing User? <Link to={'/login'}>Login</Link></div>
        <button disabled={load} type="button" onClick={handleRegister} className={load ? "loading" : ""}>
          {load ? "Loading.." : "Register"}
        </button>
      </form>
  );
};

export default RegisterForm;
