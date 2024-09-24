import math

## Função que faz interação inicial e recolhe os dados
def get_dimensions(content):
    while True:
        try:
            dimension = int(input(f'Digite a {content} do item: '))
            if dimension <= 0:
                print(f"A {content} deve ser maior que zero.")
            else:
                return dimension
        except ValueError:
            print(f'Erro! Digite uma {content} válida.')

while True:
    containerHeight = get_dimensions('altura do container')
    containerWidth = get_dimensions('largura do container')
    objectHeight = get_dimensions('altura do objeto')
    objectWidth = get_dimensions('largura do objeto')


    ## Tratando restrições de tamanho do item em relação ao container
    if((objectHeight > containerHeight and objectHeight > containerWidth) or ( objectWidth > containerHeight and objectWidth > containerWidth)):
        print('Erro! A área não comporta o item')




    ## encontrando melhor layout inicial

    ## Layout 1 (x na função objetivo)
    partHeightToHeight = 0
    partWidthToWidth = 0


    partHeightToHeight = math.floor(containerHeight/objectHeight)
    partWidthToWidth = math.floor(containerWidth/objectWidth)

    ## Layout 2 (y da função objetivo)
    partHeightToWidth = 0
    partWidthToHeight = 0

    # Se o item tiver dimensões iguais de altura e largura, não é necessário cobrir os dois layouts
    if(objectHeight != objectWidth):
        partHeightToWidth = math.floor(containerHeight/objectWidth)
        partWidthToHeight = math.floor(containerWidth/objectHeight)


    ## Guardando os valores dos layouts em variáveis 
    layout1, layout2 =  partHeightToHeight * partWidthToWidth, partHeightToWidth * partWidthToHeight 

    ## Variáveis de resultado
    totalResult = 0
    matrixResult = None

    ## Checando qual layout retorna maior núemro de itens
    if (layout1 >= layout2):
        ## Motando o que chamamos de Matriz do layout, onde Height é o núemro de linhas e Width é o número de colunas
        layoutMatrix1 = {'height': partHeightToHeight, 'width': partWidthToWidth}

        ##Dada a matirz, agora vamos ver se existe ainda algum espaço vazio no container 
        widthBoxes = containerWidth - (layoutMatrix1['width'] * objectWidth)
        HeightBoxes = containerHeight - (layoutMatrix1['height'] * objectHeight)

        ## Se ainda existir espaço no container, é feita uma no proposição de layout, o que consideramos como layout complementar 
        if(objectWidth <= HeightBoxes):
            newLayout = int(HeightBoxes/objectWidth)
            layoutComplement =  math.floor(containerWidth/objectHeight)
            layoutComplementMatrix = {'height':newLayout , 'width':layoutComplement }

            # Gerando os resultados
            totalResult = layout1 + layoutComplement
            matrixResult = layoutMatrix1
            print('Total de objetos: ', totalResult, '\nLayout 1--> ',matrixResult,'Altura do objeto paralela a altura da caixa\n', "Layout complementar--> ", layoutComplementMatrix, ' Posição do item  contrária a orientação do layout 1')
            break
        ## As Memas verificações anteriores olhando pra outra dimensão do container
        elif(objectHeight <= widthBoxes):
            print('aqui')
            newLayout = int(widthBoxes/objectHeight)
            layoutComplement = math.floor(containerHeight/objectWidth)
            layoutComplementMatrix = {'height': layoutComplement, 'width': newLayout}
            totalResult = layout1 + layoutComplement
            matrixResult = layoutMatrix1
            print('Total de objetos: ', totalResult, '\nLayout 1--> ',matrixResult,' Altura do objeto paralela a altura da caixa\n', "Layout complementar--> ", layoutComplementMatrix, ' Posição do item  contrária a orientação do layout 1')
            break

        ## Caso não haja espaço para complemento, é retornado valor gerado pelo layout inicial
        else: 
            totalResult = layout1
            matrixResult = layoutMatrix1
            print('Total de objetos: ', totalResult, '\nLayout 1--> ',matrixResult, ' Altura do objeto paralela a altura da caixa')
            break

    ## No else, é feito todo o precessado explicado mais acima, agora para a organização proposta no layout 2 
    else:
        layoutMatrix2 = {'height': partHeightToWidth, 'width': partWidthToHeight}
        widthBoxes = containerWidth - (layoutMatrix2['width'] * objectHeight)
        HeightBoxes = containerHeight - (layoutMatrix2['height'] * objectWidth)
        print(layoutMatrix2, widthBoxes, HeightBoxes)
        if(objectHeight <= HeightBoxes):
            newLayout = int(HeightBoxes/objectHeight)
            layoutComplement = math.floor(containerWidth/objectWidth)
            layoutComplementMatrix = {'height': newLayout, 'width': layoutComplement}
            totalResult = layout2 + layoutComplement
            matrixResult = layoutMatrix2
            print('Total de objetos: ', totalResult, '\nLayout 2--> ',matrixResult,' Altura do objeto perpendicular a altura da caixa\n', "Layout complementar--> ", layoutComplementMatrix, ' Posição do item  contrária a orientação do layout 2')
            break
        elif(objectWidth <= widthBoxes):
            newLayout = int(widthBoxes/objectWidth)
            layoutComplement = math.floor(containerHeight/objectHeight)
            layoutComplementMatrix = {'height': layoutComplement, 'width':newLayout}
            totalResult = layout2 + layoutComplement
            matrixResult = layoutMatrix2
            print('Total de objetos: ', totalResult, '\nLayout 2--> ',matrixResult,' Altura do objeto perpendicular a altura da caixa\n', "Layout complementar--> ", layoutComplementMatrix, ' Posição do item  contrária a orientação do layout 1')
            break
        else: 
            totalResult = layout2 
            matrixResult = layoutMatrix2
            print('Total de objetos: ', totalResult, '\nLayout 2--> ',matrixResult, ' Altura do objeto perpendicular a altura da caixa')
            break


        
        
        


        


        
    
        



