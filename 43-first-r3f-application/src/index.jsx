import { Canvas } from "@react-three/fiber";
import "./style.css";
import ReactDOM from "react-dom/client";
import Experience from "./Experience.jsx";
import { ACESFilmicToneMapping, LinearSRGBColorSpace } from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    gl={{
      antialias: true,
      toneMapping: ACESFilmicToneMapping,
      outputColorSpace: LinearSRGBColorSpace,
    }}
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [3, 2, 6],
    }}
  >
    <Experience />
  </Canvas>
);
