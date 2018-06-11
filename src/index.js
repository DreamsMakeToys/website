import { render, Component } from 'inferno'
import Page from './page'

var gallery = <Page />
var root = document.createElement('div')
document.body.appendChild(root)
render(gallery, root)
