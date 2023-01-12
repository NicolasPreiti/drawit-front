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
      justify={"center"}
      gap={10}
      w={"100%"}
      h={"100vh"}
      bgColor={"primary.one"}
      bgImage={
        "https://img.freepik.com/fotos-premium/latas-pinturas-pincel-pintura-lienzo-manchado-forma-abstracta_324016-278.jpg?w=2000"
      }
      bgPosition={"center"}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
    >
      <Flex
        direction={"column"}
        align={"center"}
        gap={10}
        mt={"-100px"}
        px={8}
        py={10}
        borderRadius={"lg"}
        bgColor={"whiteAlpha.300"}
        boxShadow={"xl"}
        backdropFilter={"auto"}
        backdropBlur={"10px"}
      >
        <Flex>
          <Heading
            as={"h2"}
            className={styles.welcome}
            fontFamily={"primary"}
            fontSize={"7xl"}
            textTransform={"uppercase"}
            bgGradient={
              "linear(125deg, primary.one, primary.four, primary.two)"
            }
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
              fontSize={"xl"}
              fontWeight={"bold"}
              textTransform={"uppercase"}
              color={"white"}
              bgColor={"primary.four"}
              _hover={{
                color: "white",
                bgColor: "primary.two",
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
