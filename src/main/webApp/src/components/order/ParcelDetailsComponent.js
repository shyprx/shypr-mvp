import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Container, Row, Col, Card, CardImg, CardBody } from "reactstrap";
import parcelImg from '../../assets/images/parcel.jpg'

const ParcelDetailsComponent = () => {
  const save = () => {
    console.log("save");
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <br />
            <h3>Enter package details</h3>
            <br />
            <CardBody>
              <Form className="text-center">
                <Row>
                  <Col sm="3"></Col>
                  <Col sm="3">
                    <FormGroup>
                      <b>
                        <Label className="float-left" for="exampleSelect">
                          From City
                        </Label>
                      </b>
                      <Input type="select" name="select" id="exampleSelect">
                        <option>Riyadh</option>
                        <option>Jeddah</option>
                        <option>Dammam</option>
                        <option>Medina</option>
                        <option>Dhahran</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm="3">
                    <FormGroup>
                      <b>
                        <Label className="float-left" for="exampleSelect">
                          To City
                        </Label>
                      </b>
                      <Input type="select" name="select" id="exampleSelect">
                        <option>Riyadh</option>
                        <option>Jeddah</option>
                        <option>Dammam</option>
                        <option>Medina</option>
                        <option>Dhahran</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="3"></Col>
                  <Col sm="3">
                    <FormGroup>
                      <b>
                        <Label className="float-left" for="exampleSelect">
                          Weight
                        </Label>
                      </b>
                      <Input type="select" name="select">
                        <option>&lt; 5Kg</option>
                        <option>&lt; 10Kg</option>
                        <option>&lt; 30Kg</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm="3">
                    <FormGroup>
                      <b>
                        <Label className="float-left" for="size">
                          Size
                        </Label>
                      </b>
                      <Input type="select" name="select">
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm="3"></Col>
                  <Col sm="3" className="text-left">
                    <FormGroup tag="fieldset">
                      <b>
                        <Label for="fieldset">Pickup Type</Label>
                      </b>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" /> Pick-Up
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" /> Drop-Off
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </Col>
                  <Col sm="3" className="text-left">
                    <FormGroup tag="payment">
                      <b>
                        <Label for="pament">Payment</Label>
                      </b>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" /> Cash On Delivery
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" /> Cash immediately
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <Button color="primary">Get Rates Now !</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ParcelDetailsComponent;
