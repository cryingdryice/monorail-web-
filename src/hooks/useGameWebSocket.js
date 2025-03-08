import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import turnSound from "assets/turn.mp3";
import impossibleSound from "assets/impossible.mp3";

// const SOCKET_URL = "http://localhost:8080/ws-game";
const SOCKET_URL = "http://3.36.103.12:8080/ws-game";

export function useGameWebSocket(roomId, playerId, isFirst, setBoardState, setTilesCount) {
    const stompClient = useRef(null);
    const [gameStatus, setGameStatus] = useState("playing");
    const [isMyTurn, setIsMyTurn] = useState(isFirst === "true");
    const [winner, setWinner] = useState("");
    const navigate = useNavigate();

    // 효과음 파일 로드 (public 폴더에 저장된 경우)
    const redSign = new Audio(impossibleSound); 
    redSign.volume = 0.3; // 볼륨 조절
    const turnChange = new Audio(turnSound); 
    turnChange.volume = 0.3; // 볼륨 조절

    useEffect(() => {
        const socket = new SockJS(SOCKET_URL);
        const client = over(socket);
        client.debug = null;

        client.connect({}, () => {
            stompClient.current = client;

            // ✅ WebSocket 세션 ID 가져오기
            const sessionId = socket._transport.url.split("/")[5];

            // ✅ 플레이어가 게임방에 입장했음을 백엔드에 알림
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
                
                    // ✅ 공통 로직 실행
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
                turnChange.play().catch(err => console.log("효과음 재생 실패:", err));
            });

            client.subscribe(`/topic/impossible/${roomId}`, (message) => {
                const data = JSON.parse(message.body);
                setGameStatus(data.gameStatus);
                setIsMyTurn(data.currentTurn === playerId);
                redSign.play().catch(err => console.log("효과음 재생 실패:", err));
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
