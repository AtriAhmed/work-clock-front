import React, { ChangeEvent, useEffect, useState } from "react";
import Modal from "../Modal";
import InputCmp from "../Input";
import ButtonCmp from "../Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TextArea from "../TextArea";

interface EditLeaveRequestProps {
  show: boolean;
  hide: () => void;
  toedit: any;
}

export default function EditLeaveRequest({
  show,
  hide,
  toedit,
}: EditLeaveRequestProps) {
  const [input, setInput] = useState({
    startDate: "",
    endDate: "",
    description: "",
  });

  const [errors, setErrors] = useState<any>([]);

  const handleInput = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (toedit) {
      setInput(toedit);
    }
  }, [toedit]);

  const itemSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      startDate: input.startDate,
      endDate: input.endDate,
      description: input.description,
    };

    axios
      .put(`/api/leave-requests/${toedit?.id}`, data)
      .then((res) => {
        toast.success("Demande de congé modifier avec succé", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        hide();
      })
      .catch((err) => {
        console.log(err);
        const response = err.response;
        setErrors(response.data.errors);
      });
  };

  return (
    <Modal
      title="Modifier Demande de congé"
      show={show}
      hide={hide}
      dialogClassName="w-full sm:max-w-2xl h-fit my-auto rounded-xl"
    >
      <form
        className="flex flex-col gap-4"
        encType="multipart/form-data"
        onSubmit={itemSubmit}
      >
        <div className="flex gap-4">
          <InputCmp
            label="Date début"
            type="date"
            name="startDate"
            placeholder="date debut"
            divClassNames="w-full"
            onChange={handleInput}
            value={input.startDate}
            error={errors?.startDate}
          />
          <InputCmp
            label="Date début"
            type="date"
            name="endDate"
            placeholder="Date fin"
            divClassNames="w-full"
            onChange={handleInput}
            value={input.endDate}
            error={errors?.endDate}
          />
        </div>

        <div className="flex gap-4">
          <TextArea
            name="description"
            divClassNames="w-full"
            onChange={handleInput}
            value={input.description}
            error={errors?.description}
          />
        </div>

        <div className="flex justify-end gap-4">
          {" "}
          <button onClick={hide} type="button" className="font-bold">
            Cancel
          </button>{" "}
          <ButtonCmp type="submit">Save</ButtonCmp>{" "}
        </div>
      </form>
    </Modal>
  );
}
