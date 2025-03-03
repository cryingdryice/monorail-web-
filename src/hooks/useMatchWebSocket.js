import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { v4 as uuidv4 } from "uuid";

// const SOCKET_URL = "http://localhost:8080/ws-game";
const SOCKET_URL = "http://3.36.103.12:8080/ws-game";

export function useMatchWebSocket() {
  const stompClient = useRef(null);
  const [opponentName, setOpponentName] = useState("");
  const clientId = useRef(uuidv4());
  const [isMatching, setIsMatching] = useState(false); // ✅ 매칭 진행 상태 추가
  const [isMatched, setIsMatched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (stompClient.current) return;
    const socket = new SockJS(SOCKET_URL);
    const client = over(socket);

    client.debug = null;

    client.connect({}, () => {
      stompClient.current = client;

      client.subscribe(`/queue/match/${clientId.current}`, (message) => {
        const data = JSON.parse(message.body);

        if (data.roomId) {
          setOpponentName(data.opponentName);
          setIsMatching(false); // ✅ 매칭 성공 시 false로 변경
          setIsMatched(true);

          // ✅ 3초 후 게임 페이지로 이동
          setTimeout(() => {
            if (client.connected) {
              client.disconnect(); // ✅ 페이지 이동 전 소켓 해제
            }
            navigate(`/game/${data.roomId}`, {
              state: {
                playerId: data.playerId,
                opponentId: data.opponentId,
                opponentName: data.opponentName,
                isFirst: data.isFirst,
              },
            });
          }, 3000); 
        }
      });
    });

    return () => {
      if (client.connected) {
        client.disconnect();
        // ✅ 수동으로 상태 초기화
        setIsMatched(false);
        setOpponentName("");
        setIsMatching(false);
      }
    };
  }, []);

  const sendMatchRequest = (nickname) => {
    if (stompClient.current && !isMatching) {
      setIsMatching(true); // ✅ 매칭 요청 시 true로 설정

      stompClient.current.send(
        "/app/match",
        {},
        JSON.stringify({ playerName: nickname, clientId: clientId.current })
      );
    }
  };

  return { opponentName, isMatching, isMatched, sendMatchRequest };
}
