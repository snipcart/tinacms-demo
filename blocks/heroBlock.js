import React from 'react'
import { BlocksControls } from 'react-tinacms-inline'
import Hero from '../components/hero'

const HeroBlock = (props) => {
  return (
    <BlocksControls index={props.index} focusRing={{ offset: 0 }} insetControls>
      <Hero {...props.data} index={props.index}/>
    </BlocksControls>
  )
}


const heroBlock = {
  Component: HeroBlock,
  template: {
    label: 'Hero',
    defaultItem: {
      headline: 'Headline',
      content: 'Content',
      image: '/images/hero.webp',
      overlay: '#000',
      overlayOpacity: 30,
      textColor: '#fff'
    },
    fields: [{
      name: 'textColor',
      label: 'Text color',
      component: 'color',
      widget: 'block',
      colors: ['#051e26', '#f2dfc6', '#cfdcc8', '#ebbbbb', '#8a1414'],
    },{
      name: 'overlay',
      label: 'Overlay',
      component: 'color',
      widget: 'block',
      colors: ['#051e26', '#f2dfc6', '#cfdcc8', '#ebbbbb', '#8a1414'],
    },{
      name: 'overlayOpacity',
      label: 'Overlay opacity',
      component: 'number',
      widget: 'block'
    }]
  }
}

export default heroBlock