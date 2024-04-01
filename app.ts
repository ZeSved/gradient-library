const div = document.getElementById('main')!
movingGradient("rotate", div)

let isActive = false
let deg = 90
let intervalId: number

div.style.background = `linear-gradient(${deg}deg, red 0%, blue 100%)`

function movingGradient(action: 'rotate' | 'cycle', child: HTMLElement, border?: number, padding?: number, className?: string) {
  child.addEventListener('mouseover', () => {
    if (isActive) return
    isActive = true

    if (action === 'rotate') {
      intervalId = setInterval(() => {
        deg === 360 ? deg = 1 : deg += 1
        child.style.background = `linear-gradient(${deg}deg, red 0%, blue 100%)`
      }, 1)
    }

    if (action === 'cycle') {
      const colors = [{ color: '#fff', position: 0 }, { color: '#000', position: 100 }]
      let gradient: string[] = []

      intervalId = setInterval(() => {
        const newArr: string[] = []
        colors.forEach(c => {
          if (c.position === 101) colors.unshift({ color: c.color, position: (100 / colors.length) * -1 })
          c.position += 1

          newArr.push(c.color + `${c.position}%${colors.indexOf(c) !== colors.length - 1 && ', '}`)
        })

        gradient = newArr
        child.style.background = `linear-gradient(90deg, ${gradient.join('')})`
      }, 1)
    }
  })

  child.addEventListener('mouseout', () => {
    if (isActive) {
      isActive = false

      clearInterval(intervalId)
    } else return
  })

  className && div.classList.add(className)
  div.style.padding = padding ? padding.toString() : '16px'
  // div.style.borderRadius = border ? border.toString() : `${parseInt(child.style.borderRadius) + parseInt(div.style.padding) * 2}px`
}