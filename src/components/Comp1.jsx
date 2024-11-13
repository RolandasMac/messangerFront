import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";

function Comp1({ images, curimage, setCurimage }) {
  // State
  let imgStore = useRef();
  const [startposition, setStartposition] = useState(0);

  let position = useRef();
  let imgContainer = useRef();
  const [translate, setTranslate] = useState(startposition);
  const [imagesElColection, setImagesElColection] = useState([]);

  // Hooks

  useEffect(() => {
    const el = document.getElementsByClassName(`image`);
    setImagesElColection(el);
    let startPos =
      imgStore.current.clientWidth / 2 - el[curimage].clientWidth / 2;
    setStartposition(startPos);
    setTranslate(startPos);
    console.log(startPos);
    // console.log(imgStore.current.clientWidth);

    if (el.length > 0) {
      Array.from(el).forEach((el, index) => {
        el.style.transform = `translateX(${startPos}px)`;
      });
      imgContainer.current.style.width = `${el[curimage].clientWidth}px`;
      imgContainer.current.style.transform = `translateX(${startPos}px)`;
    }
    // transformImages();
  }, []);
  useEffect(() => {
    console.log(translate);
    console.log(startposition);
    transformImages();
    console.log("Pasikeite startposition" + startposition + translate);
  }, [translate, images, startposition]);

  // useEffect(()=>{
  //     transformImages();
  // },[images])

  // useEffect(()=>{
  //     transformImages();
  //     console.log("Pasikeite startposition"+ startposition);
  // },[startposition])

  // function

  function changeImage(num) {
    if (curimage === images.length - 1 && num > 0) {
      setCurimage(0);
      setTranslate(startposition);
    } else if (curimage === 0 && num < 0) {
      setCurimage(images.length - 1);
      // setTranslate((imagesElColection.length-1)*imagesElColection[curimage].clientWidth)
      setTranslate(
        startposition -
          (imagesElColection.length - 1) *
            imagesElColection[curimage].clientWidth
      );
    } else {
      setCurimage(curimage + num);
      if (num > 0) {
        setTranslate(translate - imagesElColection[curimage].clientWidth);
      } else {
        setTranslate(translate + imagesElColection[curimage].clientWidth);
      }
    }

    // alert(position.current.offsetLeft)
    // alert(position.current.clientWidth)
    // imgStore.current.scrollBy(929, 0)
    // console.log(imgStore.current);
  }

  function transformImages() {
    if (imagesElColection.length > 0) {
      Array.from(imagesElColection).forEach((el, index) => {
        console.log(imagesElColection[curimage].clientWidth);
        el.style.transform = `translateX(${translate}px)`;
      });
    }
  }

  return (
    <div className="Comp1">
      <div className="slider">
        <div className="imageShow">
          <h3 onClick={() => changeImage(-1)}>
            <AiOutlineArrowLeft />
          </h3>
          <img src={images[curimage]} alt="" />
          <h3 onClick={() => changeImage(1)}>
            <AiOutlineArrowRight />
          </h3>
        </div>
      </div>
      <div ref={imgStore} className="imageStore">
        {images.map((cur, index) => {
          return (
            <img
              ref={position}
              key={index}
              src={cur}
              alt=""
              className={index === curimage ? "onshow image" : "image"}
              // style={{transform:`translateX(${translate}px)`}}
            />
          );
        })}
        <div
          ref={imgContainer}
          className="imgContainer"
          style={{ width: "12px", height: "100%" }}
        ></div>
      </div>
    </div>
  );
}

export default Comp1;
