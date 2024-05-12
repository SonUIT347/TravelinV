import "../Footer.css";
import foot_background from "../image/background-footer.png";

import { BsInstagram, BsFacebook, BsGithub } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <div className="page-foot_background">
        <img src={foot_background}></img>
      </div>
      <div className="page-foot">
        <div className="page-foot_container">
          <div className="foot-ins_image">
            <a href="#">
              <img
                className="img_ins"
                src="https://i.pinimg.com/564x/e7/1d/b9/e71db948a03c609d54c52ce32ffc2e06.jpg"
              ></img>
            
              <div className="foot-ins_content">
                <div>
                  <IconContext.Provider value={{ className: "icon_Instagram" }}>
                    <BsInstagram />
                  </IconContext.Provider>
                </div>
                <p>
                  Follow our travels daily on instagram together with 300k
                  others.
                  <IconContext.Provider
                    value={{ className: "icon_arrowRight" }}
                  >
                    <FaArrowRight />
                  </IconContext.Provider>
                </p>
              </div>
            </a>
          </div>
          <div className ="page-foot-text">
            <div className="newsletter_title">
              The Travel
              <span>letter</span>
            </div>
            <div>
              <p className="newsletter_text">
                Want to learn more about tourist attractions in Vietnam?
              </p>
            </div>
            <button className="newsletter_submit">read now</button>
          <nav className="sitemap">
            <ul>
              <li>
                <Link to="/Blogs">Travel Blogs</Link>
              </li>
              <li>
                <Link to="/CreatePost">Create Post</Link>
              </li>
              {/* <li>
                <Link to="/AboutUs">About us</Link>
              </li> */}
              <li className="contact">
                <div className="contact-text">Contact</div>
                <ul>
                  <li className="link-gmail">
                    <a href="mailto:TravelinV@gmail.com">TravelinV@gmail.com</a>
                  </li>
                  <li className="link-social">
                    <ul className="contact_social">
                      <li className="contact_social_container">
                        <a href="https://www.instagram.com/taitai.cute/">
                          <IconContext.Provider
                            value={{ className: "icon_contact_social" }}
                          >
                            <BsInstagram />
                          </IconContext.Provider>
                        </a>
                      </li>
                      <li className="contact_social_container">
                        <a href="https://www.facebook.com/profile.php?id=100011757939460">
                          <IconContext.Provider
                            value={{ className: "icon_contact_social" }}
                          >
                            <BsFacebook />
                          </IconContext.Provider>
                        </a>
                      </li>

                      <li className="contact_social_container">
                        <a href="https://github.com/leethiep/travelinV.git">
                          <IconContext.Provider
                            value={{ className: "icon_contact_social" }}
                          >
                            <BsGithub />
                          </IconContext.Provider>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          </div>
        </div>
        <div className="foot-text">
          <IconContext.Provider value={{ className: "icon_CopyrightCircle" }}>
            <AiOutlineCopyrightCircle />
          </IconContext.Provider>
          <Link to="/">Travel in V</Link> - Website designed & built by group 6.
        </div>
      </div>
    </footer>
  );
}
