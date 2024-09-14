export default function twoDPackingOptimization(
  containerHeight,
  containerWidth,
  objectHeight,
  objectWidth
) {
  console.log("CONT==>", containerHeight);

  // Tratando restrições de tamanho do item em relação ao container
  if (
    (objectHeight > containerHeight && objectHeight > containerWidth) ||
    (objectWidth > containerHeight && objectWidth > containerWidth)
  ) {
    console.log("Erro! A área não comporta o item");
    return;
  }

  // Encontrando melhor layout inicial
  let partHeightToHeight = Math.floor(containerHeight / objectHeight);
  let partWidthToWidth = Math.floor(containerWidth / objectWidth);

  let partHeightToWidth = 0;
  let partWidthToHeight = 0;

  // Se o item tiver dimensões iguais de altura e largura, não é necessário cobrir os dois layouts
  if (objectHeight !== objectWidth) {
    partHeightToWidth = Math.floor(containerHeight / objectWidth);
    partWidthToHeight = Math.floor(containerWidth / objectHeight);
  }

  // Guardando os valores dos layouts em variáveis
  let layout1 = partHeightToHeight * partWidthToWidth;
  let layout2 = partHeightToWidth * partWidthToHeight;

  let totalResult = 0;
  let matrixResult = null;

  // Checando qual layout retorna maior número de itens
  if (layout1 >= layout2) {
    let layoutMatrix1 = {
      height: partHeightToHeight,
      width: partWidthToWidth,
    };

    let widthBoxes = containerWidth - layoutMatrix1.width * objectWidth;
    let heightBoxes = containerHeight - layoutMatrix1.height * objectHeight;

    if (objectWidth <= heightBoxes) {
      let newLayout = Math.floor(heightBoxes / objectWidth);
      let layoutComplement = Math.floor(containerWidth / objectHeight);
      let layoutComplementMatrix = {
        height: newLayout,
        width: layoutComplement,
      };

      totalResult = layout1 + layoutComplement;
      matrixResult = layoutMatrix1;

      return {
        max: totalResult,
        mainLayout: {
          distribution: matrixResult,
          layoutHeight: matrixResult.height * objectHeight,
          layoutWidth: matrixResult.width * objectWidth,
          itemHeight: objectHeight,
          itemWidth: objectWidth,
        },
        extraLayout: {
          distribution: layoutComplementMatrix,
          layoutHeight: layoutComplementMatrix.height * objectWidth,
          layoutWidth: layoutComplementMatrix.width * objectHeight,
          itemHeight: objectWidth,
          itemWidth: objectHeight,
        },
      };
    } else if (objectHeight <= widthBoxes) {
      let newLayout = Math.floor(widthBoxes / objectHeight);
      let layoutComplement = Math.floor(containerHeight / objectWidth);
      let layoutComplementMatrix = {
        height: layoutComplement,
        width: newLayout,
      };

      totalResult = layout1 + layoutComplement;
      matrixResult = layoutMatrix1;
      return {
        max: totalResult,
        mainLayout: {
          distribution: matrixResult,
          layoutHeight: matrixResult.height * objectHeight,
          layoutWidth: matrixResult.width * objectWidth,
          itemHeight: objectHeight,
          itemWidth: objectWidth,
        },
        extraLayout: {
          distribution: layoutComplementMatrix,
          layoutHeight: layoutComplementMatrix.height * objectWidth,
          layoutWidth: layoutComplementMatrix.width * objectHeight,
          itemHeight: objectWidth,
          itemWidth: objectHeight,
        },
      };
    } else {
      totalResult = layout1;
      matrixResult = layoutMatrix1;

      return {
        max: totalResult,
        mainLayout: {
          distribution: matrixResult,
          layoutHeight: matrixResult.height * objectHeight,
          layoutWidth: matrixResult.width * objectWidth,
          itemHeight: objectHeight,
          itemWidth: objectWidth,
        },
      };
    }
  } else {
    let layoutMatrix2 = {
      height: partHeightToWidth,
      width: partWidthToHeight,
    };

    let widthBoxes = containerWidth - layoutMatrix2.width * objectHeight;
    let heightBoxes = containerHeight - layoutMatrix2.height * objectWidth;

    if (objectHeight <= heightBoxes) {
      let newLayout = Math.floor(heightBoxes / objectHeight);
      let layoutComplement = Math.floor(containerWidth / objectWidth);
      let layoutComplementMatrix = {
        height: newLayout,
        width: layoutComplement,
      };

      totalResult = layout2 + layoutComplement;
      matrixResult = layoutMatrix2;

      return {
        max: totalResult,
        mainLayout: {
          distribution: matrixResult,
          layoutHeight: matrixResult.height * objectWidth,
          layoutWidth: matrixResult.width * objectHeight,
          itemHeight: objectWidth,
          itemWidth: objectHeight,
        },
        extraLayout: {
          distribution: layoutComplementMatrix,
          layoutHeight: layoutComplementMatrix.height * objectHeight,
          layoutWidth: layoutComplementMatrix.width * objectWidth,
          itemHeight: objectHeight,
          itemWidth: objectWidth,
        },
      };
    } else if (objectWidth <= widthBoxes) {
      let newLayout = Math.floor(widthBoxes / objectWidth);
      let layoutComplement = Math.floor(containerHeight / objectHeight);
      let layoutComplementMatrix = {
        height: layoutComplement,
        width: newLayout,
      };

      totalResult = layout2 + layoutComplement;
      matrixResult = layoutMatrix2;

      return {
        max: totalResult,
        mainLayout: {
          distribution: matrixResult,
          layoutHeight: matrixResult.height * objectWidth,
          layoutWidth: matrixResult.width * objectHeight,
          itemHeight: objectWidth,
          itemWidth: objectHeight,
        },
        extraLayout: {
          distribution: layoutComplementMatrix,
          layoutHeight: layoutComplementMatrix.height * objectHeight,
          layoutWidth: layoutComplementMatrix.width * objectWidth,
          itemHeight: objectHeight,
          itemWidth: objectWidth,
        },
      };
    } else {
      totalResult = layout2;
      matrixResult = layoutMatrix2;

      return {
        max: totalResult,
        mainLayout: {
          distribution: matrixResult,
          layoutHeight: matrixResult.height * objectWidth,
          layoutWidth: matrixResult.width * objectHeight,
          itemHeight: objectWidth,
          itemWidth: objectHeight,
        },
      };
    }
  }
}
