import React from "react";
import Layout from "../Component/Layout/Layout";
import "../Component/Layout/commen.css";
import { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const About = () => {
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
            <img
              src="https://plus.unsplash.com/premium_photo-1661573704888-534e648323a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
              style={{ width: "100%", height: "100%" }}
              alt="error"
            />
          </div>
          </Fade>
          <div className="textCon">
            <p className="text" style={{marginTop:"3rem"}}>
              Free text search is a technique that searches documents, records,
              and databases containing or matching one or more words entered by
              users. It’s the type of text retrieval that is the foundation of
              all internet search engines. Almost every application comes with a
              free text search tool. However, there are variations in
              capabilities. The most common ones are metadata search and
              full-text search. The former analyzes only parts or the
              description of documents, while the latter goes through all the
              words in documents.When consumers type in one or more words in the free text search tool, the product results should be direct or close matches to the search terms used. However, there’s a common problem: the lack of relevance in results.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
