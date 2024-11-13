function ResumePage() {
  return (
    <div>
      <h1 className="text-center">This is resume page</h1>
      <div>
        <h1>Apie projektą</h1>
        <p>
          Šis projektas, o tiksliau atskiros jo aplikacijos, sukurtas mokymosi
          CodeAcademy metu. Jis nėra tobulas, ir jeigu reikėtų panašias
          aplikacijas rašyti iš naujo, ko gero jos atrodytų visai kitaip tiek iš
          išorės ir tuo labiau iš vidaus technine prasme. Tai yra mano asmeninis
          mokymosi rezultatas.
        </p>
        <div>
          <div>
            <h2>Front-end</h2>
            <p>
              https://messenger.macrol.lt. aplikacija parašyta naudojant
              React.js. Hostingas - Weborado.
            </p>
          </div>
          <div>
            <h2>Back-end</h2>
            <p>
              https://messengerback.macrol.lt Node.js aplikacija. Hostingas -
              Contabo. Duomenų bazė - MongoDB.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResumePage;
