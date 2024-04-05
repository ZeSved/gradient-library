export function movingGradient(gradient: Gradient) {
  let isActive = false
  let deg = 90
  let intervalId: NodeJS.Timeout
  const { animation, colors, mountedOn, optional }: Gradient = gradient
  const percentage = 100 / (colors.length - 1)
  const arr: CyclingColors[] = []
  const movementSpeed = animation !== 'none' ?
    (optional?.speed === 'fast' ? 1 :
      optional?.speed === 'medium' ? 10 :
        optional?.speed === 'slow' ? 100 : 10) : 0


  for (let i = 0; i < colors.length; i++) {
    arr.push({ color: colors[i], position: percentage * i, hasBeenDuped: false })
  }

  mountedOn.addEventListener('mouseover', () => {
    if (isActive) return
    isActive = true

    if (animation === 'rotate-z') {
      const color = colorsToGradient(colors, percentage)

      intervalId = setInterval(() => {
        deg === 360 ? deg = 1 : deg += 1

        mountedOn.style.background = `linear-gradient(${deg}deg, ${color.join('')})`
      }, movementSpeed)
    }

    if (animation === 'rotate-y' || animation === 'rotate-x') {
      intervalId = setInterval(() => {
        mountedOn.style.background = `linear-gradient(${animation === 'rotate-x' ? 0 : 90}deg, ${rotateXYZ(arr, percentage).join('')})`
      }, movementSpeed)
    }

    if (animation === 'rotate-xyz') {
      intervalId = setInterval(() => {
        const colorArr = rotateXYZ(arr, percentage)
        deg === 360 ? deg = 1 : deg += 1

        mountedOn.style.background = `linear-gradient(${deg}deg, ${colorArr.join('')})`
      }, movementSpeed)
    }
  })

  mountedOn.addEventListener('mouseout', () => {
    if (isActive) {
      isActive = false

      clearInterval(intervalId)
    } else return
  })

  const children = mountedOn.children[0] as HTMLElement
  optional?.className && mountedOn.classList.add(optional.className)
  mountedOn.style.padding = optional?.padding ? optional.padding.toString() + 'px' : '32px'
  mountedOn.style.borderRadius = optional?.border ? optional.border.toString() + 'px' : `${children.style.borderRadius + mountedOn.style.padding}`

  function rotateXYZ(arr: CyclingColors[], percentage: number) {
    const newArr: string[] = []
    arr.forEach(c => {
      if (!c.hasBeenDuped && c.position >= 101 + percentage) {
        arr.unshift({ color: c.color, position: arr[0].position - percentage * 3, hasBeenDuped: false })
        c.hasBeenDuped = true
      }

      if (c.position >= 300 + percentage) {
        arr.splice(arr.length - 1, 1)
      }

      c.position += 1
      newArr.push(c.color + ` ${c.position}%${arr.indexOf(c) !== arr.length - 1 ? ', ' : ''}`)
    })

    return newArr
  }

  function colorsToGradient(colors: Colors, percentage: number) {
    const newArr: string[] = []

    for (let i = 0; i < colors.length; i++) {
      newArr.push(colors[i] + ` ${percentage * i}%${i !== colors.length - 1 ? ', ' : ''}`)
      console.log(newArr);
    }

    return newArr
  }
}

module.exports = movingGradient

type Optional = {
  border?: number
  padding?: number
  className?: string
  speed?: number | 'slow' | 'medium' | 'fast'
  degrees?: number
}

type CyclingColors = {
  color: string
  position: number
  hasBeenDuped: boolean
}

type Colors_name = Lowercase<'Red' | 'Tan' | 'Aqua' | 'Blue' | 'Cyan' | 'Gold' | 'Gray' | 'Grey' | 'Lime' | 'Navy' | 'Peru' | 'Pink' | 'Plum' | 'Snow' | 'Teal' | 'Azure' | 'Beige' | 'Black' | 'Brown' | 'Coral' | 'Green' | 'Ivory' | 'Khaki' | 'Linen' | 'Olive' | 'Wheat' | 'White' | 'Bisque' | 'Indigo' | 'Maroon' | 'Orange' | 'Orchid' | 'Purple' | 'Salmon' | 'Sienna' | 'Silver' | 'Tomato' | 'Violet' | 'Crimson' | 'DarkRed' | 'DimGray' | 'DimGrey' | 'Fuchsia' | 'HotPink' | 'Magenta' | 'OldLace' | 'SkyBlue' | 'Thistle' | 'Cornsilk' | 'DarkBlue' | 'DarkCyan' | 'DarkGray' | 'DarkGrey' | 'DeepPink' | 'HoneyDew' | 'Lavender' | 'Moccasin' | 'SeaGreen' | 'SeaShell' | 'AliceBlue' | 'Burlywood' | 'CadetBlue' | 'Chocolate' | 'DarkGreen' | 'DarkKhaki' | 'FireBrick' | 'Gainsboro' | 'Goldenrod' | 'IndianRed' | 'LawnGreen' | 'LightBlue' | 'LightCyan' | 'LightGray' | 'LightGrey' | 'LightPink' | 'LimeGreen' | 'MintCream' | 'MistyRose' | 'OliveDrab' | 'OrangeRed' | 'PaleGreen' | 'PeachPuff' | 'RosyBrown' | 'RoyalBlue' | 'SlateBlue' | 'SlateGray' | 'SlateGrey' | 'SteelBlue' | 'Turquoise' | 'Aquamarine' | 'BlueViolet' | 'Chartreuse' | 'DarkOrange' | 'DarkOrchid' | 'DarkSalmon' | 'DarkViolet' | 'DodgerBlue' | 'GhostWhite' | 'LightCoral' | 'LightGreen' | 'MediumBlue' | 'PapayaWhip' | 'PowderBlue' | 'SandyBrown' | 'DarkMagenta' | 'DeepSkyBlue' | 'FloralWhite' | 'ForestGreen' | 'GreenYellow' | 'LightSalmon' | 'LightYellow' | 'NavajoWhite' | 'SaddleBrown' | 'SpringGreen' | 'AntiqueWhite' | 'DarkSeaGreen' | 'LemonChiffon' | 'LightSkyBlue' | 'MediumOrchid' | 'MediumPurple' | 'MidnightBlue' | 'DarkGoldenrod' | 'DarkSlateBlue' | 'DarkSlateGray' | 'DarkSlateGrey' | 'DarkTurquoise' | 'LavenderBlush' | 'LightSeaGreen' | 'PaleGoldenrod' | 'PaleTurquoise' | 'PaleVioletRed' | 'RebeccaPurple' | 'BlanchedAlmond' | 'CornflowerBlue' | 'DarkOliveGreen' | 'LightSlateGray' | 'LightSlateGrey' | 'LightSteelBlue' | 'MediumSeaGreen' | 'MediumSlateBlue' | 'MediumTurquoise' | 'MediumVioletRed' | 'MediumAquaMarine' | 'MediumSpringGreen' | 'LightGoldenrodYellow'>
type HEX_symbol = Uppercase<string> | number
type Colors_HEX = `#${HEX_symbol}${HEX_symbol}${HEX_symbol}${HEX_symbol}${HEX_symbol}${HEX_symbol}`
type RGB_number = `${number}` | `${number}${number}` | `${number}${number}${number}`
type Colors_RGB = `rgb(${RGB_number}, ${RGB_number}, ${RGB_number})`
type Colors = (Colors_name | Colors_HEX | Colors_RGB)[]

type Gradient = {
  mountedOn: HTMLElement
  colors: Colors
  animation: 'rotate-z' | 'rotate-xyz' | 'rotate-y' | 'rotate-x' | 'none'
  optional?: Optional
}
