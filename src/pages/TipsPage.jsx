import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import TipsForm from "../components/TipsForm";

function TipsPage() {
  const [tipsList, setTipsList] = useState([]);

  // update tipsList
  useEffect(() => {
    async function getTips() {
      const tipsRef = collection(database, "tips");
      const snapshots = await getDocs(tipsRef);
      const tips = snapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(tips);
      setTipsList(tips);
    }
    getTips();
  }, []);

  return (
    <Container>
      <Container>
        <TipsForm />
        <h3>Senaste Tipsen</h3>
        <ul>
          {tipsList.slice(0, 5).map((tip) => (
            <li key={tip.id}>{tip.tips}</li>
          ))}
        </ul>
      </Container>
    </Container>
  );
}

export default TipsPage;
