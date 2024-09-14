import React, { useEffect, useState } from "react";
import "./mainPage.css";
import Form from "../Form/index";
import twoDPackingOptimization from "../utils/algoritm.js";

import styled from "styled-components";
import { Box, CircularProgress } from "@mui/material";

// Estilos para a App
export const PageContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function cmToPx(cm, ppi = 12) {
  return Math.round((cm / 2.54) * ppi);
}

// // Estilo para container-principal
export const MainContainer = styled.div`
  background-color: gray;
  width: ${(props) =>
    `${cmToPx(props.$containerwidth)}px`}; /* Variável definida pela entrada */
  height: ${(props) =>
    `${cmToPx(props.$containerheight)}px`}; /* Variável definida pela entrada */
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 100px;
  border: 4px solid #00009c;
  border-radius: 5px;
`;

// // Estilo para layout-principal
export const MainLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) =>
    `${cmToPx(
      props.$mainlayoutwidth
    )}px`}; /* número de linhas * largura do item */
  height: ${(props) =>
    `${cmToPx(
      props.$mainlayoutheight
    )}px`}; /* número de colunas * altura do item */
`;

// // Estilo para layout-complementar
export const ExtraLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) =>
    `${cmToPx(
      props.$extralayoutwidth
    )}px`}; /* número de linhas * largura do item */
  height: ${(props) =>
    `${cmToPx(
      props.$extralayoutheight
    )}px`}; /* número de colunas * altura do item */
`;

// Estilo para item dentro do layout-principal
export const MainItem = styled.div`
  width: ${(props) =>
    `${cmToPx(props.$mainitemwidth)}px`}; /* Variável definida pela entrada */
  height: ${(props) =>
    `${cmToPx(props.$mainitemheight)}px`}; /* Variável definida pela entrada */
  background-color: #1e90ff;
  border: 1px solid #fff;
  box-sizing: border-box;
`;

// Estilo para item-complementar
export const ExtraItem = styled.div`
  width: ${(props) =>
    `${cmToPx(props.$extraitemwidth)}px`}; /* Variável invertida da entrada */
  height: ${(props) =>
    `${cmToPx(props.$extraitemheight)}px`}; /* Variável invertida da entrada */
  background-color: #1e90ff;
  border: 1px solid #fff;
  box-sizing: border-box;
`;

export const MainPage = () => {
  const [formData, setFormData] = useState({
    containerHeight: 0,
    containerWidth: 0,
    itemWidth: 0,
    itemHeight: 0,
  });

  // const [result, setResult] = useState({});

  const handleFormSubmit = (data) => {
    setFormData(data);
    // if (formData) {
    //   setResult(
    //     twoDPackingOptimization(
    //       parseFloat(formData.containerHeight),
    //       parseFloat(formData.containerWidth),
    //       parseFloat(formData.itemHeight),
    //       parseFloat(formData.itemWidth)
    //     )
    //   );
    // }
  };
  // const formData = {
  //   containerHeight: 130,
  //   containerWidth: 130,
  //   itemWidth: 30,
  //   itemHeight: 50,
  // };

  const result = {
    max: 10,
    mainLayout: {
      distribution: {
        height: 4,
        width: 2,
      },
      layoutHeight: 120,
      layoutWidth: 100,
      itemHeight: 30,
      itemWidth: 50,
    },
    extraLayout: {
      distribution: {
        height: 1,
        width: 2,
      },
      layoutHeight: 100,
      layoutWidth: 30,
      itemHeight: 50,
      itemWidth: 30,
    },
  };

  console.log("Dados recebidos do formulário:", result);
  return (
    <PageContainer>
      <Form onFormSubmit={handleFormSubmit} />

      <MainContainer
        $containerheight={formData.containerHeight}
        $containerwidth={formData.containerWidth}
      >
        <MainLayout
          $mainlayoutheight={result.mainLayout.layoutHeight}
          $mainlayoutwidth={result.mainLayout.layoutWidth}
        >
          {Array.from({
            length:
              result?.mainLayout?.distribution?.height *
              result?.mainLayout?.distribution?.width,
          }).map((_) => (
            <MainItem
              $mainitemheight={result.mainLayout.itemHeight}
              $mainitemwidth={result.mainLayout.itemWidth}
            ></MainItem>
          ))}
        </MainLayout>
        <ExtraLayout
          $extralayoutheight={result.extraLayout.layoutHeight}
          $extralayoutwidth={result.extraLayout.layoutWidth}
        >
          {Array.from({
            length:
              result?.extraLayout?.distribution?.height *
              result?.extraLayout?.distribution?.width,
          }).map((_) => (
            <ExtraItem
              $extraitemheight={result.extraLayout.itemHeight}
              $extraitemwidth={result.extraLayout.itemWidth}
            ></ExtraItem>
          ))}
        </ExtraLayout>
      </MainContainer>
      {/* ) : (
        <Box
          sx={{
            display: "flex",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <CircularProgress />
        </Box>
      )} */}
    </PageContainer>
  );
};

export default MainPage;
