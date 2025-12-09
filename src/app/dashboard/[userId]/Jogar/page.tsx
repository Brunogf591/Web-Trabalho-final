"use client";

import React, { useEffect, useMemo, useState } from "react";
import "@/app/styles/Battle.css";
import cartasData from "@/db/cartas.json";

type Carta = {
  id: string;
  nome: string;
  imagem: string;
  imagemVerso?: string;
  atributos: Record<string, number>;
};

const INITIAL_LIFE = 200;

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function BattlePage() {
  const deckAll: Carta[] = useMemo(
    () =>
      (cartasData as Carta[]).map((c) => ({
        ...c,
        imagemVerso: "/fundo.jpeg"
      })),
    []
  );

  const [deck, setDeck] = useState<Carta[]>([]);
  const [playerCard, setPlayerCard] = useState<Carta | null>(null);
  const [rivalCard, setRivalCard] = useState<Carta | null>(null);
  const [rivalHidden, setRivalHidden] = useState(true);
  const [playerLife, setPlayerLife] = useState(INITIAL_LIFE);
  const [rivalLife, setRivalLife] = useState(INITIAL_LIFE);
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [roundDisabled, setRoundDisabled] = useState(false);

  useEffect(() => {
    startNewMatch();
  }, []);

  function startNewMatch() {
    const d = shuffle(deckAll);
    setDeck(d);
    setPlayerLife(INITIAL_LIFE);
    setRivalLife(INITIAL_LIFE);
    setGameOver(null);
    setRoundDisabled(false);
    drawRound(d);
  }

  function drawRound(currentDeck = deck) {
    setRivalHidden(true);
    setRoundDisabled(false);

    setDeck((d) => {
      const source = currentDeck === deck ? d : currentDeck;

      if (source.length < 2) {
        const winner =
          playerLife > rivalLife
            ? "Player"
            : playerLife < rivalLife
            ? "Rival"
            : "Empate";
        setGameOver(winner);
        return source;
      }

      const p = source[0];
      const r = source[1];

      setPlayerCard(p);
      setRivalCard(r);

      return source.slice(2);
    });
  }

  function compareAttribute(attrKey: string) {
    if (roundDisabled || gameOver || !playerCard || !rivalCard) return;

    setRoundDisabled(true);
    setRivalHidden(false);

    const pValue = playerCard.atributos[attrKey] ?? 0;
    const rValue = rivalCard.atributos[attrKey] ?? 0;

    if (pValue === rValue) {
      setTimeout(() => {
        if (!checkEnd(playerLife, rivalLife)) drawRound();
      }, 900);
      return;
    }

    const diff = Math.abs(pValue - rValue);

    if (pValue > rValue) {
      setRivalLife((prev) => {
        const newLife = Math.max(0, prev - diff);
        setTimeout(() => {
          if (!checkEnd(playerLife, newLife)) drawRound();
        }, 900);
        return newLife;
      });
    } else {
      setPlayerLife((prev) => {
        const newLife = Math.max(0, prev - diff);
        setTimeout(() => {
          if (!checkEnd(newLife, rivalLife)) drawRound();
        }, 900);
        return newLife;
      });
    }
  }

  function checkEnd(pl: number, rl: number) {
    if (pl <= 0 || rl <= 0) {
      const winner = pl <= 0 ? "Rival" : "Player";
      setGameOver(winner);
      setRoundDisabled(true);
      return true;
    }
    return false;
  }

  function restart() {
    startNewMatch();
  }

  return (
    <div className="battle-container">
      <div className="battle-top">
        <div className="life-area top-left">
          <img src="/boy-rival.png" className="portrait small" alt="rival" />
          <div className="life-bar gold">
            <div
              className="life-fill turquoise"
              style={{ width: `${(rivalLife / INITIAL_LIFE) * 100}%` }}
            />
          </div>
          <span className="life-text small">
            {rivalLife}/{INITIAL_LIFE}
          </span>
        </div>

        <div className="top-center" />

        <div className="life-area top-right">
          <span className="life-text small">
            {playerLife}/{INITIAL_LIFE}
          </span>
          <div className="life-bar gold">
            <div
              className="life-fill turquoise"
              style={{ width: `${(playerLife / INITIAL_LIFE) * 100}%` }}
            />
          </div>
          <img src="/girl-player.png" className="portrait small" alt="player" />
        </div>
      </div>

      <div className="battle-main centered">
        <div className="card-slot">
          <div className="card-frame">
            {!rivalCard ? (
              <div className="card-back-placeholder" />
            ) : rivalHidden ? (
              <img
                src={rivalCard.imagemVerso || "/fundo.jpeg"}
                className="card-image back"
              />
            ) : (
              <div className="card-content">
                <div className="card-title">{rivalCard.nome}</div>
                <img src={rivalCard.imagem} className="card-image" />
                <div className="attributes">
                  {Object.entries(rivalCard.atributos).map(([k, v]) => (
                    <div key={k} className="attr-row">
                      <span className="attr-name">{k}:</span>
                      <span className="attr-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card-slot">
          <div className={`card-frame ${roundDisabled ? "disabled" : ""}`}>
            {!playerCard ? (
              <div className="card-back-placeholder" />
            ) : (
              <div className="card-content">
                <div className="card-title">{playerCard.nome}</div>
                <img src={playerCard.imagem} className="card-image" />
                <div className="attributes">
                  {Object.entries(playerCard.atributos).map(([k, v]) => (
                    <button
                      key={k}
                      className="attr-row btn-attr"
                      onClick={() => compareAttribute(k)}
                      disabled={roundDisabled || !!gameOver}
                    >
                      <span className="attr-name">{k}:</span>
                      <span className="attr-val">{v}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="battle-bottom">
        <div className="actions">
          <button className="btn-reset gold" onClick={restart}>
            Reiniciar
          </button>
        </div>

        {gameOver && (
          <div className="game-over-banner">
            <span>Vencedor: {gameOver}</span>
          </div>
        )}
      </div>
    </div>
  );
}
