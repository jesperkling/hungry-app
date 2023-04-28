import React from "react";
import { Container } from "react-bootstrap";
import TipsForm from "../components/TipsForm";
import useGetTips from "../hooks/useGetTips";

function TipsPage() {
  const { data: tips, isLoading } = useGetTips("tips");

  return (
    <Container>
      <Container>
        <TipsForm />
        {isLoading && <p>Laddar...</p>}
        <h3>Senaste Tipsen</h3>

        <ul>
          {tips &&
            tips.slice(0, 5).map((tip) => <li key={tip.id}>{tip.tips}</li>)}
        </ul>
      </Container>
    </Container>
  );
}

export default TipsPage;
