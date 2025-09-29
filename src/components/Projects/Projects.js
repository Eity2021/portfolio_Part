import { Helmet, HelmetProvider } from "react-helmet-async";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import Modal from "./Modal";
import axios from 'axios';
import { meta } from "../../content_option";
function Projects() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [perProduct, setPerProduct] = useState([]);


  const openModal = (product) => {
    setIsOpen(true);
    // setProductId(id)
    setPerProduct(product);
  };
  const closeModal = () => setIsOpen(false);

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
                  {portfolio.map((data, i) => {
                    return (
                      <div key={i} className="po_item">
                        <div>
                          <div>
                            <img src={data.image} alt={data.name} className="po_image" />
                          </div>
                          <div style={{ textAlign: "left", paddingLeft: "20px", paddingRight: "20px", paddingTop: '50px' }}>
                            <h4 style={{}}>
                              {data.name}
                            </h4>
                            <p>
                              {data.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Container>
            </HelmetProvider>


            <Modal
              isOpen={isOpen}
              closeModal={closeModal}
              perProduct={perProduct}
            ></Modal>
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