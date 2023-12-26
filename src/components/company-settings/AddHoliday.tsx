import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import axios from "axios";
import Select from "../Select";
import Button from "../Button";
import { toast } from "react-toastify";

export default function AddHoliday({
  show,
  hide,
  toview,
}: {
  show: boolean;
  hide: () => void;
  toview: any;
}) {
  const [inputs, setInputs] = useState({
    name: "",
    month: "1",
    day: "1",
  });

  useEffect(() => {
    if (toview) {
      if (toview.day) {
        setInputs({
          name: "",
          month: toview.month,
          day: toview.day,
        });
      } else {
        setInputs({
          name: "",
          month: toview.month,
          day: "1",
        });
      }
    }
  }, [toview]);

  const handleChange = (e: any) => {
    setInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const [errors, setErrors] = useState<any>([]);

  function resetForm() {
    setInputs({
      name: "",
      month: "1",
      day: "1",
    });
    setErrors([]);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      name: inputs.name,
      month: inputs.month,
      day: inputs.day,
    };

    axios
      .post("/api/company-settings/holidays", data)
      .then((res) => {
        toast.success("Utilisateur crée avec succé", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        resetForm();

        hide();
      })
      .catch((err) => {
        const response = err.response;
        setErrors(response.data.errors);
      });
  };

  return (
    <Modal
      title="Ajouter jour ferier"
      show={show}
      hide={() => {
        setTimeout(resetForm, 200);
        hide();
      }}
      dialogClassName="w-full sm:max-w-2xl h-fit my-auto rounded-xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          label="Nom de jour ferier"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Select
          name="month"
          onChange={handleChange}
          value={inputs.month}
          label="Mois"
        >
          <option value="1">Janvier</option>
          <option value="2">Fevrier</option>
          <option value="3">Mars</option>
          <option value="4">Avril</option>
          <option value="5">Mai</option>
          <option value="6">Juin</option>
          <option value="7">Juillet</option>
          <option value="8">Aout</option>
          <option value="9">Septembre</option>
          <option value="10">Octobre</option>
          <option value="11">Novembre</option>
          <option value="12">Decembre</option>
        </Select>

        <Select
          name="day"
          onChange={handleChange}
          value={inputs.day}
          label="Jour"
        >
          {[...Array(31)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>

        <Button>Ajouter Jour ferier</Button>
      </form>
    </Modal>
  );
}
