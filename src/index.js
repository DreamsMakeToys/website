import { render, Component } from 'inferno'
import Image from './image'
import './index.css'

function createGallery() {
  return (
    <div className="page">
      <Image name="CandyChain" />
      <Image name="TryWe" />
      <Image name="TryThee" />
      <Image name="TryMe" />
      <Image name="LiteThrewYou" />
      <Image name="LeadTwoWater" />
      <Image name="SirComeVent" />
      <Image name="SonSetRise" />
    </div>
  )
}

var root = document.createElement('div')
document.body.appendChild(root)
var gallery = createGallery()
render(gallery, root)
