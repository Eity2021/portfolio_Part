import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import axios from 'axios';
import { meta } from "../../content_option";
import { MonitorCog } from 'lucide-react';
function Projects() {
  const [portfolio, setPortfolio] = useState([]);
  console.log("portfolio", portfolio);
  const [loading, setLoading] = useState(true);





  useEffect(() => {
    axios
      .get("https://portfolio-backend-part.vercel.app/projects")
      .then((response) => {
        setPortfolio(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);
  return (
    <div style={{ background: "#0c0c0c" }}>
      <div>
        {loading === true ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <PuffLoader color="#12fff1" />
          </div>
        ) : (
          <div>

            <HelmetProvider>
              <Container className="About-header">
                <Helmet>
                  <meta charSet="utf-8" />
                  <title> Portfolio | {meta.title} </title>{" "}
                  <meta name="description" content={meta.description} />
                </Helmet>
                <Row className="pt-md-3">
                  <Col lg="12">
                    <h1 className="display-4" style={{ textAlign: "left", color: "#fff", marginTop: '100px' }}> Portfolio </h1>
                    <p className=" mb-4" style={{ textAlign: "left", color: "#fff", marginTop: '4px' }}> A collection of my recent work and side projects </p>
                    <hr className="t_border  ml-0 text-left" style={{ marginTop: "30px", marginBottom: "50px" }} />
                  </Col>
                </Row>
                <div className="pb-5 po_items_ho">
                  {portfolio.map((data, index) => {
                    return (
                      <div key={index} className="po_item">
                        <div>
                          <div>
                            <img src={data.image} alt={data.name} className="po_image" />
                          </div>
                          <div style={{ textAlign: "left", paddingLeft: "20px", paddingRight: "20px", paddingTop: '50px' }}>
                            <h4 style={{ fontFamily: 'sans', fontWeight: 'bold', color: "#333", fontSize: "30px" }}>
                              {data.name}
                            </h4>
                            <p style={{ color: "#737373", fontSize: '17px', lineBreak: '10px', font: 'sans', paddingTop: '10px', fontFamily: 'sans' }}>
                              {data.description}
                            </p>

                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(5, 1fr)',
                              gap: '10px',
                              paddingTop: "10px",
                              paddingBottom: "20px"
                            }}>
                              {
                                data?.languageInfo.map((tech, index) => (
                                  <div key={index} >
                                    <p style={{ marginBottom: '0px', backgroundColor: '#f1f1f1', display: 'flex', justifyContent: 'center', fontSize: "12px", paddingTop: '3px', paddingLeft: '3px', borderRadius: "10px", fontFamily: 'sans' }}>{tech}</p>
                                  </div>
                                ))
                              }
                            </div>

                            <div style={{ display: 'flex', gap: '6px' }}>
                              <MonitorCog color="#737373" size={20} />
                              <a href={data?.liveLink} target="_blank" style={{ textDecoration: 'none', color: '#737373', fontSize: '14px', fontWeight: 'bold', fontFamily: 'sans' }} >Live Demo</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Container>
            </HelmetProvider>


          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;



// <img src={data.image} alt="image" />
//                       <div className="content">
//                         <button onClick={() => openModal(data)} style={{ color: '#fff', background: "#0c0c0c" }}>
//                           View Project Details
//                         </button>
//                       </div>