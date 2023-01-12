import { ReactElement, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export function Guard(): ReactElement {
  const navigate = useNavigate()
  const username = sessionStorage.getItem("username")

  useEffect(() => {
    if (username === null) navigate("/")
  }, [])

  return <Outlet />
}
