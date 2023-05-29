import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserApi } from "../../utils/api";
import { IUserRegister } from "../../types/user.types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, null, AnyAction>>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState<"Manufacturer" | "Transporter">("Manufacturer");

  const handleRegister = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const userData: IUserRegister = {
      username,
      password,
      address,
      role,
    };

    try {
      await dispatch(registerUserApi(userData));
      console.log('register successfull')
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  return (

      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
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
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
  );
};

export default RegisterForm;
