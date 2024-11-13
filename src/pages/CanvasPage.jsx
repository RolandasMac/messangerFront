import { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";
const ThreadNetworkCanvasBackground = () => {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const mousePointRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const animationIdRef = useRef(null); // For storing animation ID

  const [isMouseOver, setIsMouseOver] = useState(true);

  const pointDensity = 0.0002; // Density of points per pixel
  const maxDistance = 150; // Maximum distance to draw a line between points
  const pointSpeed = 0.7; // Speed of points
  const pointSize = 3; // Radius of each point

  // Function to calculate the number of points based on screen size
  const calculateNumPoints = (canvas) => {
    const area = canvas.width * canvas.height;
    return Math.floor(area * pointDensity);
  };

  // Function to generate random points
  const createPoints = (canvas) => {
    const numPoints = calculateNumPoints(canvas);
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * pointSpeed,
        vy: (Math.random() - 0.5) * pointSpeed,
      });
    }
    pointsRef.current = points;
  };

  // Function to update points position and bounce off walls
  const updatePoints = () => {
    const points = pointsRef.current;
    points.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;

      // Bounce off walls
      if (point.x <= 0 || point.x >= canvasRef.current.width) point.vx *= -1;
      if (point.y <= 0 || point.y >= canvasRef.current.height) point.vy *= -1;
    });
  };

  // Function to draw points and connect them with lines
  const draw = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const points = pointsRef.current;

    // Draw points
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
      ctx.fillStyle = "#8b0000";
      ctx.fill();
    });

    // Draw lines between points
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const distance = Math.hypot(
          points[i].x - points[j].x,
          points[i].y - points[j].y
        );
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.strokeStyle = `rgba(0, 100, 0, ${1 - distance / maxDistance})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }
    }

    // Connect points to the mouse point if within range
    if (isMouseOver) {
      points.forEach((point) => {
        const mouseDistance = Math.hypot(
          mousePointRef.current.x - point.x,
          mousePointRef.current.y - point.y
        );
        if (mouseDistance < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(mousePointRef.current.x, mousePointRef.current.y);
          ctx.lineTo(point.x, point.y);
          ctx.strokeStyle = `rgba(0, 100, 0, ${
            1 - mouseDistance / maxDistance
          })`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });
    }
  };

  // Animation loop
  const animate = (ctx, canvas) => {
    updatePoints();
    draw(ctx, canvas);
    animationIdRef.current = requestAnimationFrame(() => animate(ctx, canvas));
  };
  let handleMouseMoveRef = useRef();
  let handleMouseOutRef = useRef();
  let handleResizeRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    const parent = canvas.parentNode;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    createPoints(canvas);
    animate(ctx, canvas);

    // Mouse move event to update mousePoint location
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mousePointRef.current.x = event.clientX - rect.left;
      mousePointRef.current.y = event.clientY - rect.top;
      setIsMouseOver(true); // Set to true when mouse is over
    };
    handleMouseMoveRef.current = handleMouseMove;
    const handleMouseOut = () => {
      mousePointRef.current.x = -1000;
      mousePointRef.current.y = -1000;
      // setIsMouseOver(false); // Set to false when mouse leaves
    };
    handleMouseOutRef.current = handleMouseOut;
    // Mouse events
    // canvas.addEventListener("mousemove", handleMouseMove);
    // canvas.addEventListener("mouseout", handleMouseOut);

    // Resize canvas on window resize and recalculate points
    const handleResize = () => {
      const parent = canvas.parentNode;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      createPoints(canvas); // Recreate points based on the new canvas size
    };

    // handleResizeRef.current = handleResize;
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      //   canvas.removeEventListener("mousemove", handleMouseMove);
      //   canvas.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleMouseMove = (e) => {
    if (handleMouseMoveRef.current) {
      handleMouseMoveRef.current(e); // Call the function from useEffect
    }
  };
  const handleMouseOut = () => {
    if (handleMouseOutRef.current) {
      handleMouseOutRef.current(); // Call the function from useEffect
    }
  };
  // const handleResize = () => {
  //   if (handleResizeRef.current) {
  //     handleResizeRef.current(); // Call the function from useEffect
  //   }
  // };
  return (
    <div className="border bg-gray-200 w-full h-full p-0 m-0 relative">
      {/* Canvas as background */}
      <canvas
        // onMouseMove={() => setIsMouseOver(true)}
        ref={canvasRef}
        // className="absolute top-0 left-0 z-10"
        className="p-0 m-0 box-content"
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        // onResize={() => {
        //   alert("Gaidys");
        // }}
        // style={{
        //   pointerEvents: "none", // Make sure canvas doesn't block other elements
        // }}
      ></canvas>

      {/* Your content */}
      {/* <div className="absolute top-0 left-0 z-10">
        <h1 className="text-black">Your Content Above the Canvas</h1>
        <p className="text-black ">
          This content is displayed above the canvas background.
        </p>
      </div> */}
      <div className="absolute top-10 left-10 z-10 flex flex-col gap-5">
        <h1 className="bg-green-500 p-1 rounded bg-opacity-40">
          Mokymosi metu sukurti projektai
        </h1>
        <a href="https://gittestas.macrol.lt/cinema/" target="_blank">
          <h3 className="bg-green-500 p-1 rounded bg-opacity-40">Cinema</h3>
        </a>
        <a href="https://gittestas.macrol.lt/Casino/" target="_blank">
          <h3 className="bg-green-500 p-1 rounded bg-opacity-40">Casino</h3>
        </a>
        <a href="https://gittestas.macrol.lt/gyvatele/" target="_blank">
          <h3 className="bg-green-500 p-1 rounded bg-opacity-40">Gyvatėlė</h3>
        </a>
        <a href="https://gittestas.macrol.lt/kvadratas/" target="_blank">
          <h3 className="bg-green-500 p-1 rounded bg-opacity-40">Kvadratas</h3>
        </a>
        <a href="https://gittestas.macrol.lt/tamagochi/" target="_blank">
          <h3 className="bg-green-500 p-1 rounded bg-opacity-40">Tamagochi</h3>
        </a>
        <a href="https://gittestas.macrol.lt/musicPlayer/" target="_blank">
          <h3 className="bg-green-500 p-1 rounded bg-opacity-40">
            Music Player
          </h3>
        </a>
        <a href="https://www.macrol.lt/" target="_blank">
          <h3 className="bg-green-500 p-1 rounded bg-opacity-40">
            Pirmas mano web tinklapis
          </h3>
        </a>
        <a href="https://frontend.macrol.lt/login" target="_blank">
          <h3 className="bg-green-500 p-1 rounded bg-opacity-40">
            Namo šildymo apskaita
          </h3>
        </a>

        {/* <a>
        {
          <Link to="/slider">
            <h3>Slider</h3>
          </Link>
        }
      </a> */}
        <div className="flex-1 w-32">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default ThreadNetworkCanvasBackground;
