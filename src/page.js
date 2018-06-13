import { Component } from 'inferno'
import Image from './image'
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
  var locator = Array(IMAGES.length)
    .fill()
    .reduce(
      (result, _, i) => (props.index === i ? result + '1' : result + '0'),
      ''
    )
  return (
    <div className={Styles.root}>
      <div className={Styles.header}>DreamsMakeToys</div>
      <div className={Styles.image}>
        <Image name={props.name} />
      </div>
      <div className={Styles.info}>
        <div className={Styles.label}>{props.name}</div>
        <div className={Styles.label}>{props.group}</div>
      </div>
      <div className={Styles.footer}>
        <div className={Styles.button} onClick={props.previous}>
          {'<'}
        </div>
        <div className={Styles.center}>{locator}</div>
        <div className={Styles.button} onClick={props.next}>
          {'>'}
        </div>
      </div>
    </div>
  )
}

function applyBehavior(Page) {
  class Instance extends Component {
    constructor() {
      super()
      this.state = {
        index: 0
      }
      this._previous = this._previous.bind(this)
      this._next = this._next.bind(this)
    }

    render() {
      var { index } = this.state
      var { name, group } = IMAGES[index]
      return (
        <Page
          name={name}
          group={group}
          index={index}
          previous={this._previous}
          next={this._next}
        />
      )
    }

    _previous() {
      var { index } = this.state
      var nextIndex = (index + 7) % IMAGES.length
      this.setState({ index: nextIndex })
    }

    _next() {
      var { index } = this.state
      var nextIndex = (index + 1) % IMAGES.length
      this.setState({ index: nextIndex })
    }
  }

  return Instance
}

export default applyBehavior(View)
