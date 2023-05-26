import React, { useEffect, useState } from 'react';
import Dado from './components/Dado';
import Confetti from 'react-confetti';

function App() {
  // Estado para armazenar os dados do jogo
  const [dados, setDados] = useState(() => inicializaDados());
  // Estado para verificar se o jogo foi ganho
  const [ganhouJogo, setGanhouJogo] = useState(false);

  useEffect(() => {
    // Verificar se todos os dados estão segurando e têm o mesmo número
    const dadosValidos = dados.every(dado => dado.segurando && dado.numAleatorio === dados[0].numAleatorio);
    if (dadosValidos) {
      setGanhouJogo(true); // Se verdadeiro, o jogo foi ganho
    }
  }, [dados]);

  // Função para inicializar os dados do jogo
  function inicializaDados() {
    const novosDados = [];
    for (let i = 0; i < 10; i++) {
      var numAleatorio = Math.ceil(Math.random() * 6);
      novosDados.push({ numAleatorio, segurando: false });
    }
    return novosDados;
  }

  // Função para rolar os dados
  function rolaDados() {
    setDados(prevDados =>
      prevDados.map((item, indice) =>
        !item.segurando ? { ...item, numAleatorio: Math.ceil(Math.random() * 6) } : item
      )
    );

    // Reiniciar o jogo se já foi ganho
    if (ganhouJogo) {
      setGanhouJogo(false);
      setDados(inicializaDados());
    }
  }

  // Função para segurar ou soltar um dado
  function seguraDado(dadoId) {
    setDados(prevDados =>
      prevDados.map((item, indice) =>
        indice === dadoId ? { ...item, segurando: !item.segurando } : item
      )
    );
  }

  return (
    <main>
      {/* Mostrar confetes se o jogo foi ganho */}
      {ganhouJogo && (
        <Confetti width={1200} height={800} recycle=false/>
      )}

      <h1 className='titulo'>Tenzies Game</h1>
      <p className='instrucoes'>
        Role os dados até que todos sejam iguais. Clique em cada dado para fixá-lo no valor atual entre as jogadas.
      </p>
      <div className='dados'>
        {/* Renderizar os dados usando o componente Dado */}
        {dados.map((item, index) => (
          <Dado
            handleClick={() => seguraDado(index)}
            key={index}
            value={item.numAleatorio}
            segurando={item.segurando}
          />
        ))}
      </div>
      <button className='novos-dados-btn' onClick={() => rolaDados()}>
        {/* Alterar o texto do botão com base no estado do jogo */}
        <span className='botao-texto'>
          {ganhouJogo ? 'Jogar novamente' : 'Novos Dados'}
        </span>
      </button>
    </main>
  );
}

export default App;
