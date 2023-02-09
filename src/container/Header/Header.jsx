import React, { useState } from "react";

import { SubHeading } from "../../components";
import { images } from "../../constants";
import Modal from "react-bootstrap/Modal";
import "./Header.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Header = () => {
  const [show, setShow] = useState(false);

  const [heladerText, setHelaserText] = useState('');
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubScribeClick = () => {
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (name.value === "") {
      setName({ ...name, error: "Please enter name" });
    }
    if (email.value === "") {
      setEmail({ ...email, error: "Please enter email" });
    } else if (!email.value.match(mailFormat)) {
      setEmail({ ...email, error: "Please enter valid email" });
    }
    if (
      name.value !== "" &&
      email.value !== "" &&
      email.value.match(mailFormat)
    ) {
      submitSubscribeData()
    }
  };

  const submitSubscribeData = () => {
    const body = {
      name: name.value,
      email: email.value,
    }
    fetch("http://localhost:8080/", {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((data) => {
        console.log("Data", data);
        setHelaserText('Your data subited successfuly')
        setEmail({ value: '', error: '' })
        setName({ value: '', error: '' })

      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  return (
    <div className="app__header app__wrapper section__padding" id="home">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>

          <h3 className="app__header-h1">Get the latest from Merrithew delivered right to your inbox</h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name.value}
              type="email"
              placeholder=" "
              onChange={(event) => {
                setHelaserText('')
                setName({ error: "", value: event.target.value });
              }}
              onBlur={() => {
                if (name.value === "") {
                  setName({ ...name, error: "Please enter name" });
                }
              }}
            />
            {!!name.error && (
              <Form.Label style={{ color: "red" }}>{name.error}</Form.Label>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email.value}
              type="email"
              placeholder=" "
              onChange={(event) => {
                setHelaserText('')
                setEmail({ error: "", value: event.target.value });
              }}
              onBlur={() => {
                if (email.value === "") {
                  setEmail({ ...email, error: "Please enter email" });
                }
              }}
            />
            {!!email.error && (
              <Form.Label style={{ color: "red" }}>{email.error}</Form.Label>
            )}
          </Form.Group>
          <div style={{ flex: 1 }}>
            <Button
              onClick={onSubScribeClick}
              style={{ width: "100%", backgroundColor: '#680c80' }}
              variant="primary"
              size="lg"
            >
              Subscribe
            </Button>
            {!!heladerText && (
              <Form.Label style={{ color: "green" }}>{heladerText}</Form.Label>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <div className="app__wrapper_info">
        <div>
          <SubHeading title="Feel Good February" />
          <h1 className="app__header-h1">
            Give your Mind, Body and Business a Boost
          </h1>
          <p className="p__opensans" style={{ margin: "1rem 0" }}>
            15 days of bussiness insights, nutrition and mindfulness tips, and
            programming ideas to take back to your clients
          </p>
        </div>
        <button onClick={handleShow} type="button" className="custom__button">
          Subscribe
        </button>
      </div>

      <div className="app__wrapper_img">
        <img src={images.welcome} alt="header_img" />
      </div>
    </div>
  );
};

export default Header;
