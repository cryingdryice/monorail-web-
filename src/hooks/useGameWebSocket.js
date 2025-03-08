import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import turnSound from "assets/turn.mp3";
import impossibleSound from "assets/impossible.mp3";

const SOCKET_URL = "http://3.36.103.12:8080/ws-game";

export function useGameWebSocket(roomId, playerId, isFirst, setBoardState, setTilesCount) {
    const stompClient = useRef(null);
    const [gameStatus, setGameStatus] = useState("playing");
    const [isMyTurn, setIsMyTurn] = useState(isFirst === "true");
    const [winner, setWinner] = useState("");
    const navigate = useNavigate();

    // ✅ useRef를 활용한 오디오 객체 최적화
    const redSignRef = useRef(null);
    const turnChangeRef = useRef(null);

    useEffect(() => {
        // 🔹 오디오 객체를 한 번만 생성
        redSignRef.current = new Audio(impossibleSound);
        redSignRef.current.volume = 0.3;
        turnChangeRef.current = new Audio(turnSound);
        turnChangeRef.current.volume = 0.3;

        const socket = new SockJS(SOCKET_URL);
        const client = over(socket);
        client.debug = null;

        client.connect({}, () => {
            stompClient.current = client;
            const sessionId = socket._transport.url.split("/")[5];

            client.send(
                "/app/game/join",
                {},
                JSON.stringify({ roomId, playerId, sessionId })
            );

            client.subscribe(`/topic/game/${roomId}`, (message) => {
                const data = JSON.parse(message.body);
                if (["completed", "unfinished", "timeover", "surrender", "disconnected"].includes(data.gameStatus)) {
                    setGameStatus(data.gameStatus);
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
                setBoardState(data.boardState);
                setGameStatus(data.gameStatus);
                setIsMyTurn(data.currentTurn === playerId);
                setTilesCount(data.tilesCount);

                // ✅ 최적화된 사운드 재생
                if (turnChangeRef.current) {
                    turnChangeRef.current.currentTime = 0; // 즉시 재생
                    turnChangeRef.current.play().catch(err => console.log("효과음 재생 실패:", err));
                }
            });

            client.subscribe(`/topic/impossible/${roomId}`, (message) => {
                const data = JSON.parse(message.body);
                setGameStatus(data.gameStatus);
                setIsMyTurn(data.currentTurn === playerId);

                // ✅ 최적화된 사운드 재생
                if (redSignRef.current) {
                    redSignRef.current.currentTime = 0; // 즉시 재생
                    redSignRef.current.play().catch(err => console.log("효과음 재생 실패:", err));
                }
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

    const surrender = (cause) => {
        stompClient.current.send(
            "/app/game/defeat",
            {},
            JSON.stringify({ roomId, playerId, cause })
        );
    };

    const victory = (cause) => {
        stompClient.current.send(
            "/app/game/victory",
            {},
            JSON.stringify({ roomId, playerId, cause })
        );
    };

    return { gameStatus, isMyTurn, winner, surrender, victory, endTurn, impossible };
}
