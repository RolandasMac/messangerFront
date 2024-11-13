import { Outlet, Link } from "react-router-dom";
function CinemaPage() {
  return (
    <div className="flex flex-col">
      <h1>Mokymosi metu sukurti projektai</h1>
      <a href="https://gittestas.macrol.lt/cinema/" target="_blank">
        <h3>Cinema</h3>
      </a>
      <a href="https://gittestas.macrol.lt/Casino/" target="_blank">
        <h3>Casino</h3>
      </a>
      <a href="https://gittestas.macrol.lt/gyvatele/" target="_blank">
        <h3>Gyvatėlė</h3>
      </a>
      <a href="https://gittestas.macrol.lt/kvadratas/" target="_blank">
        <h3>Kvadratas</h3>
      </a>
      <a href="https://gittestas.macrol.lt/tamagochi/" target="_blank">
        <h3>Tamagochi</h3>
      </a>
      <a href="https://gittestas.macrol.lt/musicPlayer/" target="_blank">
        <h3>Music Player</h3>
      </a>
      <a href="https://www.macrol.lt/" target="_blank">
        <h3>Pirmas mano web tinklapis</h3>
      </a>
      <a href="https://frontend.macrol.lt/login" target="_blank">
        <h3>Namo šildymo apskaita</h3>
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
  );
}

export default CinemaPage;
