import Head from 'next/head'
import { parseMdFile } from '../helpers/markdown'
import ReactMarkdown from 'react-markdown'
import { getAllProducts } from '../helpers/products'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineText, InlineBlocks } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'
import ProductCard from '../components/productCard'
import ProductList from '../components/productList'
import createProductBlock from '../blocks/productListBlock'
import { useMemo } from 'react'
import heroBlock from '../blocks/heroBlock'
import { toMarkdownString } from 'next-tinacms-markdown'

const Home = ({ markdownFile, products }) => {
  const blocks = useMemo(() => {
    return {
      // productList: createProductBlock(products),
      hero: heroBlock
    }
  }, [products])
  const cms = useCMS()
  const [_, form] = useForm({
    initialValues: markdownFile,
    id: markdownFile.fileName,
    label: markdownFile.fileName,
    fields: [],
    onSubmit: (formState) => {
      toMarkdownString(formState)
      return cms.api.git.writeToDisk({
        fileRelativePath: markdownFile.fileRelativePath,
        content: toMarkdownString(formState),
      }).then(() => {
        cms.alerts.success('Home page saved!')
      })
    },
  })

  usePlugin(form)

  return (
    <InlineForm form={form}>
      <Head>
        <title>Products</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InlineBlocks name="frontmatter.blocks" blocks={blocks} />
      <ProductList products={products}/>
    </InlineForm>
  )
}

const getStaticProps = async () => {
  return {
    props: {
      markdownFile: parseMdFile('pages/home.md'),
      products: getAllProducts()
    }
  }
}

export default Home
export {
  getStaticProps
}