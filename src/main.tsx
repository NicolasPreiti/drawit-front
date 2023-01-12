import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router, RouterHash } from "./router"
import { theme } from "./theme.config"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterHash />
      {/* <RouterProvider router={router} /> */}
    </ChakraProvider>
  </React.StrictMode>
)
