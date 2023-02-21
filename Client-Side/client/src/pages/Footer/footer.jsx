import React from 'react'
import "./footer.css";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function footer() {

	const navigate = useNavigate;

    return (
		<div>
        <footer className="footerdesign">
			<div className="social-media">
				<button className="fb"><a href="https://www.facebook.com/ACLCTacCity" target="_blank"><FaFacebook/></a></button>
				<button className="yt"><a href="https://www.youtube.com/@aclccollegecreatives7586/featured" target="_blank"><FaYoutube/></a></button>
			</div>
				<p>© Copyright 2021 ACLC Cares/ACLC College of Tacloban</p>	
		</footer>
		</div>
    )
}

export default footer