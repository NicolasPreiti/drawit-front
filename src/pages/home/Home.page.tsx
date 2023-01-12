import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react"
import React, { ReactElement, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import styles from "./home.module.css"

type Inputs = {
  username: string
}

export function HomePage(): ReactElement {
  const [username, setUsername] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const navigate = useNavigate()

  const handleSetName = () => {
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
      gap={10}
      w={"100%"}
      h={"100vh"}
      backgroundColor={"primary.one"}
    >
      <Heading
        as={"h1"}
        className={styles.home__title}
        fontFamily={"primary"}
        fontSize={"7xl"}
        textTransform={"uppercase"}
        bgGradient={
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)"
        }
      >
        crayones
      </Heading>
      <Flex
        direction={"column"}
        align={"center"}
        gap={10}
        px={8}
        py={10}
        borderRadius={"md"}
        bgColor={"white"}
        boxShadow={"lg"}
      >
        <Flex>
          <Heading
            as={"h2"}
            fontFamily={"secondary"}
            fontSize={"7xl"}
            textTransform={"capitalize"}
          >
            bienvenido
          </Heading>
        </Flex>
        <Flex w={"100%"}>
          <form
            action=''
            onSubmit={handleSubmit(handleSetName)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <FormControl fontFamily={"secondary"}>
              <FormLabel
                fontSize={"sm"}
                _first={{ textTransform: "capitalize" }}
              >
                nombre de usuario
              </FormLabel>
              <Input
                {...(register("username"), { required: true })}
                onChange={handleUsernameInput}
                value={username}
                placeholder='ej: jugador424'
              ></Input>
              {errors.username && <span>debe ingresar un nombre</span>}
            </FormControl>
            <Button
              type={"submit"}
              fontFamily={"secondary"}
              fontSize={"2xl"}
              fontWeight={"bold"}
              textTransform={"uppercase"}
              color={"white"}
              bgColor={"primary.four"}
              _hover={{
                color: "white",
                bgColor: "primary.five",
              }}
            >
              a jugar!!!
            </Button>
          </form>
        </Flex>
      </Flex>
    </Flex>
  )
}
