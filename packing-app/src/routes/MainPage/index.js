import React, { useState } from "react";
import "./mainPage.css";
import Form from "../Form/index";

export const MainPage = () => {
  const [formData, setFormData] = useState({
    containerHeight: 0,
    containerWidth: 0,
    itemWidth: 0,
    itemHeight: 0,
  });

  const handleFormSubmit = (data) => {
    setFormData(data);
    console.log("Dados recebidos do formulário:", data);
  };
  return (
    <div className="App">
      <Form onFormSubmit={handleFormSubmit} />
      <div className="container-principal">
        <div className="layout-principal">
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
        <div className="layout-complementar">
          <div className="item-complementar"></div>
          <div className="item-complementar"></div>
          <div className="item-complementar"></div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
