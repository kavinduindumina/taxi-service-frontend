import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { FaArrowLeft, FaStar, FaCreditCard, FaLock } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { MdCheckCircle } from "react-icons/md";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Swal from "sweetalert2";
import axios from "axios";

const center = { lat: 6.927079, lng: 79.861244 };

export default function Scheduleride() {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState("");
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(center);
  const [pickupTime, setPickupTime] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [rideStatus, setRideStatus] = useState("Pending");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardType: "visa",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "Your-API-Key",
    libraries: ["places"],
  });

  useEffect(() => {
    if (bookingDetails) {
      setConfirmationMessage(
        `Your booking for ${bookingDetails.dropLocation} is pending. Your driver will be assigned 15 to 30 minutes before the specified time, and trip details will be shared then. The trip fare may change depending on availability.`
      );
    }
    axios.get("http://localhost:3000/api/v1/passenger/ride-details/1").then((response) => {
      setBookingDetails(response.data.data[0]);
      console.log("Ride details fetched:", response.data.data[0]); 
    })
    .catch((error) => {
      console.error("Error fetching rides:", error);
    });

    setPickupLocation(bookingDetails.pickupLocation);
    setDropLocation(bookingDetails.dropLocation);
    setRideStatus(bookingDetails.status);

    let dateTimeStr = bookingDetails.createdAt;

    // Ensure it's not undefined or null
    if (dateTimeStr) {
        let dateObj = new Date(dateTimeStr);
        if (!isNaN(dateObj.getTime())) {
            // Date is valid
            let date = dateObj.toISOString().split('T')[0];
            let time = dateObj.toISOString().split('T')[1].split('.')[0];
    
            setPickupDate(date);
            setPickupTime(time);
        } else {
            console.error("Invalid date format:", dateTimeStr);
        }
    } else {
        console.error("Date is undefined or null:", dateTimeStr);
    }

  }, [bookingDetails]);

  useEffect(() => {
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        () => {
          console.log("Geolocation not supported or permission denied.");
        }
      );
    }
  }, [isLoaded]);

  const handleBackClick = () => {
    navigate("/PassengerDashboard");
  };

  const handleDoneClick = () => {
      setShowRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleRatingSubmit = () => {
    if (rating === 0) {
      Swal.fire({
        title: "Oops!",
        text: "Please select a rating before submitting.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "Thank You!",
      text: `You rated your ride ${rating} stars.`,
      icon: "success",
      confirmButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowRatingModal(false);
        setRating(0);
        console.log(`Submitted rating: ${rating}`);
        navigate("/Home");
      }
    });
  };

  const handlePayClick = () => {
    if(rideStatus === "pending") {
      Swal.fire({
        title: "Not Confirmed",
        text: "Your booking is not confirmed yet. You can pay after your trip is confirmed!.",
        icon: "info",
        confirmButtonText: "OK",
      });
      return;
    }
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentMethod("");
    setCardDetails({
      cardType: "visa",
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      cvv: "",
    });
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    if (method === "cash") {
      handleClosePaymentModal();
      setRideStatus("completed");
    }
  };

  const handleCardPayment = () => {
    Swal.fire({
      title: "Confirm Payment",
      text: "Are you sure you want to proceed with the payment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, pay now",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Here you would typically process the card payment
        console.log("Processing card payment:", cardDetails);
        handleClosePaymentModal();
        setRideStatus("Completed");
        Swal.fire(
          "Payment Successful!",
          "Your payment has been processed successfully.",
          "success"
        );
      }
    });
  };

  const handleCardDetailsChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      fluid
      className="p-0 position-relative"
      style={{ height: "100vh", backgroundColor: "#4CAF50" }}
    >
      <div className="position-absolute top-0 start-0 p-3">
        <FaArrowLeft color="black" size={24} onClick={handleBackClick} />
      </div>
      <div className="position-absolute top-0 end-0 p-3">
        <BsInfoCircle color="black" size={24} />
      </div>

      <Row style={{ height: "60%" }}>
        <GoogleMap
          center={currentLocation}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={currentLocation} />
        </GoogleMap>
      </Row>

      <Card
        className="position-absolute bottom-0 start-0 end-0"
        style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
      >
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col xs="auto">
              <MdCheckCircle
                color={
                  rideStatus === "pending"
                    ? "#FFA500"
                    : rideStatus === "completed"
                    ? "#4CAF50"
                    : "red"
                }
                size={24}
              />
            </Col>
            <Col>
              <h5 className="mb-0">Scheduled Ride: {rideStatus}</h5>
            </Col>
          </Row>

          <h6 className="text-muted mb-3">Pickup Date & Time</h6>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="pickupTime">
                <Form.Label>Pick-up Time</Form.Label>
                <Form.Control
                  type="text"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="pickupDate">
                <Form.Label>Pick-up Date</Form.Label>
                <Form.Control
                  type="text"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={2} className="text-primary">
              PICKUP
            </Col>
            <Col>
              <Form.Control
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={2} className="text-danger">
              DROP
            </Col>
            <Col>
              <Form.Control
                type="text"
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
              />
            </Col>
          </Row>

          <div className="mb-4">
            <Row>
              <Col>
                STATUS:{" "}
                <span style={{ display: "inline-block" }} className={rideStatus === "completed" ? "text-success" : "text-warning" }>  {rideStatus} </span>
              </Col>
            </Row>
          </div>

          <Card className="bg-light border-0 mb-3">
            <Card.Body>{confirmationMessage}</Card.Body>
          </Card>

          {rideStatus === "pending" && (
            <Button
              variant="primary"
              className="w-100 mb-2"
              onClick={handlePayClick}
            >
              Pay
            </Button>
          )}
          <Button
            style={{ backgroundColor: "red", borderColor: "red" }}
            className="w-100"
            onClick={handleDoneClick}
            
          >
            Done
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showRatingModal} onHide={handleCloseRatingModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rate Your Ride</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>How was your experience? Please rate your ride:</p>
          <div className="star-rating d-flex justify-content-center">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hover || rating) ? "on" : "off"}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-label={`Rate ${index} out of 5 stars`}
                >
                  <FaStar
                    color={index <= (hover || rating) ? "#ff0000" : "#e4e5e9"}
                    size={32}
                  />
                </button>
              );
            })}
          </div>
          <div>
            <textarea 
              className="form-control mt-3"
              placeholder="Write a review (optional)"
              style={{ resize: "none" }}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRatingModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRatingSubmit}>
            Submit Rating
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPaymentModal} onHide={handleClosePaymentModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!paymentMethod ? (
            <div>
              <Button
                variant="primary"
                className="w-100 mb-2"
                onClick={() => handlePaymentMethodSelect("cash")}
              >
                Cash
              </Button>
              <Button
                variant="secondary"
                className="w-100"
                onClick={() => handlePaymentMethodSelect("card")}
              >
                Card
              </Button>
            </div>
          ) : (
            paymentMethod === "card" && (
              <Form>
                <Form.Group className="mb-3" controlId="cardType">
                  <Form.Label>Card Type *</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      id="visa"
                      name="cardType"
                      value="visa"
                      label={
                        <>
                          <FaCreditCard /> Visa
                        </>
                      }
                      checked={cardDetails.cardType === "visa"}
                      onChange={handleCardDetailsChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      id="mastercard"
                      name="cardType"
                      value="mastercard"
                      label={
                        <>
                          <FaCreditCard /> Mastercard
                        </>
                      }
                      checked={cardDetails.cardType === "mastercard"}
                      onChange={handleCardDetailsChange}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="cardNumber">
                  <Form.Label>Card Number *</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    placeholder="Enter card number"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                    required
                  />
                  <Form.Text className="text-danger">
                    {cardDetails.cardNumber ? "" : ""}
                  </Form.Text>
                </Form.Group>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="expirationMonth">
                      <Form.Label>Expiration Month *</Form.Label>
                      <Form.Select
                        name="expirationMonth"
                        value={cardDetails.expirationMonth}
                        onChange={handleCardDetailsChange}
                        required
                      >
                        <option value="">Month</option>
                        {[...Array(12)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {`${i + 1}`.padStart(2, "0")}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="expirationYear">
                      <Form.Label>Expiration Year *</Form.Label>
                      <Form.Select
                        name="expirationYear"
                        value={cardDetails.expirationYear}
                        onChange={handleCardDetailsChange}
                        required
                      >
                        <option value="">Year</option>
                        {[...Array(10)].map((_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="cvv">
                  <Form.Label>CVV *</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    This code is a three or four digit number printed on the
                    back or front of credit cards.
                  </Form.Text>
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handleClosePaymentModal}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleCardPayment}>
                    Pay
                  </Button>
                </div>
              </Form>
            )
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
