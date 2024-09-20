import logo from "../images/logo2.png";
import { IconButton } from "@mui/material";
import { LinkedIn, Facebook } from "@mui/icons-material";
function FooterComponent() {
  return (
    <>
      <div className="mt-5 bg-gray-200 rounded flex flex-col">
        {/* <h3 className="sitename">Personal</h3>
        <p>
          Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni
          eligendi fuga maxime saepe commodi placeat.
        </p> */}
        <div className="flex flex-row justify-center">
          <IconButton
            href="https://www.linkedin.com/in/rolandas-macius-940752281/"
            color="gray"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            href="https://www.facebook.com/maciusr/"
            color="gray"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
          </IconButton>
        </div>
        <div className="">
          <div className="flex flex-row justify-center items-baseline">
            <span>Copyright</span>
            <img
              src={logo}
              width={50}
              // preview={false}
              style={{
                filter: "drop-shadow(2px 2px 2px red)",
                color: "white",
                padding: "0px 2px 0px 0px",
                margin: "0px 10px 0px 5px",
              }}
            />
            {/* <strong className="px-1 sitename">Personal</strong>{" "} */}
            <span>All Rights Reserved</span>
          </div>
          <div className="credits"></div>
        </div>
      </div>
    </>
  );
}
export default FooterComponent;
