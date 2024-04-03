const div = document.getElementById('main')!

movingGradient('cycle', div, ['red', 'blue', 'yellow', 'purple'], { padding: 100 })

let isActive = false
let deg = 90
let intervalId: number

div.style.background = `linear-gradient(${deg}deg, red 0%, blue 33%, yellow 66%, purple 100%)`

function movingGradient(action: Choice, mountedOn: HTMLElement, colors: string[], optional?: Optional) {
  mountedOn.addEventListener('mouseover', () => {
    if (isActive) return
    isActive = true

    if (action === 'rotate') {
      intervalId = setInterval(() => {
        deg === 360 ? deg = 1 : deg += 1
        mountedOn.style.background = `linear-gradient(${deg}deg, red 0%, blue 100%)`
      }, 1)
    }

    if (action === 'cycle') {
      const percentage = 100 / colors.length
      const arr: CyclingColors[] = []

      for (let i = 0; i < colors.length; i++) {
        arr.push({ color: colors[i], position: percentage * i, hasBeenDuped: false })
      }

      let gradient: string[] = []

      intervalId = setInterval(() => {
        const newArr: string[] = []
        arr.forEach(c => {
          if (!c.hasBeenDuped && c.position >= 101 + percentage) {
            arr.unshift({ color: c.color, position: arr[0].position - percentage * 2, hasBeenDuped: false })
            c.hasBeenDuped = true
          }

          if (c.position >= 300 + percentage) {
            arr.splice(arr.length - 1, 1)
          }

          c.position += 1
          newArr.push(c.color + ` ${c.position}%${arr.indexOf(c) !== arr.length - 1 ? ', ' : ''}`)
        })

        gradient = newArr
        console.log(gradient)
        mountedOn.style.background = `linear-gradient(90deg, ${gradient.join('')})`
      }, 10)
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
}

type Choice = 'rotate' | 'cycle'

type Optional = {
  border?: number
  padding?: number
  className?: string
}

type CyclingColors = {
  color: string
  position: number
  hasBeenDuped: boolean
}

type Colors_name = 'Red' | 'Tan' | 'Aqua' | 'Blue' | 'Cyan' | 'Gold' | 'Gray' | 'Grey' | 'Lime' | 'Navy' | 'Peru' |
  'Pink' | 'Plum' | 'Snow' | 'Teal' | 'Azure' | 'Beige' | 'Black' | 'Brown' | 'Coral' | 'Green' | 'Ivory' | 'Khaki' |
  'Linen' | 'Olive' | 'Wheat' | 'White' | 'Bisque' | 'Indigo' | 'Maroon' | 'Orange' | 'Orchid' | 'Purple' | 'Salmon' |
  'Sienna' | 'Silver' | 'Tomato' | 'Violet' | 'Crimson' | 'DarkRed' | 'DimGray' | 'DimGrey' | 'Fuchsia' | 'HotPink' |
  'Magenta' | 'OldLace' | 'SkyBlue' | 'Thistle' | 'Cornsilk' | 'DarkBlue' | 'DarkCyan' | 'DarkGray' | 'DarkGrey' |
  'DeepPink' | 'HoneyDew' | 'Lavender' | 'Moccasin' | 'SeaGreen' | 'SeaShell' | 'AliceBlue' | 'Burlywood' | 'CadetBlue' |
  'Chocolate' | 'DarkGreen' | 'DarkKhaki' | 'FireBrick' | 'Gainsboro' | 'Goldenrod' | 'IndianRed' | 'LawnGreen' |
  'LightBlue' | 'LightCyan' | 'LightGray' | 'LightGrey' | 'LightPink' | 'LimeGreen' | 'MintCream' | 'MistyRose' |
  'OliveDrab' | 'OrangeRed' | 'PaleGreen' | 'PeachPuff' | 'RosyBrown' | 'RoyalBlue' | 'SlateBlue' | 'SlateGray' |
  'SlateGrey' | 'SteelBlue' | 'Turquoise' | 'Aquamarine' | 'BlueViolet' | 'Chartreuse' | 'DarkOrange' | 'DarkOrchid' |
  'DarkSalmon' | 'DarkViolet' | 'DodgerBlue' | 'GhostWhite' | 'LightCoral' | 'LightGreen' | 'MediumBlue' | 'PapayaWhip' |
  'PowderBlue' | 'SandyBrown' | 'DarkMagenta' | 'DeepSkyBlue' | 'FloralWhite' | 'ForestGreen' | 'GreenYellow' | 'LightSalmon' |
  'LightYellow' | 'NavajoWhite' | 'SaddleBrown' | 'SpringGreen' | 'AntiqueWhite' | 'DarkSeaGreen' | 'LemonChiffon' |
  'LightSkyBlue' | 'MediumOrchid' | 'MediumPurple' | 'MidnightBlue' | 'DarkGoldenrod' | 'DarkSlateBlue' | 'DarkSlateGray' |
  'DarkSlateGrey' | 'DarkTurquoise' | 'LavenderBlush' | 'LightSeaGreen' | 'PaleGoldenrod' | 'PaleTurquoise' | 'PaleVioletRed' |
  'RebeccaPurple' | 'BlanchedAlmond' | 'CornflowerBlue' | 'DarkOliveGreen' | 'LightSlateGray' | 'LightSlateGrey' |
  'LightSteelBlue' | 'MediumSeaGreen' | 'MediumSlateBlue' | 'MediumTurquoise' | 'MediumVioletRed' | 'MediumAquaMarine' |
  'MediumSpringGreen' | 'LightGoldenrodYellow'

type Colors_HEX = `#${string | number}${string | number}${string | number}${string | number}${string | number}${string | number}`

type RGB_number = `${number}` | `${number}${number}` | `${number}${number}${number}`
type Colors_RGB = `rgb(${RGB_number}, ${RGB_number}, ${RGB_number})`

type Gradient = {
  action: 'none'
  mountedOn: HTMLElement
  optional?: Optional
} | {
  action: 'rotate' | 'cycle'
  mountedOn: HTMLElement
  colors: string[]
  optional?: Optional
}