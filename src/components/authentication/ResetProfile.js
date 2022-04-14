import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { BsExclamationTriangleFill } from "react-icons/bs";
import Spiner from "../ui/Spinner";
import PoweredBy from "../ui/PoweredBy";
import { notify } from "../ui/toast";
import LanguageSelect from "../ui/LanguageSelect";
import { languages } from "../../contexts/languages";
import { connect } from "react-redux";

const ResetProfile = ({ language }) => {
  const passwordRef = useRef();
  const newpasswordRef = useRef();
  const { login, setNewPassword, verifyPasswordResetCode } = useAuth();
  const [linkExpired, setLinkExpired] = useState(false);
  const [email, setEmail] = useState("");
  const [spinnerLoading, setSpinnerLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const mode = queryParams.get("mode") || "false";
  const actionCode = queryParams.get("oobCode");
  const continueUrl = queryParams.get("continueUrl");

  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    passwordRef.current.value.length < 6 &&
      notify(languages[language].resetProfile.minPass, "error", "top-center");

    passwordRef.current.value !== newpasswordRef.current.value &&
      notify(
        languages[language].resetProfile.passwordNoMatch,
        "error",
        "top-center"
      );

    try {
      setLoading(true);
      toast.promise(setNewPassword(actionCode, passwordRef.current.value), {
        pending: {
          render() {
            return languages[language].resetProfile.wait;
          },
        },
        success: {
          render() {
            login(email, passwordRef.current.value);
            return languages[language].resetProfile.redirect;
          },
        },
        error: {
          render() {
            return languages[language].resetProfile.failed;
          },
          icon: <BsExclamationTriangleFill color="#dc3545" />,
        },
      });
    } catch {
      notify(languages[language].resetProfile.failed, "error", "top-right");
    }
    setLoading(false);
  };

  useEffect(() => {
    verifyPasswordResetCode(auth, actionCode)
      .then((uemail) => {
        setEmail(uemail);
        setSpinnerLoading(false);
      })
      .catch(() => {
        setSpinnerLoading(false);
        setLinkExpired(true);
      });
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 text-dark">
      <ToastContainer position="top-center" autoClose="5000" theme="dark" />
      {mode !== "false" ? (
        spinnerLoading ? (
          <Spiner colorSpin="white" />
        ) : !linkExpired ? (
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card className="bg-dark text-light shadow p-4">
              <Card.Body>
                <h2 className="text-center mb-4">
                  {" "}
                  {languages[language].resetProfile.resetPassword}
                </h2>
                <Form onSubmit={handleSetNewPassword}>
                  <Form.Group id="email">
                    <Form.Control
                      className="mb-3"
                      type="text"
                      readOnly
                      defaultValue={email}
                    />
                    {/* <div className="my-">  {email}</div> */}
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      required
                      placeholder="new password"
                    />
                  </Form.Group>
                  <Form.Group id="confirm-password">
                    <Form.Control
                      className="my-3"
                      type="password"
                      ref={newpasswordRef}
                      required
                      placeholder="confirm new password"
                    />
                  </Form.Group>
                  <Button
                    variant="outline-warning"
                    disabled={loading}
                    className="w-100 mt-1"
                    type="submit"
                  >
                    {languages[language].resetProfile.setNewPassword}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card className="container bg-dark text-light shadow p-5">
              <Card.Body>
                <h2 className="text-center">
                  <BsExclamationTriangleFill />
                </h2>
                <h4 className="text-center py-3">
                  {languages[language].resetProfile.expriedLink}
                </h4>
                <button className="btn btn-outline-warning w-100 ">
                  {languages[language].resetProfile.back}
                </button>
              </Card.Body>
            </Card>
          </div>
        )
      ) : (
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="container bg-dark text-light shadow p-5">
            <Card.Body>
              <div className="text-center">
                <BsExclamationTriangleFill fontSize={"4rem"} />
              </div>
              <h4 className="text-center py-3">
                {languages[language].resetProfile.wrong}
              </h4>
              <button className="btn btn-warning w-100 ">
                {" "}
                {languages[language].resetProfile.back}
              </button>
            </Card.Body>
          </Card>
        </div>
      )}
      <LanguageSelect onDarkBackground={false} />
      <PoweredBy />
    </div>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps)(ResetProfile);
