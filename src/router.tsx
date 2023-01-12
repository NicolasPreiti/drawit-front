import { createBrowserRouter, Outlet } from "react-router-dom"
import { Draw } from "./components/draw/Draw.component"
import { Guard } from "./components/guard/Guard.component"
import { HomePage } from "./pages/home/Home.page"
import { RoomPage } from "./pages/room/Room.page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/",
        element: <Guard />,
        children: [
          {
            path: "/room/:roomName",
            element: <RoomPage />,
          },
        ],
      },
    ],
  },
])
