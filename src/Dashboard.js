import React, { useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { notify } from "./components/ui/toast";
import { useAuth } from "./contexts/AuthContext";
import { languages } from "./contexts/languages";

export default function Dashboard({ language, subscription }) {
  const { currentUser, logout } = useAuth();
  const [displayName, setDisplayName] = useState();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      notify(
        languages[language].accountSettings.logoutFail,
        "error",
        "top-right"
      );
    }
  };
  return (
    <Container>
      <Card className="shadow">
        <Card.Header className="bg-dark text-light p-4">
          <h2>Account Settings</h2>
        </Card.Header>
        <Card.Body className="p-4">dfsfsfsdsdf</Card.Body>
        <Card.Footer  className="p-4 text-center">
          <Button variant="warning" onClick={handleLogout}>
            Log Out
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
