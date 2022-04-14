import React, { useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { BsCheckCircleFill, BsExclamationTriangleFill } from "react-icons/bs";
import { connect } from "react-redux";
import { languages } from "../../contexts/languages";
import LanguageSelect from "../ui/LanguageSelect";
// import PoweredBy from "../ui/PoweredBy";

const ForgotPassword = ({ language }) => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const notify = (e) => {
    e.preventDefault();

    toast.promise(
      async () => {
        setLoading(true);
        await resetPassword(emailRef.current.value);
        setLoading(false);
      },
      {
        pending: {
          render() {
            return languages[language].forgotPassword.sendingEmail;
          },
        },
        success: {
          render() {
            setLoading(false);
            return languages[language].forgotPassword.checkEmail;
          },
          icon: <BsCheckCircleFill color="#28a745" />,
        },
        error: {
          render(e) {
            setLoading(false);
            return languages[language].forgotPassword.failSend;
          },
          icon: <BsExclamationTriangleFill color="#dc3545" />,
        },
      },
      {
        theme: "dark",
      }
    );
  };

  return (
    <div className=" d-flex align-items-center justify-content-center vh-100 text-dark">
      <ToastContainer />
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="bg-dark text-light shadow p-4">
          <Card.Body>
            <h2 className="text-center mb-4">
              {languages[language].forgotPassword.oups}
            </h2>
            <Form onSubmit={notify}>
              <Form.Group id="email">
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  placeholder="email"
                />
              </Form.Group>
              <Button
                variant="outline-warning"
                disabled={loading}
                className="w-100 my-3"
                type="submit"
              >
                {languages[language].forgotPassword.resetPassword}
              </Button>
            </Form>
            <div className="w-100 text-center">
              <Link to="/login" className="link-light">
                {languages[language].forgotPassword.login}
              </Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-3">
          {languages[language].forgotPassword.needAccount}{" "}
          <Link to="/signup">
            <b> {languages[language].forgotPassword.singup}</b>
          </Link>
        </div>
      </div>
      <LanguageSelect onDarkBackground={false} />
      {/* <PoweredBy /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps)(ForgotPassword);
