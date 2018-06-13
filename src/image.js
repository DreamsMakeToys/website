import { Component } from 'inferno'
import Styles from './image.css'

var IMAGE_RESOLUTION = 5

function View(props) {
  var size = null
  var content = null
  if (props.rect) {
    var { left, top, width } = props.rect
    var size = { width, height: width }
    var rect = { left, top, width, height: width }
    var imageClassName = `${Styles.image} ${
      props.isLoading ? Styles.hidden : ''
    }`
    var tiles = createTiles(props.name, IMAGE_RESOLUTION, props.onTileLoad)
    content = [
      <div className={Styles.spinner} style={rect}>
        <div class={Styles.laBallScaleMultiple}>
          <div />
          <div />
          <div />
        </div>
      </div>,
      <div className={imageClassName} style={rect}>
        {tiles}
      </div>
    ]
  }
  return (
    <div ref={props.attachRef} className={Styles.container} style={size}>
      {content}
    </div>
  )
}

function createTiles(name, resolution, onLoad) {
  return Array(resolution * resolution)
    .fill()
    .map((_, i) => {
      var row = parseInt(i / resolution)
      var column = i % resolution
      var key = `_${row}_${column}`
      var path = `https://raw.githubusercontent.com/DreamsMakeToys/website/master/images/${name}/${key}.png`
      var tileLoaded = () => onLoad(key)
      var attachOnLoad = node => {
        if (node) node.onload = tileLoaded
      }
      return <img ref={attachOnLoad} className={Styles.tile} src={path} />
    })
}

function applyBehavior(Image) {
  class Instance extends Component {
    constructor() {
      super()
      this.state = {
        rect: null,
        isLoading: true
      }
      this._attachRef = this._attachRef.bind(this)
      this._onTileLoad = this._onTileLoad.bind(this)
      this._loadingTiles = createTileKeys(IMAGE_RESOLUTION)
    }

    componentDidMount() {
      this._updateRect()
      window.addEventListener('resize', this._updateRect.bind(this))
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.name !== nextProps.name) {
        this.setState({ isLoading: true })
        this._loadingTiles = createTileKeys(IMAGE_RESOLUTION)
      }
    }

    render() {
      var { rect, isLoading } = this.state
      var { name, onLoad } = this.props
      return (
        <Image
          attachRef={this._attachRef}
          rect={rect}
          isLoading={isLoading}
          name={name}
          onLoad={onLoad}
          onTileLoad={this._onTileLoad}
        />
      )
    }

    _attachRef(node) {
      this._container = node
    }

    _updateRect() {
      this.setState({ rect: null }, () => {
        var rect = this._container.getBoundingClientRect()
        this.setState({ rect })
      })
    }

    _onTileLoad(key) {
      delete this._loadingTiles[key]
      var imageIsLoaded = Object.keys(this._loadingTiles).length === 0
      if (imageIsLoaded) {
        this.setState({ isLoading: false })
      }
    }
  }

  return Instance
}

function createTileKeys(resolution) {
  return Array(resolution * resolution)
    .fill()
    .reduce((keys, _, i) => {
      var row = parseInt(i / resolution)
      var column = i % resolution
      var key = `_${row}_${column}`
      keys[key] = true
      return keys
    }, {})
}

export default applyBehavior(View)
