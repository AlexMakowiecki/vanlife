# Vanlife
## Introduction
It's a website that simulates a website where you can rent vans or manage the vans you've listed for rent. The website doesnt let you add new vans for rent, but lets you access a demo account that already has vans listed for rent.
**Demo account:** `name: b@b.com || password: p123`
## Things learned
### React Router 6
  - **Routes:**
    - **BrowserRouter**: A context provider required for using the functionalities of React Router 6.
    - **Routes**: A component used to group routes.
    - **Route**: A component that handle what has to be rendered when a user try to enter to the url linked to the component.
      - **Props:**
        - `path`: is where you write the url.
        - `element`: the content that will be rendered when the user go to the url.
        - `index:` used in route nesting to set the child as the one to be rendered on the index of that group.
    - **Route nesting:** You can put multiple routes as the children of another route. 
        - Used alongside `Layouts Components` to share layout between the children. 
        - It can also be used for a more organized url pathing between routes, using relative paths.
    - <details>
        <summary><b>Routes Syntax</b></summary>

        ```JSX
        import { BrowserRouter, Routes, Route } from "react-router-dom"
        import { Layout, Home, HomeMenu, HomeAccount } from "some-path"
        export default function App(){
          return (
            <BrowserRouter>
              <Routes>
                <Route path="/other-route" element={<h1>Other Route</h1>}/>
                <Route path="/home">
                  <Route index element={<Home/>}/> // Same path as the parent
                  <Route path="/home/menu" element={<HomeMenu/>}/>
                  <Route path="/home/account" element={<HomeAccount/>}/>
                </Route>
                /* With relative pathing */
                <Route path="/home"> 
                  <Route index element={<Home/>}/>
                  <Route path="menu" element={<HomeMenu/>}/> // Parent => /home
                  <Route path="account" element={<HomeAccount/>}/> // Parent => /home
                </Route>
              </Routes>
            </BrowserRouter>
          )
        }
        ````
      </details>   
  - **Layout components:** React component that has content, a layout, that you want to maintain between multiple routes of your website.
    - **Outlet:** Another component used inside the layout component. This will automatically have the content of the child route accessed.
      - **Props:**
        - `context`: used to pass values of the layout component to the elements rendered in Outlet
          - `useOutletContext()` inside the elements to access the values passed as context.
    - <details>
      <summary><b>Using layout with route nesting</b></summary>

      ```JSX
      /* Layout.jsx */
      import { Outlet } from "react-router-dom"
      export default function Layout(){
        return (
          <header>shared header</header>
          <Outlet/>
          <footer>shared footer</footer>
        )
      }

      /* App.jsx */
      import { BrowserRouter, Routes, Route } from "react-router-dom"
      import { Layout } from "some-path"

      export default function App(){
        return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout/>}>
                <Route index element={<h1>Home</h1>}/>
                  /* Output: 
                      <header>shared header</header>
                      <h1>Home</h1>
                      <footer>shared footer</footer>
                  */
                <Route path="about" element={<h1>About</h1>}/>
                  /* Output: 
                      <header>shared header</header>
                      <h1>About</h1>
                      <footer>shared footer</footer>
                  */
              </Route>
            </Routes>
          </BrowserRouter>
        )
      }
      ```
      </details>
  - **Navigation:**
    - **Link Component:** A component that basically works the same as an `<a>` element, you wrap text with it and the user can click that text to go to the url linked to the component.
      - **Props:**
        - `to`: where the user is redirected when they click the component content
        - `state`: if you want to pass information to the page that the user is redirected, you can pass it trough this property.
        - `relative`: to where is the pathing relative to. To the order of the Routes, or the url path.
      - <details>
          <summary><b>Syntax</b></summary>

          ```JSX
          import { Link } from "react-router-dom"
          <Link to="other-site" state={{ info: "info-example" }}> 
            Text Here
          </Link>
          ```
        </details>
    - **NavLink Component:** Same as Link Component, but with extra functionalities.
      - **Props:**
        - `to`: where the user is redirected when they click the component content
        - `state`: if you want to pass information to the page that the user is redirected, you can pass it trough this property.
        - `className` **function**: in the className property, you can use a function to set classes dynamically. the function returns the final value of className.
          - `isActive` parameter: set to true if the url linked to the component is the one used at the moment, false otherwise. 
        - `end`: Makes the link act as active only when it matches the exact endpoint.
      - <details>
          <summary><b>Syntax</b></summary>

          ```JSX
          import { NavLink } from "react-router-dom"
          <NavLink to="sub-page" className={ isActive => (isActive) ? "active" : "" } end> 
            Text Here 
          </NavLink>
          ```
        </details> 
    - **Navigate Component:** When this component is rendered, it will redirect the user to the url linked to it.
      - **Props**
        - `to`:  where to go when the redirection happens.
        - `state:` if needed, which information send to the page that the user is redirected.
        - `replace:` if active, it will replace the current URL (`c`) in the history stack, with the destination URL. (If the user go back on the browser, it will not send them to `c`)
      - <details>
          <summary><b>Syntax</b></summary>

          ```JSX
          import { Navigate } from "react-router-dom"
          <Navigate to="sub-page" state="canUseString" replace={true}> 
            Text Here 
          </Navigate>
          ```
        </details> 
    - **useNavigate():** It's returns a **function** that you can run to redirect the user to an url.
      - **Function settings**
        - `url` argument: where do you redirect the user to.
        - `{settings}` argument:
          - `replace` property: if set to `true`, it will replace the current URL (`c`) in the history stack, with the destination URL. (If the user go back on the browser, it will not send them to `c`)
      - <details>
          <summary><b>Syntax</b></summary>

          ```JSX
          import { useNavigate } from "react-router-dom"
          const navigate = useNavigate()
          navigate("an-url", { replace: true })
          ```
    - **useLocation():** returns an object containing various information about the page, like the sended information inside the state.
      - **Used Object properties:**
        - `state`: It contains the information passed from other url, when a redirection happens.
        - `pathname`: The path section of the URL.
      - <details>
          <summary><b>Syntax</b></summary>

          ```JSX
          import { useLocation } from "react-router-dom"
          const location = useLocation()
          console.log(location.state) => // undefined if not redirected.
          ```                             
  - **Handling URL params:**
    - **useParams():** It returns an object containing the information of the url **path** params. It takes the values of the URL params and parse them into an object. 
      - <details>
          <summary><b>Syntax</b></summary>

          ```JSX
          /* Path: some-url.com:id */
          /* URL: some-url.com:1972 */
          import { useParams } from "react-router-dom"
          const params = useParams()
          console.log(params.id) => // 1972
          ``` 
    - **useSearchParams():** It returns an array with a structure similar to the React State. (`[searchParams, setSearchParams]`), where in SearchParams are contained information about the url **query string** params.
      -**Array items:**
        - `searchParams`: an Object of the type "URLSearchParams", with the functionalities of its type.  
        - `setSearchParams`: a function that lets you access and changes the "URLSearchParams" object (searchParams). The function will return the new value of searchParams. 
      - <details>
          <summary><b>Syntax</b></summary>

          ```JSX
          /* URL: some-url.com?name=alex&color=blue*/
          import { useSearchParams } from "react-router-dom"
          const [ searchParams, setSearchParams ] = useSearchParams()
          console.log(searchParams) // => URLSearchParams Object
          setSearchParams(prevSearchParams => {
            return (new URLSearchParams())
          })
          ```
    - **URLSearchParams:** a javascript object that lets you interact with the url params.
      - `new URLSearchParams():` Used to create the object, it can receive new values for the url params
      - `.set()`: Changes or set a new key&value pair.
      - `.get()`: Get the value of the key passed as argument.
      - `.delete()`: Delete the key passed as argument, along with its value.
      - `.toString()`: Returns a string with all the key&value pairs. (the same as in the url, without the question mark)
    - **Loader function:** it runs code before the render of the component, normally used to get data that you know that will take time, but is needed for the render of the component.
      - The loader function is passed as a property of the route component that handle the component to be rendered. 
      - For better organization, the loader function is created inside the file where the component to render is, and exported from there
      - You can use **useLoaderData()** to get the data returned from the loader function
      - You can use defer() to tell React for which data it has to wait before the render and for which not.
        - You pass the data inside an object as an argument of the defer() function. 
      - The loader function also receives an object as a default parameter
        - In the object, I used two properties: **request** and **params**
          - **request:**Information about the request sended to get the page rendered
          - **params:**An object containing the URL path params. 
      - <details>
          <summary><b>Syntax</b></summary>

          ```JSX
          /* App.jsx */
          import Example, { exampleLoader } from "example-path"
          export default function App(){
            return (
              <BrowserRouter>
                <Routes>
                  <Route path="/:exampleId" element={<Example/>} loader=/>
                </Routes>
              </BrowserRouter>
              <Example loader={exampleLoader}/>
            )
          }
          /* Example.jsx with URL: /23*/
          import useLoaderData from "react-router-dom"
          export function loader({ request, params }){
            console.log(params) // ==> { exampleId: 23 }
            console.log(request) // ==> { ..., url: http://domainName/23 }
            return "loader executed"
          }

          export default function Example(){
            const loaderMessage = useLoaderData()
            return (
              <h1>{loaderMessage}</h1> // ===> <h1>loader executed</h1>
            )
          }
          ```
        </details>
    - **Await and Suspension:** needed to handle the render of elements that depends on information that you don't know when will you get it (like the loadedData() if is deferred).
      - **Await:** A component that waits for a Promise to be resolved before rendering its own content. 
        - The promise has to be passed inside the property `resolve`
      - **Suspension:** A component that helps react handle components that need to wait for information to render.
        - It has a property named `fallback` that receives the content you want to render while the main content is waiting for the data. 
      <details>
        <summary>Syntax</summary>

        ```JSX
        /* Example.jsx */
        export async function loader(){
          const res = await fetch("some-data")
          const data = res.json()
          return (defer({
            message: data
          }))
        }
        export default function Example(){
          const dataPromise = useLoaderData().message
          return (
            <Suspension fallback={<h1>Loading...</h1>}>
              <Await resolve={dataPromise}>
                <h1>{message}<h1>
              </Await>
            </Suspension>
          )
        }
        ```
      </details>
    - **ErrorElement:** a property of the Route components that determines what to render if the loader or the  data from the loader throws an error. 
      - **useRouteError():** you can use this function inside the ErrorElement to get information about the error.
    - **Action function:** a function that runs when a "Form" (React Router Component) is submitted.
      - It access the information trough the property "request" of the default object parameter, and calling the method formData() of that property. 
      - After that, it manages like any other FormData object.
      - The **Form** component syntax is the same as the `<form>` element
      - You also can return information in the function, and accessing it with the **useActionData()** function.
    - **redirect():** redirect the user to another URL. The same as navigate() but it can be used outside the rendered component.
    - **useNavigation():** it provides an object with information related mainly to the forms.
      - `state`: "idle" if nothing happens, 'submitting' where the form is submitting.      
  - **Use cases**
    - <details>
        <summary><b>Navigation bar with Layout</b></summary>
      
        ```JSX
        /* App */
        import { BrowserRouter, Routes, Route } from "react-router-dom"
        import { Layout } from "some-path"
        export default function App(){
          return (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout/>}>
                  <Route index element={<h1>Home</h1>}/> // => same as parent: /
                  <Route path="account" element={<h1>Account</h1>}/> // => relative path: / + account = /account
                </Route>  
              </Routes>
            </BrowserRouter>
          )
        }
        /* Layout component */
        import { Outlet, NavLink } from "react-router-dom"
        export default function Layout(){
          return (
            <nav>
              /* NavLink required to determine className dynamically*/
              <NavLink to="/" className={isActive => (isActive) ? "nav-link active" : "nav-link"}>
                Home
              </NavLink>
              <NavLink to="/account" className={isActive => (isActive) ? "nav-link active" : "nav-link"}>
                Account
              </NavLink>
            </nav>
            <Outlet/> // if path="/" => <h1>Home</h1> || if path="/account" => <h1>Account</h1>
          )
        }
        ```
    - <details>
        <summary><b>Using URL query params to order a list</b></summary>

        ```JSX
        /* Layout component */
        import { useSearchParams } from "react-router-dom"
        export default function Layout(){
          const [ searchParams, setSearchParams ] = useSearchParams()

          function setPriceOrder(priceOrder){
            setSearchParams(prevSearchParams => {
              prevSearchParams.set("price-order", priceOrder)
            })
          }

          const priceOrder = searchParams.get("price-order")
          const listClass = (priceOrder && priceOrder === "max") ? "max-order" : "min-order"

          return (
            <>
              <nav>
                <button onClick={setPriceOrder("max")}>Max price</button>
                <button onClick={setPriceOrder("min")}>Min price</button>
              </nav>
              <ul className={ listClass }>
                <li>1000$</li>
                <li>4000$</li>
                <li>9000$</li>
              </ul>
            </>
          )
        }

        ``` 
    - <details>
        <summary><b>Moving between pages, maintaining URL query params</b></summary>

        ```JSX
        
        /* Previous page */
        /* Url: /prev-page?filterOne=valueOne&filterTwo=valueTwo */
        import { useSearchParams } from "react-router-dom"
        export default function PrevPage(){
          const [ searchParams, setSearchParams ] = useSearchParams()
          return (
            <Link to="/next-page" state={{queryParams: searchParams.toString()}}>
              To next page
            </Link>
          )
        }
        /* Next page */
        import { useLocation } from "react-router-dom"
        export default function NextPage(){
          const location = useLocation();
          const queryParams = (location.queryParams) ? `?${location.queryParams}` : ""
          // queryParams = ?filterOne=valueOne&filterTwo=valueTwo
          return (
            <Link to={`/prev-page${queryParams}`}>
              To previous page
            </Link>  
          )
        }
        ```
    - <details>
        <summary><b>Making a Auth Layout to protect private pages</b></summary>

        ```JSX
        /* Auth Layout */
        export default function AuthRequired(){
          
          /* Some code to get the Authorization. For the example, it will be set up as True*/
          const auth = true
          
          return (auth)
            ? <Navigate to="/need-to-login" replace>
            : <Outlet/>
        }
        ```                                    
## About Scrimba

At Scrimba our goal is to create the best possible coding school at the cost of a gym membership! 💜
If we succeed with this, it will give anyone who wants to become a software developer a realistic shot at succeeding, regardless of where they live and the size of their wallets 🎉
The Frontend Developer Career Path aims to teach you everything you need to become a Junior Developer, or you could take a deep-dive with one of our advanced courses 🚀

- [Our courses](https://scrimba.com/allcourses)
- [The Frontend Career Path](https://scrimba.com/learn/frontend)
- [Become a Scrimba Pro member](https://scrimba.com/pricing)

Happy Coding!
