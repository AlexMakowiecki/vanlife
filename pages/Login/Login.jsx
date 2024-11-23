import { Link, useLocation, useNavigate } from "react-router-dom"
import React from "react"
import "./Login.css"

export default function Login(){
  const [ loginFormData, setLoginFormData ] = React.useState({
    email: "",
    password: ""
  })
  const [ errorMessage, setErrorMessage ] = React.useState("")
  const [ loading, setLoading ] = React.useState(false)
  const location = useLocation();
  const navigate = useNavigate()

  function handleChange(e){
    const { name, value } = e.target;
    setLoginFormData((prevLoginFormData) => {
      return {
        ...prevLoginFormData,
        [name]: value,
      }
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    fetch("/api/login", { method: "post", body: JSON.stringify(loginFormData) })
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (!data.user) throw {message: data.message}
        localStorage.setItem("loggedIn", true)
        if (location.state?.prevPath)
          navigate(location.state.prevPath, { replace:true })
        else
          navigate("/host", { replace:true })
      })
      .catch(err => {
        setErrorMessage(err.message)
      })
      .finally(_ => {
        setLoading(false)
      })
  }

  return (
    <main className="login">
      { location.state?.message && <p className="login__text login__message">{ location.state.message }</p> }
      { errorMessage && <p className="login__text login__message">{ errorMessage }</p> }
      <h1 className="login__main-title">Sign in to your account</h1>
      <form className="login__form" onSubmit={ handleSubmit }>
        <div className="login__input-container">
          <input type="email" name="email" placeholder="Email address" value={ loginFormData.email } className="login__input" onChange={ handleChange }/>
          <input type="password" name="password" placeholder="Password" value={ loginFormData.password } className="login__input login__password" onChange={ handleChange }/>
        </div>
        <button className="login__button" disabled={ loading }>{(loading) ? "Logging in..." : "Sign in"}</button>
      </form>
      <p className="login__text">
        Don't have an account? <Link className="login__link">Create one now</Link>
      </p>
    </main>
  )
}