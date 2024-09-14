import React, { useEffect, useState, useRef } from "react";
import "./mainPage.css";
import Form from "../Form/index";
import twoDPackingOptimization from "../utils/algoritm.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import styled from "styled-components";
import { Card, Typography, CardContent } from "@mui/material";

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
    `${2.5 * props.$containerwidth}px`}; /* Variável definida pela entrada */
  height: ${(props) =>
    `${2.5 * props.$containerheight}px`}; /* Variável definida pela entrada */
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
    `${
      2.5 * props.$mainlayoutwidth
    }px`}; /* número de linhas * largura do item */
  height: ${(props) =>
    `${
      2.5 * props.$mainlayoutheight
    }px`}; /* número de colunas * altura do item */
`;

// // Estilo para layout-complementar
export const ExtraLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) =>
    `${
      2.5 * props.$extralayoutwidth
    }px`}; /* número de linhas * largura do item */
  height: ${(props) =>
    `${
      2.5 * props.$extralayoutheight
    }px`}; /* número de colunas * altura do item */
`;

// Estilo para item dentro do layout-principal
export const MainItem = styled.div`
  width: ${(props) =>
    `${2.5 * props.$mainitemwidth}px`}; /* Variável definida pela entrada */
  height: ${(props) =>
    `${2.5 * props.$mainitemheight}px`}; /* Variável definida pela entrada */
  background-color: #1e90ff;
  border: 1px solid #fff;
  box-sizing: border-box;
`;

// Estilo para item-complementar
export const ExtraItem = styled.div`
  width: ${(props) =>
    `${2.5 * props.$extraitemwidth}px`}; /* Variável invertida da entrada */
  height: ${(props) =>
    `${2.5 * props.$extraitemheight}px`}; /* Variável invertida da entrada */
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

  const [result, setResult] = useState({});

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  useEffect(() => {
    // Verifica se formData tem valores válidos
    if (
      formData.containerHeight &&
      formData.containerWidth &&
      formData.itemHeight &&
      formData.itemWidth
    ) {
      const resultData = twoDPackingOptimization(
        parseFloat(formData.containerHeight),
        parseFloat(formData.containerWidth),
        parseFloat(formData.itemHeight),
        parseFloat(formData.itemWidth)
      );
      setResult(resultData); // Atualiza o estado do resultado
    }
  }, [formData]);

  const printRef = useRef();

  const generatePDF = async () => {
    if (!printRef.current) {
      console.error("Elemento de referência não encontrado!");
      return;
    }

    console.log("Elemento de referência:", printRef.current); // Verifique se está capturando corretamente

    const element = printRef.current;

    try {
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 180; // Largura da página A4
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Proporção da imagem

      pdf.addImage(data, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("print.pdf");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    }
  };

  // const formData = {
  //   containerHeight: 130,
  //   containerWidth: 130,
  //   itemWidth: 30,
  //   itemHeight: 50,
  // };

  // const result = {
  //   max: 10,
  //   mainLayout: {
  //     distribution: {
  //       height: 2,
  //       width: 4,
  //     },
  //     layoutHeight: 100,
  //     layoutWidth: 120,
  //     itemHeight: 50,
  //     itemWidth: 30,
  //   },
  //   extraLayout: {
  //     distribution: {
  //       height: 1,
  //       width: 2,
  //     },
  //     layoutHeight: 30,
  //     layoutWidth: 100,
  //     itemHeight: 30,
  //     itemWidth: 50,
  //   },
  // };

  console.log("Dados recebidos do formulário:", result);
  return (
    <PageContainer>
      <Form onFormSubmit={handleFormSubmit} />
      <div ref={printRef} style={{ padding: "64px" }}>
        <Card variant="outlined" style={{ margin: "12px" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Total de Itens: {result?.max}
            </Typography>
          </CardContent>
        </Card>

        <MainContainer
          $containerheight={formData?.containerHeight}
          $containerwidth={formData?.containerWidth}
        >
          {!result ? (
            <Card
              variant="outlined"
              style={{
                margin: "12px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  OBJETO NÃO COMPORTADO
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <>
              <MainLayout
                $mainlayoutheight={result?.mainLayout?.layoutHeight}
                $mainlayoutwidth={result?.mainLayout?.layoutWidth}
              >
                {Array.from({
                  length:
                    result?.mainLayout?.distribution?.height *
                    result?.mainLayout?.distribution?.width,
                }).map((_) => (
                  <MainItem
                    $mainitemheight={result?.mainLayout?.itemHeight}
                    $mainitemwidth={result?.mainLayout?.itemWidth}
                  ></MainItem>
                ))}
              </MainLayout>
              <ExtraLayout
                $extralayoutheight={result?.extraLayout?.layoutHeight}
                $extralayoutwidth={result?.extraLayout?.layoutWidth}
              >
                {Array.from({
                  length:
                    result?.extraLayout?.distribution?.height *
                    result?.extraLayout?.distribution?.width,
                }).map((_) => (
                  <ExtraItem
                    $extraitemheight={result?.extraLayout?.itemHeight}
                    $extraitemwidth={result?.extraLayout?.itemWidth}
                  ></ExtraItem>
                ))}
              </ExtraLayout>
            </>
          )}
        </MainContainer>
      </div>
      <button onClick={generatePDF}>Baixar como PDF</button>
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
