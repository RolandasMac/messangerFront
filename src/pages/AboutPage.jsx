import html from "../icons/html.png";
import css from "../icons/css.png";
import js from "../icons/javascript.png";
import react from "../icons/react.png";
import node from "../icons/nodejs.png";
import redux from "../icons/redux.png";
import bootstrap from "../icons/bootstrap.png";
import tailwind from "../icons/tailwind-css.png";
import mysql from "../icons/mysql.png";
import mongo from "../icons/mongodb.png";
import php from "../icons/php.png";

function AboutPage() {
  return (
    <div className="bg-gray-200 rounded">
      <h1 className="text-center">Apie mane</h1>
      <p className="p-5 text-justify">
        Esu 48 metų karjerą baigęs pareigūnas, siekiantis naujos karjeros
        internetinių technologijų srityje kaip web programuotojas. Po 27 metų
        patirties teisėsaugos srityje nusprendžiau pasinerti į IT pasaulį. Turiu
        praktinių žinių tiek front-end, tiek back-end kūrime, nuolat tobulinu
        savo programavimo įgūdžius ir esu pasiruošęs prisidėti prie inovatyvių
        projektų. Turiu stiprius problemų sprendimo, kūrybinio mąstymo bei
        atsakingo darbo įgūdžius.
      </p>
      <div>
        <h1 className="text-center">Jaunesnysis full-stack programuotojas</h1>
        <div className="flex flex-row justify-around items-center p-5">
          <div className="avatar">
            <div className="ring-gray ring-offset-base-100 w-48 rounded-full ring ring-offset-2">
              <img src="https://res.cloudinary.com/drqcofqnv/image/upload/v1726068055/ekkrdwksj5lsqcfoffkd.jpg" />
            </div>
          </div>
          <ul className="columns-2">
            <li>
              <strong>Gimtadienis: </strong> 1975 spalio mėn. 23 d.
            </li>
            <li>
              <strong>Tinklapis: </strong>https://messenger.macrol.lt
            </li>
            <li>
              <strong>Telefonas: </strong>+37067606999
            </li>
            <li>
              <strong>Gyvenu: </strong>Šiauliai, Lietuva
            </li>
            <li>
              <strong>Amžius: </strong>48
            </li>
            <li>
              <strong>Išsilavinimas: </strong>jaunesnysis full-stack
              programuotojas
            </li>
            <li>
              <strong>El. paštas: </strong>rolandas.macius@gmail.com
            </li>
            <li>
              <strong>Darbo vieta: </strong>freelance, on site, remote
            </li>
          </ul>
        </div>
      </div>
      <div className="p-3">
        <h1 className="text-center">Įgudžiai</h1>
        <div className="m-5 flex flex-row justify-center gap-3">
          <img src={html} alt="html" />
          <img src={css} alt="css" />
          <img src={js} alt="js" />
          <img src={react} alt="react" />
          <img src={node} alt="nodejs" />
          <img src={redux} alt="redux" />
          <img src={bootstrap} alt="bootstrap" />
          <img src={tailwind} alt="tailwind" />
          <img src={mysql} alt="mysql" />
          <img src={mongo} alt="mongodb" />
          <img src={php} alt="php" />
        </div>
      </div>
    </div>
  );
}
export default AboutPage;
