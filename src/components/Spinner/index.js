import React from "react"
import { Row, Col } from "reactstrap"

import { useTimer } from "../../effects"

const Spinner = ({ spinnerTime, profileSpinner }) => {
  if (spinnerTime != false) {
    const isTimeUp = useTimer()
    // if (isTimeUp) return null
  }
  if (profileSpinner === true) {
    return (
      <Row className="justify-content-center">
        <Col>
          <div
            className="sk-wave"
            style={{
              margin: "0px auto",
              width: "50px",
              height: "25px",
              textAlign: "center",
              fontSize: "10px"
            }}
          >
            <div
              className="sk-rect sk-rect1"
              style={{ backgroundColor: "white" }}
            />
            &nbsp;
            <div
              className="sk-rect sk-rect2"
              style={{ backgroundColor: "white" }}
            />
            &nbsp;
            <div
              className="sk-rect sk-rect3"
              style={{ backgroundColor: "white" }}
            />
            &nbsp;
            <div
              className="sk-rect sk-rect4"
              style={{ backgroundColor: "white" }}
            />
            &nbsp;
            <div
              className="sk-rect sk-rect5"
              style={{ backgroundColor: "white" }}
            />
          </div>
        </Col>
      </Row>
    )
  } else {
    return (
      <Row className="justify-content-center">
        <Col>
          <div className="sk-wave">
            <div className="sk-rect sk-rect1" />
            &nbsp;
            <div className="sk-rect sk-rect2" />
            &nbsp;
            <div className="sk-rect sk-rect3" />
            &nbsp;
            <div className="sk-rect sk-rect4" />
            &nbsp;
            <div className="sk-rect sk-rect5" />
          </div>
        </Col>
      </Row>
    )
  }
}

export default Spinner
