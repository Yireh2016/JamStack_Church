import TypeWriter from './TypeWriter'

class MultiTypeWriter {
  constructor(input) {
    const { list, time, el, wait = 0 } = input
    this.list = list
    this.time = time
    this.el = el
    this.wait = wait

    this.init()
  }

  init() {
    const { time, el } = this
    let writers = []
    for (let i = 0; i < this.list.length; i++) {
      const text = this.list[i]
      writers.push(new TypeWriter({ time, el, text }))
    }
    this.writers = writers
    this.writers.forEach((writer, i) => {
      writer.onComplete = () => {
        setTimeout(() => {
          writer.reverse()
        }, this.wait)
      }
      writer.onReverseComplete = () => {
        const next = this.writers[i + 1] ? i + 1 : 0
        this.writers[next].play()
      }
    })
  }

  play() {
    this.writers[0].play()
  }

  stop() {
    this.writers.forEach(writer => {
      writer.stop()
    })
  }
}

export default MultiTypeWriter
