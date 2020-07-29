import { InlineText, InlineImage } from 'react-tinacms-inline'

const Hero = (props) => {
  return (
    <div className="hero" style={{ color: props.textColor }}>
      <div className="hero__overlay" style={{ backgroundColor: props.overlay }}>
      </div>
      <div className="hero__image" style={{opacity: 1 -(props.overlayOpacity / 100)}}>
      <InlineImage
        name="image"
        parse={(filename) => `/${filename}`}
        uploadDir={() => '/public'}
        previewSrc={formValues => {
          return formValues.frontmatter.blocks[props.index].image
        }}
        focusRing={false}
      />
      </div>
      
      <h1>
        <InlineText name="headline" />
      </h1>
      <h2><InlineText name="content" /></h2>
    </div>
  )
}

export default Hero