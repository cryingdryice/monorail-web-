import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const SOCKET_URL = "http://localhost:8080/ws-game";
// const SOCKET_URL = "http://3.36.103.12:8080/ws-game";

export function useGameWebSocket(roomId, playerId, isFirst, setBoardState, setTilesCount) {
    const stompClient = useRef(null);
    const [gameStatus, setGameStatus] = useState("playing");
    const [isMyTurn, setIsMyTurn] = useState(isFirst === "true");
    const [winner, setWinner] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const socket = new SockJS(SOCKET_URL);
        const client = over(socket);
        client.debug = null;

        client.connect({}, () => {
            stompClient.current = client;

            client.subscribe(`/topic/game/${roomId}`, (message) => {
                const data = JSON.parse(message.body);

                if (data.gameStatus === "ended") {
                    setGameStatus("ended");
                    setWinner(data.winnerId);

                    setTimeout(() => {
                        if (client.connected) {
                            client.disconnect();
                        }
                        navigate("/");
                    }, 3000);
                }
            });

            client.subscribe(`/topic/turn/${roomId}`, (message) => {
                const data = JSON.parse(message.body);
                setGameStatus(data.gameStatus);
                setIsMyTurn(data.currentTurn === playerId);
                setBoardState(data.boardState);
                setTilesCount(data.tilesCount);
            });

            client.subscribe(`/topic/impossible/${roomId}`, (message) => {
                const data = JSON.parse(message.body);
                setGameStatus(data.gameStatus);
                setIsMyTurn(data.currentTurn === playerId);
            });
        });

        return () => {
            if (client.connected) {
                client.disconnect();
                setGameStatus("playing");
                setIsMyTurn(false);
                setWinner("");
            }
        };
    }, []);

    const surrender = () => {
        stompClient.current.send(
            "/app/game/defeat",
            {},
            JSON.stringify({ roomId, loserId: playerId })
        );
    };

    const endTurn = (boardState, tilesCount) => {
        stompClient.current.send(
            "/app/game/endTurn",
            {},
            JSON.stringify({ roomId, playerId, boardState, tilesCount: String(tilesCount) })
        );
    };

    const impossible = () => {
        stompClient.current.send(
            "/app/game/impossible",
            {},
            JSON.stringify({ roomId, playerId })
        );
    };

    const victory = () => {
        stompClient.current.send(
            "/app/game/victory",
            {},
            JSON.stringify({ roomId, winnerId: playerId })
        );
    };

    return { gameStatus, isMyTurn, winner, surrender, victory, endTurn, impossible };
}
