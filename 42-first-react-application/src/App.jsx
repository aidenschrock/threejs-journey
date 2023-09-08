import { useState } from "react";
import Clicker from "./Clicker.jsx";
export default function App({ children }) {
  const [hasClicker, setHasClicker] = useState(true);
  const toggleClickerClick = () => {
    setHasClicker(!hasClicker);
  };
  return (
    <>
      {children}
      <button onClick={toggleClickerClick}>
        {hasClicker ? "Hide" : "Show"} Clicker
      </button>
      {hasClicker && (
        <>
          <Clicker
            keyName="countA"
            color={`hsl(${Math.random() * 360}deg, 100%, 70%)`}
          />
          <Clicker
            keyName="countB"
            color={`hsl(${Math.random() * 360}deg, 100%, 70%)`}
          />
          <Clicker
            keyName="countC"
            color={`hsl(${Math.random() * 360}deg, 100%, 70%)`}
          />
        </>
      )}
    </>
  );
}
