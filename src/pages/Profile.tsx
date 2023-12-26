import React, { useEffect, useState } from "react";
import {
  AuthContextType,
  useAuthContext,
} from "../utils/contexts/AuthProvider";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "react-avatar";

const Profile: React.FC = () => {
  const { user, setUser } = useAuthContext() as AuthContextType;

  const [picture, setPicture] = useState<any>(null);

  const handleImage = (e: any) => {
    setPicture(e.target.files[0]);
  };

  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setInput({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: "",
        phone: user.phone,
      });
    }
  }, [user]);

  const [errors, setErrors] = useState([]);

  const handleInput = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const itemSubmit = (e: any) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", picture);
    data.append("firstname", input.firstname);
    data.append("lastname", input.lastname);
    data.append("email", input.email);
    if (input.password) data.append("password", input.password);
    data.append("phone", input.phone);

    axios
      .put(`/api/users/profile/${user?._id}`, data)
      .then((res) => {
        toast.success("Vos données on été Modifié avec succé", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
        const response = err.response;
        setErrors(response.data.validation_errors);
      });
  };

  return (
    <div className="pb-4">
      <Card title="My Profile">
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={itemSubmit}
        >
          <div className="flex items-end gap-4 mx-auto">
            <Avatar
              name={user.firstname}
              src={
                picture
                  ? URL.createObjectURL(picture)
                  : "http://localhost:5000/" + user?.picture
              }
              size="192"
              round={true}
            />
            <div className="mb-2">
              <input
                className="dark:bg-white relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700  file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
                id="file_input"
                type="file"
                onChange={handleImage}
              />
              {/* <span className='text-red-600'>{errors?.image}</span> */}
            </div>
          </div>
          <div className="flex gap-4">
            <Input
              label="Nom"
              name="lastname"
              placeholder="Nom"
              divClassNames="w-full"
              onChange={handleInput}
              value={input.lastname}
            />
            <Input
              label="Prenom"
              name="firstname"
              placeholder="Prenom"
              divClassNames="w-full"
              onChange={handleInput}
              value={input.firstname}
            />
          </div>
          <div className="flex gap-4">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              divClassNames="w-full"
              onChange={handleInput}
              value={input.email}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="********"
              divClassNames="w-full"
              onChange={handleInput}
              value={input.password}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full flex flex-col gap-1">
              <div className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Position
              </div>
              {user.position}
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Date de début
              </div>
              {user.startDate}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full flex flex-col gap-1">
              <div className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Type de contrat
              </div>
              {user.contractType}
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Salaire
              </div>
              {user.salary}
            </div>
          </div>
          <div className="flex gap-4">
            <Input
              name="phone"
              placeholder="Tél"
              divClassNames="w-full"
              onChange={handleInput}
              value={input.phone}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              customClassnames="!bg-gray-400 hover:!bg-gray-500"
              onClick={() => {
                setInput({
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  password: "",
                  phone: user.phone,
                });
                setPicture(null);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>{" "}
          </div>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
};
export default Profile;
