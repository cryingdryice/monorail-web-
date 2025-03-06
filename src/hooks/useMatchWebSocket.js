import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { v4 as uuidv4 } from "uuid";

const SOCKET_URL = "http://localhost:8080/ws-game";
// const SOCKET_URL = "http://3.36.103.12:8080/ws-game";

export function useMatchWebSocket() {
  const stompClient = useRef(null);
  const [opponentName, setOpponentName] = useState(""); // 상대 닉네임
  const clientId = useRef(uuidv4()); // 클라이언트id생성
  const [isMatching, setIsMatching] = useState(false); // 매칭 진행중인지
  const [isMatched, setIsMatched] = useState(false); // 매칭이 완료되었는지
  const [showCancelInfo, setShowCancelInfo] = useState(false);
  const navigate = useNavigate();

  // ✅ 소켓 해제 시 실행할 함수
  const onSocketDisconnected = () => {
    console.log("🔌 WebSocket 연결 해제됨");
    setIsMatched(false);
    setOpponentName("");
    setIsMatching(false);
  };
  
  useEffect(() => {
    if (stompClient.current) return;
    const socket = new SockJS(SOCKET_URL);
    const client = over(socket);

    client.debug = null;

    client.connect({}, () => {
      stompClient.current = client;

      client.subscribe(`/queue/match/${clientId.current}`, (message) => {
        const data = JSON.parse(message.body);

        if(data.isFirst === "canceled"){
          setShowCancelInfo(true);
          setIsMatching(false);
          setTimeout(()=>{
            console.log("취소!");
            setShowCancelInfo(false);
          }, 3000);
        }
        if (data.roomId) {
          setOpponentName(data.opponentName);
          setIsMatching(false); // ✅ 매칭 성공 시 false로 변경
          setIsMatched(true); // 매칭 성공 시 true

          // ✅ 3초 후 게임 페이지로 이동
          setTimeout(() => {
            if (client.connected) {
              client.disconnect(); // ✅ 페이지 이동 전 소켓 해제
              onSocketDisconnected();
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
        // ✅ 수동으로 상태 초기화
        client.disconnect();
        onSocketDisconnected(); // 클린업 실행
      }
    };
  }, []);

  // 매칭 요청 함수
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

  // 매칭취소 로직 추가
  const sendMatchCancelRequest = (nickname) =>{
    setIsMatching(false);

    stompClient.current.send(
      "/app/match/cancel",
      {},
      JSON.stringify({ playerName: nickname, clientId: clientId.current})
    );
  };

  return { opponentName, isMatching, isMatched, showCancelInfo, sendMatchRequest, sendMatchCancelRequest };
}
