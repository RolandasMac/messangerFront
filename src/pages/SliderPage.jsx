// import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";
import Comp1 from "../components/Comp1.jsx";
import Comp2 from "../components/Comp2.jsx";
import { useState } from "react";
function SliderPage() {
  const [curimage, setCurimage] = useState(0);
  const [images, setImages] = useState([
    "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yX3Bob3RvX29mX2FfbGlvbl9pc29sYXRlZF9vbl9jb2xvcl9iYWNrZ3JvdW5kXzJhNzgwMjM1LWRlYTgtNDMyOS04OWVjLTY3ZWMwNjcxZDhiMV8xLmpwZw.jpg",
  ]);
  return (
    <>
      <div className="App container pt-3">
        <Comp1 curimage={curimage} setCurimage={setCurimage} images={images} />
        <Comp2 images={images} setImages={setImages} />
      </div>
    </>
  );
}

export default SliderPage;
