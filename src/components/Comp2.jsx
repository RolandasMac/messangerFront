import { useRef } from "react";

function Comp2({ setImages, images }) {
  // hooks
  const imageurl = useRef();

  // functions
  function addImage() {
    if (imageurl.current.checkValidity()) {
      setImages([...images, imageurl.current.value]);
      imageurl.current.value = "";
    } else {
      imageurl.current.style.borderColor = "red";
      setTimeout(() => {
        imageurl.current.style.borderColor = "black";
      }, 3000);
    }
  }

  return (
    <div className="Comp2">
      <input
        ref={imageurl}
        type="text"
        placeholder="Please input image url"
        required
      />
      <button onClick={addImage}>Add image</button>
    </div>
  );
}

export default Comp2;
