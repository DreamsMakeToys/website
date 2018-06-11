import { Component } from 'inferno'
import Styles from './page.css'

var IMAGES = [
  {
    name: 'CandyChain',
    group: 'CandyLane'
  },
  {
    name: 'TryWe',
    group: 'TryAll'
  },
  {
    name: 'TryThee',
    group: 'TryAll'
  },
  {
    name: 'TryMe',
    group: 'TryAll'
  },
  {
    name: 'LiteThrewYou',
    group: 'REM'
  },
  {
    name: 'LeadTwoWater',
    group: 'REM'
  },
  {
    name: 'SirComeVent',
    group: 'Limes'
  },
  {
    name: 'SonSetRise',
    group: 'Limes'
  }
]

function View(props) {
  return (
    <div className={Styles.container}>
      <div className={Styles.header}>DreamsMakeToys</div>
      <Image
        name={props.name}
        isLoading={props.isLoading}
        onTileLoad={props.onTileLoad}
      />
      <Info name={props.name} group={props.group} />
      <Navbar
        selectedIndex={props.selectedIndex}
        previous={props.previous}
        next={props.next}
      />
    </div>
  )
}

function Image(props) {
  var tiles = createTiles(props.name, 5, props.isLoading, props.onTileLoad)
  return (
    <div className={Styles.imageContainer}>
      <div className={Styles.image}>{tiles}</div>
      {/* <div className={Styles.loader} /> */}
    </div>
  )
}

function createTiles(name, resolution, isLoading, onLoad) {
  return Array(resolution * resolution)
    .fill()
    .map((_, i) => {
      var className = `${Styles.tile} ${isLoading ? Styles.loading : ''}`
      var row = parseInt(i / resolution)
      var column = i % resolution
      var key = `_${row}_${column}`
      var path = `${name}/${key}.png`
      var imageLoaded = () => onLoad(key)
      var attachOnLoad = node => (node.onload = imageLoaded)
      return <img className={className} src={path} ref={attachOnLoad} />
    })
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

function Info(props) {
  return (
    <div className={Styles.info}>
      <div className={Styles.label}>{props.name}</div>
      <div className={Styles.label}>{props.group}</div>
    </div>
  )
}

function Navbar(props) {
  var locator = Array(IMAGES.length)
    .fill()
    .map((_, i) => <div>{props.selectedIndex == i ? 1 : 0}</div>)
  return (
    <div className={Styles.navbar}>
      <div className={Styles.button} onClick={props.previous}>
        {'<'}
      </div>
      <div className={Styles.center}>{locator}</div>
      <div className={Styles.button} onClick={props.next}>
        {'>'}
      </div>
    </div>
  )
}

function applyBehavior(Page) {
  class Instance extends Component {
    constructor() {
      super()
      this.loadingTiles = createTileKeys(5)
      this.state = {
        selectedIndex: 0,
        loading: true
      }
      this._next = this._next.bind(this)
      this._prev = this._prev.bind(this)
      this._onTileLoad = this._onTileLoad.bind(this)
    }

    render() {
      var { selectedIndex, loading } = this.state
      var { name, group } = IMAGES[selectedIndex]
      return (
        <Page
          name={name}
          isLoading={loading}
          onTileLoad={this._onTileLoad}
          group={group}
          selectedIndex={selectedIndex}
          next={this._next}
          previous={this._prev}
        />
      )
    }

    _next() {
      var selectedIndex = this.state.selectedIndex + 1
      selectedIndex = selectedIndex % IMAGES.length
      this.loadingTiles = createTileKeys(5)
      this.setState({ selectedIndex, loading: true })
    }

    _prev() {
      var selectedIndex = this.state.selectedIndex + (IMAGES.length - 1)
      selectedIndex = selectedIndex % IMAGES.length
      this.loadingTiles = createTileKeys(5)
      this.setState({ selectedIndex, loading: true })
    }

    _onTileLoad(key) {
      delete this.loadingTiles[key]
      var imageIsLoaded = Object.keys(this.loadingTiles).length == 0
      if (imageIsLoaded) {
        this.setState({ loading: false })
      }
    }
  }

  return Instance
}

export default applyBehavior(View)
