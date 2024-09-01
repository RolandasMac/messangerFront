import React, { useEffect, useRef, useState } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getDate } from "../plugins/plugins.js";
import {
  useChangeAvatarMutation,
  useCreateUserMutation,
  useGetUserInfoQuery,
} from "../reducers/auth.js";
import { getOneUser } from "../reducers/authSlice.js";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const user = useSelector((state) => {
    return state.user.user;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   alert(user.id);
  // }, [user]);
  const imageRef = useRef();
  const [avatarLoader, setAvatarLoader] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const loadingGif =
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWtsZWNwb2MzcXd6Zmw4NDM5NW9oNTMwZXpnNW92bTc0czM0eTZ0dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.webp";
  //     user =
  //   // Example user data
  //   const user = {
  //     name: "John Doe",
  //     photo: "https://via.placeholder.com/150",
  //     bio: "Software Developer at XYZ Company. Passionate about coding, music, and coffee.",
  //     location: "San Francisco, CA",
  //     email: "john.doe@example.com",
  //   };
  const changeImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
  const [changeAvatar, { data, isError }] = useChangeAvatarMutation();
  // const [createUser, { data, isError }] = useCreateUserMutation();
  const validateFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file is an image
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validImageTypes.includes(file.type)) {
        // Create an object URL for the selected image and set it as the image source
        setImageSrc(URL.createObjectURL(file));
        // Call changeAvatar with the selected file
        changeAvatarfn(file);
        // alert("Dar veikia");
      } else {
        alert("Pridėkite tinkamą failo tipą: JPEG, PNG arba GIF");
      }
    }
  };
  async function changeAvatarfn(image) {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("token", token);
    formData.append("file", image);
    const { message, success, updatetUser } = await changeAvatar(
      formData
    ).unwrap();
    if (success) {
      // alert(user.id);
      // // navigate("/login");
      console.log(user);
      // console.log(user);
      await dispatch(getOneUser(user.id));
    }
  }

  return (
    <>
      {user.isOnline && (
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Profilis"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <div className="flex flex-row gap-5">
              <div className="flex flex-col items-center gap-3">
                {/* <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                    <img src={user.photo} alt={`${user.name}'s profile`} />
                  </div>
                </div> */}

                <div className="relative w-80 flex justify-center">
                  {/* {
                    //   currierCheck
                    true && (
                      <div className="relative group">
                        <img
                          className="carrier-badge rounded-full relative z-10 h-10 border-2 border-black -top-1 left-14"
                          src="https://illustoon.com/photo/4884.png"
                          alt="carrier badge"
                        />
                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-xs p-2 bg-gray-200 text-black rounded -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          Jūs turite kurjerio statusą.
                        </div>
                      </div>
                    )
                  } */}
                  <img
                    className="w-44 h-44 rounded-full absolute"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt=""
                  />
                  <img
                    className="w-44 h-44 rounded-full absolute shadow-lg"
                    // src={avatarLoader ? loadingGif : user.photo}
                    src={user.photo}
                    alt="User avatar"
                  />

                  <div className="w-44 h-44 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
                    <img
                      className="hidden group-hover:block w-40 p-14"
                      src="https://www.svgrepo.com/show/33565/upload.svg"
                      alt=""
                      onClick={() => changeImage()}
                    />
                  </div>
                  <input
                    ref={imageRef}
                    type="file"
                    id="file-input"
                    className="hidden"
                    onChange={validateFile}
                  />
                  <button
                    onClick={(event) => {
                      navigate("/changepassword", { replace: true });
                    }}
                    className="btn btn-active mt-60"
                  >
                    Pakeisti slaptažodį
                  </button>
                </div>

                {/* <p className="">{user.bio}</p> */}
              </div>

              <div className="flex flex-col gap-3">
                <h1>{user.name}</h1>
                {/* <strong>Vartotojo informacija</strong> */}
                <p>
                  <strong>El. paštas: </strong>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
                <p>
                  <strong>Paskyra sukurta:</strong>
                  <p>{getDate(user.createdAt)}</p>
                </p>
                <p>
                  <strong>Paskutinis prisijungimas:</strong>
                  <p>{getDate(user.lastloggedAt)}</p>
                </p>
                <p>
                  <strong>Informacija atnaujinta:</strong>
                  <p>{getDate(user.updatedAt)}</p>
                </p>{" "}
              </div>
            </div>
          </div>

          {/* <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Tab 2"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            Tab content 2
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Tab 3"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            Tab content 3
          </div> */}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
