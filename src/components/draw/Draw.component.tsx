import { Box, Button, Flex } from "@chakra-ui/react"
import React, { ReactElement, useEffect, useRef, useState } from "react"
import { FaEraser } from "react-icons/fa"
import { useParams } from "react-router-dom"
import { Socket } from "socket.io-client"
import { ICanvasInfo, ICoords } from "../../interfaces/draw.interface"
import {
  emitCleanCanvas,
  emitCleanPoints,
  emitMousePos,
  initSocket,
  onCleanCanvas,
  onCleanPoints,
  onMousePos,
} from "../../services/io.service"

type RoomParams = Record<"roomName" | "player", string>

export function Draw(): ReactElement {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [myStrokeColor, setMyStrokeColor] = useState("black")
  const [strokeColor, setStrokeColor] = useState("black")
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const params = useParams<RoomParams>()
  const canvas = useRef<HTMLCanvasElement>(null)
  let isDrawing = false

  const canvasInfo: ICanvasInfo = {
    width: 600,
    height: 600,
    points: [],
    strokeColor: strokeColor,
  }

  useEffect(() => {
    if (socket === null) {
      setSocket(initSocket(params.roomName as string))
    }
    if (socket !== null) {
      onMousePos(writePoints)
      onCleanPoints(canvasInfo)
      onCleanCanvas(context, canvasInfo)
    }
  }, [context])

  useEffect(() => {
    if (canvas.current !== null) {
      setContext(canvas.current.getContext("2d"))
      canvas.current.width = canvasInfo.width
      canvas.current.height = canvasInfo.height

      if (context) {
        context.lineWidth = 3
        context.lineCap = "round"
        context.strokeStyle = strokeColor
      }
    }
  }, [context])

  useEffect(() => {
    if (context) {
      context.strokeStyle = strokeColor
    }
  }, [strokeColor])

  const handleStrokeColor = (color: string) => {
    setStrokeColor(color)
  }

  const mouseMove = (evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) return

    const { clientX, clientY } = evt
    write({
      x: clientX,
      y: clientY,
    })
  }

  const write = (coord: ICoords): void => {
    if (canvas.current) {
      const rect = canvas.current.getBoundingClientRect()
      const cursorPos = {
        x: coord.x - rect?.left,
        y: coord.y - rect?.top,
      }

      writePoints(cursorPos)
    }
  }

  const writePoints = (
    cursorPos: ICoords,
    emit = true,
    color?: string | undefined
  ) => {
    canvasInfo.points.push(cursorPos)
    if (emit)
      emitMousePos({
        coords: cursorPos,
        color: strokeColor,
      })

    if (canvasInfo.points.length >= 2) {
      const prev = canvasInfo.points[canvasInfo.points.length - 2]
      const current = canvasInfo.points[canvasInfo.points.length - 1]

      drawOnCanvas(prev, current, color)
    }
  }

  const drawOnCanvas = (prev: ICoords, current: ICoords, color?: string) => {
    if (context) {
      context.beginPath()
      context.moveTo(prev.x, prev.y)
      context.lineTo(current.x, current.y)
      if (color) {
        context.strokeStyle = color
        context.stroke()
      } else {
        context.strokeStyle = strokeColor
        context.stroke()
      }
    }
  }

  const startDrawing = (evt: any) => {
    isDrawing = true

    const { clientX, clientY } = evt
    write({
      x: clientX,
      y: clientY,
    })
  }

  const stopDrawing = () => {
    isDrawing = false
    canvasInfo.points = []
    emitCleanPoints()
  }

  const cleanCanvas = () => {
    if (!context) return
    canvasInfo.points = []
    context.clearRect(0, 0, canvasInfo.width, canvasInfo.height)
    emitCleanCanvas()
  }

  return (
    <Flex direction={"column"}>
      <Box
        h={"max-content"}
        borderRadius={"md"}
        overflow={"hidden"}
        boxShadow={"xl"}
      >
        <canvas
          ref={canvas}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          // onMouseLeave={stopDrawing}
          onMouseMove={mouseMove}
          style={{ backgroundColor: "white" }}
        ></canvas>
      </Box>
      <Flex justify={"space-between"} mt={2}>
        <Flex gap={".1rem"}>
          <ColorBtn color='black' cb={setStrokeColor} />
          <ColorBtn color='red' cb={setStrokeColor} />
          <ColorBtn color='orange' cb={setStrokeColor} />
          <ColorBtn color='yellow' cb={setStrokeColor} />
          <ColorBtn color='green' cb={setStrokeColor} />
          <ColorBtn color='deepskyblue' cb={setStrokeColor} />
          <ColorBtn color='fuchsia' cb={setStrokeColor} />
        </Flex>

        <Button
          onClick={cleanCanvas}
          size={"sm"}
          borderRadius={"sm"}
          backgroundColor={"white"}
        >
          <FaEraser size={20} />
        </Button>
      </Flex>
    </Flex>
  )
}

function ColorBtn({
  color,
  cb,
}: {
  color: string
  cb: (color: string) => void
}) {
  return (
    <Button
      onClick={() => cb(color)}
      variant={"unstyled"}
      size={"sm"}
      borderRadius={"sm"}
      backgroundColor={color}
    ></Button>
  )
}
