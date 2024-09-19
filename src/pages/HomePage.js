import { useEffect, useRef } from "react";
import Typed from "typed.js";
import backGImage from "../images/VSCode1.JPG";

function HomePage(props) {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "frontend programuotojas!",
        "backend programuotojas!",
        "fullstack programuotojas!",
      ],
      typeSpeed: 100,
      loop: true,
      loopCount: Infinity,
      cursorChar: "|",
    });
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className="bg-gray-100 rounded">
        {/* <h1 className="text-center">This is my home page</h1> */}
        <div className="flex flex-row basis-10">
          <div
            className="flex-1 flex flex-col justify-center min-h-[600px] rounded opacity-100"
            style={{
              backgroundImage: `url(${backGImage})`,
              backgroundSize: "contain",
              backgroundPosition: "left",
            }}
          >
            <div>
              <div className="bg-white/10 backdrop-blur-lg p-10 rounded ml-20 mr-20">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <p
                    style={{
                      fontFamily: "Josefin Sans",
                      fontSize: 48,
                      fontWeight: "bold",
                    }}
                  >
                    <h1>Sveiki, mano vardas</h1>
                    Rolandas
                  </p>
                  <h1> ir aš esu </h1>
                  <h1>
                    <span ref={el} />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
