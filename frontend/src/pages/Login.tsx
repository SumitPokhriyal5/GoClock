import LoginForm from "../components/Auth/LoginForm"
import '../scss/auth.scss'
const Login = () => {
  return (
    <div className="login">
      <h1>Login</h1>
      <LoginForm />
    </div>
  )
}

export default Login