import { useEffect, useState } from "react";
export default function Clicker({ keyName, color }) {
  const [count, setCount] = useState(
    parseInt(localStorage.getItem(keyName) ?? 0)
  );

  const buttonClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem(keyName);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(keyName, count);
  }, [count]);

  return (
    <div>
      <div style={{ color }}>Clicks count: {count}</div>
      <button onClick={buttonClick}>Click me</button>
    </div>
  );
}
