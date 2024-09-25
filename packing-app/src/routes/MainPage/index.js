import React, { useEffect, useState, useRef } from "react";
import "./mainPage.css";
import Form from "../Form/index";
import twoDPackingOptimization from "../utils/algoritm.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import image from "../../assets/logo2.png";

import styled from "styled-components";
import { Card, Typography, CardContent, Box, Button } from "@mui/material";

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
  border: 5px solid #000;
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
  background-color: #fad13a;
  border: 1px solid #e8f0fe;
  box-sizing: border-box;
`;

// Estilo para item-complementar
export const ExtraItem = styled.div`
  width: ${(props) =>
    `${2.5 * props.$extraitemwidth}px`}; /* Variável invertida da entrada */
  height: ${(props) =>
    `${2.5 * props.$extraitemheight}px`}; /* Variável invertida da entrada */
  background-color: #fad13a;
  border: 1px solid #e8f0fe;
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

  console.log("Dados recebidos do formulário:", result);
  return (
    <PageContainer style={{ padding: "40px", backgroundColor: "#FAD13A" }}>
      <header>
        <div className="title-logo-container">
          <Typography component="h1" variant="h1" gutterBottom>
            EMPACOTAMENTO INTELIGENTE
          </Typography>
          <div className="image-container">
            <img src={image} alt="" />
          </div>
        </div>
      </header>
      <section>
		<Box sx={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", marginRight: "30px"}}>
			<Form onFormSubmit={handleFormSubmit} />

				<Button
					onClick={generatePDF}
					sx={{
					mt: 2,
					mb: 2,
					backgroundColor: "#000",
					borderRadius: "5px",
					padding: "10px 20px",
					color: "#E8F0FE",
					}}
				>
					Baixar como PDF
				</Button>

		</Box>
        <div
          ref={printRef}
          style={{
            padding: "64px",
            backgroundColor: "#E8F0FE",
            border: "5px solid black",
            borderRadius: "15px",
          }}
        >
          <Card
            variant="outlined"
            style={{ margin: "12px 0" }}
            sx={{
              backgroundColor: "#FAD13A",
              width: "380px",
              border: "5px solid black",
              borderRadius: "15px",
            }}
          >
            <CardContent sx={{ padding: "16px !important" }}>
              <Typography variant="h5" component="div">
                Total de Itens: {result?.max ?? "--"}
              </Typography>
            </CardContent>
          </Card>

          {!result ? (
            <Card
              variant="outlined"
              style={{
                margin: "12px 0",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: "#fad13a",
                  border: "5px solid black",
                  borderRadius: "15px",
                  width: "380px",
                  padding: "16px 0 !important",
                }}
              >
                <Typography variant="h5" component="div">
                  OBJETO NÃO COMPORTADO
                </Typography>
              </CardContent>
            </Card>
          ) : (
            result?.max && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MainContainer
                  $containerheight={formData?.containerHeight}
                  $containerwidth={formData?.containerWidth}
                >
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
                        style={{ position: "relative", display: "flex" }}
                        $mainitemheight={result?.mainLayout?.itemHeight}
                        $mainitemwidth={result?.mainLayout?.itemWidth}
                      >
                        <span
                          style={{
                            width: "40%",
                            height: "100%",
                            display: "flex",
							alignItems: "center"
                          }}
                        >
                          {result?.mainLayout?.itemHeight}
                        </span>
                        <span
                          style={{
                            width: "50%",
                            height: "100%",
                            display: "flex",
                          }}
                        >
                          {result?.mainLayout?.itemWidth}
                        </span>
                      </MainItem>
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
                        style={{ position: "relative", display: "flex" }}
                        $extraitemheight={result?.extraLayout?.itemHeight}
                        $extraitemwidth={result?.extraLayout?.itemWidth}
                      >
                        <span
                          style={{
							width: "40%",
                            height: "100%",
                            display: "flex",
							alignItems: "center"
                          }}
                        >
                          {result?.extraLayout?.itemHeight}
                        </span>
						<span
						style={{
							width: "50%",
                            height: "100%",
                            display: "flex",
						}}
						>
						{result?.extraLayout?.itemWidth}
						</span>
                      </ExtraItem>
                    ))}
                  </ExtraLayout>
                </MainContainer>
              </Box>
            )
          )}
        </div>
      </section>
	  
    </PageContainer>
  );
};

export default MainPage;
