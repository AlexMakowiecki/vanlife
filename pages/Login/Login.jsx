import { Link, useLocation, useNavigate, useLoaderData, Form, useActionData, redirect, useNavigation } from "react-router-dom"
import { loginUser } from "/api"
import React from "react"
import "./Login.css"

export function loader({ request }){
  const searchParams = new URL(request.url).searchParams
  return searchParams.get("message")
}

export async function action({ request }){
  const formData = await request.formData()
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password")
  }
  try {
    const prevPath = new URL(request.url).searchParams.get("prevPath")
    const name = await loginUser(loginData)
    localStorage.setItem("loggedIn", true)
    return redirect(`${prevPath || "/host"}`)
  } catch (err) {
    return err.message
  }
}

export default function Login(){
  /* 
  const [ loginFormData, setLoginFormData ] = React.useState({
    email: "",
    password: ""
  }) 
  const navigate = useNavigate()
  const [ errorMessage, setErrorMessage ] = React.useState(null)
  const [ loading, setLoading ] = React.useState(false)
  */
  const errorMessage = useActionData();
  const state = useNavigation().state
  const location = useLocation();
  const loaderData = useLoaderData();
  const message = (loaderData) ? loaderData : location.state?.message

  /* function handleChange(e){
    const { name, value } = e.target;
    setLoginFormData((prevLoginFormData) => {
      return {
        ...prevLoginFormData,
        [name]: value,
      }
    })
  } 

  /* function handleSubmit(e){
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
  } */

  return (
    <main className="login">
      { message && <p className="login__text login__message">{ message }</p> }
      { errorMessage && <p className="login__text login__message">{ errorMessage }</p> }
      <h1 className="login__main-title">Sign in to your account</h1>
      <Form method="post" className="login__form" /* onSubmit={ handleSubmit } */>
        <div className="login__input-container">
          <input type="email" name="email" placeholder="Email address" className="login__input" /* onChange={ handleChange } value={ loginFormData.email } *//>
          <input type="password" name="password" placeholder="Password" className="login__input login__password" /* onChange={ handleChange } value={ loginFormData.password } *//>
        </div>
        <button className="login__button" disabled={ state === "submitting" }>
          {(state === "submitting") ? "Logging in..." : "Sign in"}
        </button>
      </Form>
      <p className="login__text">
        Don't have an account? <Link className="login__link">Create one now</Link>
      </p>
    </main>
  )
}