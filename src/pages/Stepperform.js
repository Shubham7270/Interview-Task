import React, { useState } from "react";
import Personaldetails from "./stepperform/personaldetails";
import Countrydetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const steps = [
  "Personal Information",
  "Details",
  "Skills Details",
  "Credentail Details",
];

const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function Stepperform() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    skills: "",
    username: "",
    password: "",
    confirmPassword: "",
    photo: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  // const handleSubmit = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const config = {
  //       headers: { Authorization: `Bearer ${token}` },
  //     };
  //     await axios.post(
  //       "https://reactinterviewtask.codetentaclestechnologies.tech/api/api/register",
  //       formData,
  //       config
  //     );
  //     alert("User added successfully");
  //   } catch (error) {
  //     setError("Failed to add user.Please try again..");
  //   }
  // };

  const handleSubmit = async () => {
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Please fill in all required fields.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (!/^\d{10}$/.test(formData.phoneNumber)) {
        setError("Phone number must be exactly 10 digits.");
        return;
      }

      if (!formData.photo || !(formData.photo instanceof File)) {
        setError("Please upload a valid photo.");
        return;
      }

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("password_confirmation", formData.confirmPassword);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("countryId", parseInt(formData.country));
      formDataToSend.append("stateId", parseInt(formData.state));
      formDataToSend.append("skills", formData.skills.join(","));
      formDataToSend.append("photo", formData.photo);

      for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      await axios.post(`${baseURL}/register`, formDataToSend, config);

      alert("User added successfully!");
      navigate("/List");
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message?.join(", ") ||
          "Failed to add user. Please check your input."
      );
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Personaldetails
              formData={formData}
              updateFormData={updateFormData}
            />
          </>
        );
      case 1:
        return (
          <>
            <Countrydetails
              formData={formData}
              updateFormData={updateFormData}
            />
          </>
        );
      case 2:
        return (
          <>
            <Skillsdetails
              formData={formData}
              updateFormData={updateFormData}
            />
          </>
        );
      case 3:
        return (
          <>
            <Credentaildetails
              formData={formData}
              updateFormData={updateFormData}
            />
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <h3 className="text-[1.125rem] font-semibold">Stepper Form</h3>
      </div>
      <div className="bg-white p-4 rounded-lg dark:border-gray-700 mb-2">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="bg-white p-4 rounded-lg dark:border-gray-700">
        {error && <p className="text-red-500">{error}</p>}
        {activeStep === steps.length ? (
          <div className="text-center">
            <Typography variant="h5">
              Thank you for submitting the form!
            </Typography>
            <Link
              to="/List"
              className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg"
            >
              View List
            </Link>
          </div>
        ) : (
          <>
            {getStepContent(activeStep)}
            <div className="flex justify-between mt-4">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
