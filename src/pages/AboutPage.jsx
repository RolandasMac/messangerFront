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
  function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString); // Gimimo data kaip Date objektas
    const today = new Date(); // Dabartinė data kaip Date objektas

    let age = today.getFullYear() - birthDate.getFullYear(); // Skirtumas metais

    const monthDifference = today.getMonth() - birthDate.getMonth(); // Mėnesių skirtumas

    // Jei dabartinis mėnuo yra mažesnis nei gimimo mėnuo, arba
    // jei mėnesiai sutampa, bet dabartinė diena yra mažesnė už gimimo dieną,
    // reiškia, kad gimtadienis dar nebuvo šiais metais, todėl atimame 1 metus.
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  return (
    <div className="bg-gray-200 rounded">
      <h1 className="text-center">Apie mane</h1>
      <p className="p-5 text-justify">
        Esu {calculateAge("1975-10-23")} metų karjerą baigęs pareigūnas,
        siekiantis naujos karjeros internetinių technologijų srityje kaip web
        programuotojas. Po 27 metų patirties teisėsaugos srityje nusprendžiau
        pasinerti į IT pasaulį. Turiu praktinių žinių tiek front-end, tiek
        back-end kūrime, nuolat tobulinu savo programavimo įgūdžius ir esu
        pasiruošęs prisidėti prie inovatyvių projektų. Turiu stiprius problemų
        sprendimo, kūrybinio mąstymo bei atsakingo darbo įgūdžius.
      </p>
      <div>
        <h1 className="text-center">Jaunesnysis full-stack programuotojas</h1>
        <div className="flex flex-row justify-around items-center p-5">
          <div className="avatar mr-5">
            <div className="ring-gray ring-offset-base-100 w-48 rounded-full ring ring-offset-2">
              <img src="https://res.cloudinary.com/drqcofqnv/image/upload/v1727267229/k5bdza1j1royaahjmlam.jpg" />
            </div>
          </div>
          <ul className="lg:columns-2">
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
              <strong>Amžius: </strong>
              {calculateAge("1975-10-23")}
            </li>
            <li>
              <strong>Išsilavinimas: </strong>CodeAcademy 1064 val. Jaunesnysis
              full-stack programuotojas
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
        <div className="m-5 flex flex-row justify-center gap-3 flex-wrap">
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
