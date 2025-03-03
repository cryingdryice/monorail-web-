const { default: GameEntryPage } = require("pages/GameEntryPage");
const { default: GamePlayPage } = require("pages/GamePlayPage");
const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: "/",
        element: <GameEntryPage />,
    },
    {
        path: "/game/:roomId",
        element: <GamePlayPage />,
    }

]);

export default router;