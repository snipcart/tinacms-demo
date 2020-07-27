
const ProductCreatorPlugin = {
  __type: 'content-creator',
  name: 'Product',
  fields: [
    {
      name: 'frontmatter.title',
      label: 'Title',
      component: 'text',
      validation(title) {
        if (!title) return "Required"
      }
    },
    {
      name: 'frontmatter.price',
      label: 'Price',
      component: 'number',
    },
    {
      name: 'frontmatter.image',
      label: 'Image',
      component: 'image',
      parse: (filename) => `/${filename}`,
      uploadDir: () => '/public',
      previewSrc: formValues => formValues.frontmatter.image
    },
    {
      name: 'frontmatter.excerpt',
      description: 'This will be used for the product description in Snipcart',
      label: 'Excerpt',
      component: 'text',
    },
    {
      name: 'markdownBody',
      label: 'Description',
      component: 'markdown'
    }
  ],
  onSubmit(values, cms) {
    // Call functions that create the new blog post. For example:
    cms.apis.someBackend.createPost(values)
  },
}


export {
  ProductCreatorPlugin
}