import React from "react";
import Layout from "../Component/Layout/Layout";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import '../Component/Layout/commen.css';
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const Contact = () => {
  const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-200px, -100px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
  return (
    <Layout>
      <div className="contactus">
        <div className="contactmiddlepar">
        <Fade keyframes={customAnimation}>
        <div className="imgcon">
          <img src="https://img.freepik.com/free-photo/widely-smiling-businesswoman-working-laptop-sitting-cafe_197531-341.jpg?w=996&t=st=1688110401~exp=1688111001~hmac=42278bb6e3eaa08b9f861a2b41fd6db5fcffc2739146aff77a9135534057917e" style={{ width: "100%",height:"100%" }} alt="error" />
        </div>
        </Fade>
        <div className="textCon">
          <h1 className="p-2 text-white text-center">Contact Us </h1>
          <p className="text-justify">
            This Contact Us page is for a marketing agency that works directly
            with businesses. Since it knows its audience, Brandaffair encourages
            visitors to "have a talk" one-on-one rather than providing a one-way
            communication channel via support resources.
          </p>
          <p>
            <EmailIcon /> : wwhelpecomeraceweb.com
          </p>
          <p>
            <PhoneIcon /> : 626-3383394
          </p>
          <p>
            <ContactSupportIcon /> : 1800-0000-0000 (toll-free)
          </p>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
