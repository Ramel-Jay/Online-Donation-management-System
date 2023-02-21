import React from 'react'
import "./About.css"
import Nav from "../NavigationBar/Nav"
import Mission from "./Image/mission.png"
import Vision from "./Image/vision.png"
import Values from "./Image/values.png"
import Ramel from "./Image/ramel.jpg"
import Kim from "./Image/kim.jpg"
import Andrei from "./Image/andrei.jpg"
import Bjorn from "./Image/bjorn.jpg"
import Mel from "./Image/mel.jpg"
import Footer from "../Footer/footer";

function About() {

return (
    <div>
        <Nav/>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <p className="about-header">ABOUT US</p>
        <br></br>

        <div className="about-container">
            <div className="mission-container">
                <div className="mission">
                    <h2 className="content-header">Mission</h2>
                    <p>ACLC Cares strive to be an effective, hassle free, donation platform for ACLC's donation drive 
                        and charity works, capable of catering to different donators, whether they're affiliated to ACLC or not,
                        and effectively delivering help to those in need.
                    </p>
                    <div className='mission-logo'><img src={Mission}></img></div>
                </div>
            </div>

            <div className="vision-container">
                <div className="vision">
                    <h2 className="content-header">Vision</h2>
                    <p>ACLC Cares aims to become one of the countries biggest donation platforms, reaching out to a wider scope and
                        providing ample aid in different parts of the country.
                    </p>
                    <div className='vision-logo'><img src={Vision}></img></div>
                </div>
            </div>

            <div className="values-container">
                <div className="values">
                    <h2 className="content-header">Values</h2>
                    <p>ACLC Cares dedicates its work on transparency, honesty, integrity, and compassion.</p>
                    <div className='values-logo'><img src={Values}></img></div>
                </div>
            </div>
        </div>

        <br></br>
        <div className='team'>
            <div className="team-header-container">
                <h1 className="team-header">MEET OUR TEAM</h1>
                <p>Below are the individuals behind ACLC Cares.</p>
            </div>

            <div className="about-gallery-container">
                <div className="gallery">
                    <a target="_blank" href="https://www.facebook.com/loyTzy">
                        <img src={Ramel} alt="Ramel"></img>
                    </a>
                    <div className="desc">
                        <h6>Ramel Jay O. Cuña</h6>
                        <p>Project Lead Developer</p>
                        <p className='teammail-color'><a href="mailto:rameljay15@gmail.com">rameljay15@gmail.com</a></p>
                    </div>
                </div>

                <div className="gallery">
                    <a target="_blank" href="https://www.facebook.com/AndreiZabala04/">
                        <img src={Andrei} alt="Andrei"></img>
                    </a>
                    <div className="desc">
                        <h6>Andrei Christian N. Zabala</h6>
                        <p>Project Lead Developer</p>
                        <p className='teammail-color'><a href="mailto:andreichristianzabala@gmail.com">andreichristianzabala@gmail.com</a></p>
                    </div>
                </div>

                <div className="gallery">
                    <a target="_blank" href="https://www.facebook.com/bjornfarinelli">
                        <img src={Bjorn} alt="Bjorn"></img>
                    </a>
                    <div className="desc">
                        <h6>Bjorn Farinelli L. Orgen</h6>
                        <p>Developer</p>
                        <p className='teammail-color'><a href="mailto:bjornfarinelli@gmail.com">bjornfarinelli@gmail.com</a></p>
                    </div>
                </div>

                <div className="gallery">
                    <a target="_blank" href="https://www.facebook.com/kim.pulgalagaday">
                        <img src={Kim} alt="Kim"></img>
                    </a>
                    <div className="desc">
                        <h6>Kim L. Magbulugtong</h6>
                        <p>Research Leader</p>
                        <p className='teammail-color'><a href="mailto:kimpulga21@gmail.com">kimpulga21@gmail.com</a></p>
                    </div>
                </div>

                <div className="gallery">
                    <a target="_blank" href="https://www.facebook.com/melmel.bareja">
                        <img src={Mel} alt="Mel"></img>
                    </a>
                    <div className="desc">
                        <h6>Melhebbford A. Bareja</h6>
                        <p>Researcher</p>
                        <p className='teammail-color'><a href="mailto:barejamel1@gmail.com">barejamel1@gmail.com</a></p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
)
}

export default About
