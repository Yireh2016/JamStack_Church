class TypeWriter {
  constructor({
    text,
    time,
    el,
    isReverse = false,
    onComplete,
    onReverseComplete
  }) {
    this.time = time
    this.el = el
    this.isReverse = isReverse
    this.onComplete = onComplete
    this.onReverseComplete = onReverseComplete
    this.init(text)
  }

  init(text) {
    const wordsArr = []
    const words = {}
    text.split(``).forEach((char, i) => {
      if (i > 0) {
        wordsArr.push(wordsArr[i - 1] + char)
        words[wordsArr[i - 1] + char] = i
        return
      }
      wordsArr.push(char)
      words[char] = i
    })
    this.text = text
    this.wordsArr = wordsArr
    this.words = words
  }

  printArr(timer) {
    const { wordsArr, words, el, isReverse } = this
    if (el.innerHTML === ``) {
      el.innerHTML = wordsArr[0]
      return
    }

    const pointer = words[el.innerHTML]
    if (isReverse) {
      if (wordsArr[pointer - 1]) {
        el.innerHTML = wordsArr[pointer - 1]
      } else {
        el.innerHTML = ``
        this.isReverse = false
        this.onReverseComplete()
        clearInterval(timer)
      }
      return
    }

    if (wordsArr[pointer + 1]) {
      el.innerHTML = wordsArr[pointer + 1]
    } else {
      this.onComplete()
      clearInterval(timer)
    }
  }

  setText(text) {
    this.init(text)
  }
  play() {
    const timer = setInterval(() => {
      this.printArr(timer)
    }, this.time)
    this.timer = timer
  }
  pause() {
    clearInterval(this.timer)
  }
  reverse() {
    this.pause()
    this.isReverse = true
    this.play()
  }
  resume() {
    this.pause()
    this.isReverse = false
    this.play()
  }
  stop() {
    clearInterval(this.timer)
  }
}

export default TypeWriter
