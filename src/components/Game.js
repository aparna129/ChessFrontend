import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io.connect("http://localhost:4000");

function Game() {
  const [gameState, setGameState] = useState(null);
  const location = useLocation();
  const gameId = new URLSearchParams(location.search).get("gameId");

  const url = localStorage.getItem("url");

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const response = await axios.get(`${url}game/state?gameId=${gameId}`);
        setGameState(response.data);
      } catch (error) {
        console.error("Error fetching game state:", error);
      }
    };

    fetchGameState();

    socket.emit("join", gameId);

    socket.on("move", () => {
      fetchGameState();
    });

    return () => {
      socket.off("move");
    };
  }, [gameId, url]);

  const renderBoard = () => {
    if (!gameState) return null;

    const board = gameState.board;

    return (
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((square, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`square ${square.color}`}
              >
                {square.piece && <div className={`piece ${square.piece}`} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderBoard()}</div>;
}

export default Game;
