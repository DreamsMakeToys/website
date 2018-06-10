import { Component } from 'inferno'
import './image.css'

function View({ name }) {
  var tiles = Array(25)
    .fill()
    .map((_, i) => {
      var row = parseInt(i / 5)
      var column = i % 5
      var path = `${name}/_${row}_${column}.png`
      return <img className="tile" src={path} />
    })
  return (
    <div className="container">
      <div className="image">{tiles}</div>
    </div>
  )
}

function applyBehavior(Image) {
  class Instance extends Component {
    constructor() {
      super()

      this.state = {
        tilesLoaded: false
      }
    }

    render() {
      return <Image {...this.props} />
    }
  }

  return Instance
}

export default applyBehavior(View)
