import React, { useState } from 'react';
import './App.css';

function App() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [objectHeight, setObjectHeight] = useState(0);
  const [objectWidth, setObjectWidth] = useState(0);

  let total = 10; // Total de blocos
  let matriz = [8, 2]; // 8 blocos em 2 colunas e 4 linhas

  return (
    <div className="App">
      <header className="App-header">
        <h1>Insira as informações sobre o Container</h1>

        <div>
          <label>
            Altura do Container:
            <input
              type="number"
              value={containerHeight}
              onChange={(e) => setContainerHeight(Number(e.target.value))}
            />
          </label>
        </div>

        <div>
          <label>
            Largura do Container:
            <input
              type="number"
              value={containerWidth}
              onChange={(e) => setContainerWidth(Number(e.target.value))}
            />
          </label>
        </div>

        <div>
          <label>
            Altura do Objeto:
            <input
              type="number"
              value={objectHeight}
              onChange={(e) => setObjectHeight(Number(e.target.value))}
            />
          </label>
        </div>

        <div>
          <label>
            Largura do Objeto:
            <input
              type="number"
              value={objectWidth}
              onChange={(e) => setObjectWidth(Number(e.target.value))}
            />
          </label>
        </div>

        <button onClick={''}>Calcular</button>

        <h2>Grid Resultado:</h2>
        <div className="grid-container">
          {/* Blocos 1 a 8 */}
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="grid-item">
              {idx + 1}
            </div>
          ))}
          {/* Blocos 9 e 10 */}
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={idx + 8}
              className="grid-item tall-item"
              style={{ gridRow: `${2 + (idx * 2)}/span 2`, gridColumn: '3' }}
            >
              {idx + 9}
            </div>
          ))}
        </div>

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
      </header>
    </div>
  );
}

export default App;
