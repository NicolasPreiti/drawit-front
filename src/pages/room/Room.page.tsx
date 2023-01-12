import { Flex, Text } from "@chakra-ui/react"
import { ReactElement, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { ChatBox } from "../../components/chat-box/ChatBox.component"
import { Draw } from "../../components/draw/Draw.component"
import { onOnlineUsers } from "../../services/io.service"

export function RoomPage(): ReactElement {
  const [onlineUsers, setOnlineUsers] = useState(0)

  useEffect(() => {
    onOnlineUsers(setOnlineUsers)
  })

  return (
    <Flex
      justifyContent={"center"}
      gap={4}
      height={"100vh"}
      p={5}
      backgroundColor={"primary.one"}
    >
      <Draw />
      <ChatBox />
      <Flex>
        <Text>en linea: {onlineUsers}</Text>
      </Flex>
      <Outlet />
    </Flex>
  )
}
