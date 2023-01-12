import { extendTheme } from '@chakra-ui/react'

const colors = {
  primary: {
    one: '#e0daf7',
    two: '#00caf8',
    three: '#027fe9',
    four: '#5015bd',
    five: '#3d0a49'
  },
}

const fonts = {
  primary: "Finger Paint",
  secondary: "DynaPuff"
}

export const theme = extendTheme({ colors, fonts })