import { ReactElement } from "react"
import {
  createBrowserRouter,
  HashRouter,
  Outlet,
  Route,
  Routes,
} from "react-router-dom"
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

export function RouterHash(): ReactElement {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Outlet />}>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/' element={<Guard />}>
            <Route path='/room/:roomName' element={<RoomPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}
