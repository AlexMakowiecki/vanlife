import { Link } from "react-router-dom"
import "./About.css"

export default function About(){
  return (
    <main className="about">
        <img className="about__img" src="https://www.figma.com/file/igDA2NiMDhoaIIAqm5EnTq/image/370cd3ba87f1968974ee12ce5da85059cc83bb81"/>
        <div className="about__text-content">
            <h1 className="about__main-title">Don’t squeeze in a sedan when you could relax in a van.</h1>
            <p className="about__first-paragraph">Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
            (Hitch costs extra 😉)</p>
            <p className="about__second-paragraph">Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
            <div className="about__content-box">
                <h2 className="about__secondary-title">
                    Your destination is waiting.<br/> 
                    Your van is ready.
                </h2>
                <Link to="/vans" className="about__button">Explore our vans</Link>
            </div>
        </div>

    </main>
  )
}