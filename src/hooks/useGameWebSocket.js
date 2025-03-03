import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const SOCKET_URL = "http://3.36.103.12:8080/ws-game";

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

        // ✅ [1] 사용자가 페이지를 떠날 때 자동 항복 (데스크톱 & 일부 모바일)
        const handleUnload = () => {
            if (stompClient.current && stompClient.current.connected) {
                surrender();
            }
        };

        // ✅ [2] 모바일에서 백그라운드로 가면 자동 항복
        const handleVisibilityChange = () => {
            if (document.hidden) { // 사용자가 다른 탭으로 이동하거나, 모바일에서 앱을 백그라운드로 전환하면
                if (stompClient.current && stompClient.current.connected) {
                    surrender();
                }
            }
        };

        // ✅ [3] iOS에서 `beforeunload` 대체 (Safari 대응)
        const handlePageHide = () => {
            if (stompClient.current && stompClient.current.connected) {
                surrender();
            }
        };

        window.addEventListener("beforeunload", handleUnload); // 데스크톱 브라우저
        document.addEventListener("visibilitychange", handleVisibilityChange); // 모바일 백그라운드 감지
        window.addEventListener("pagehide", handlePageHide); // iOS Safari 대응

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("pagehide", handlePageHide);
            if (client.connected) {
                client.disconnect();
                setGameStatus("playing");
                setIsMyTurn(false);
                setWinner("");
            }
        };
    }, []);

    const surrender = () => {
        console.log("🚨 사용자가 페이지를 떠남 → 자동 항복 처리");
        stompClient.current.send(
            "/app/game/surrender",
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
