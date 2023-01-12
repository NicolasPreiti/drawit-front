import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react"
import React, { ReactElement, useState } from "react"
import { useNavigate } from "react-router-dom"

export function HomePage(): ReactElement {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  const handleSetName = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    sessionStorage.setItem("username", username)
    navigate("/room/1")
  }

  const handleUsernameInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const username = evt.target.value
    setUsername(username)
  }

  return (
    <Flex
      direction={"column"}
      align={"center"}
      w={"100%"}
      h={"100vh"}
      backgroundColor={"primary.one"}
    >
      <Heading as={"h1"} textTransform={"uppercase"}>
        crayones
      </Heading>
      <Flex direction={"column"} align={"center"}>
        <Flex>
          <Heading as={"h2"} textTransform={"capitalize"}>
            bienvenido
          </Heading>
        </Flex>
        <Box>
          <form action='' onSubmit={handleSetName}>
            <FormControl>
              <FormLabel>nombre de usuario</FormLabel>
              <Input
                onChange={handleUsernameInput}
                value={username}
                placeholder='jugador424'
              ></Input>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </Flex>
  )
}
