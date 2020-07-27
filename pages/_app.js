import React, { useMemo } from 'react'
import { TinaProvider, TinaCMS } from 'tinacms'
import '../styles/styles.css'
import { MarkdownFieldPlugin } from 'react-tinacms-editor'
import { GitClient, GitMediaStore } from '@tinacms/git-client'
import { toMarkdownString } from 'next-tinacms-markdown'
import slugify from 'slugify'
import Nav from '../components/nav'
import Head from 'next/head'
const ProductCreatorPlugin = {
  __type: 'content-creator',
  name: 'Product',
  fields: [
    {
      name: 'frontmatter.title',
      label: 'Title',
      component: 'text',
      validate(title) {
        if (!title) return "Required"
      }
    },
    {
      name: 'frontmatter.price',
      label: 'Price',
      component: 'number',
      validate(price) {
        if (price == null) return "Required"
      }
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
  onSubmit(formValues, cms) {
    const fileRelativePath = `products/${slugify(formValues.frontmatter.title, '_')}.md`
    return cms.api.git.writeToDisk({
      fileRelativePath: fileRelativePath,
      content: toMarkdownString(formValues),
    }).then(() => {
      cms.alerts.success('product created! Reload page to see new product')
    })
  },
}


const App = ({ Component, pageProps }) => {

  const gitClient = useMemo(() => {
    return new GitClient(`/___tina`)
  }, [])
  const cms = useMemo(() => {
    return new TinaCMS({
      enabled: process.env.NODE_ENV !== "production",
      sidebar: true,
      toolbar: { hidden: false },
      plugins: [MarkdownFieldPlugin, ProductCreatorPlugin],
      apis: {
        git: gitClient,
      },
      media: {
        store: new GitMediaStore(gitClient),
      },
    })
  }, [])

  return (
    <TinaProvider cms={cms}>
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.18/default/snipcart.css" />
        <script src="https://cdn.snipcart.com/themes/v3.0.18/default/snipcart.js"></script>
      </Head>
      <div className="container">
          <Nav />
        <Component {...pageProps} />
        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
          </a>
        </footer>
      </div>
      <div hidden id="snipcart" data-api-key={process.env.SNIP_API_KEY}></div>
    </TinaProvider>
  )
}

export default App