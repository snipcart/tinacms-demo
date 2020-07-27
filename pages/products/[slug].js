import React, { useEffect } from 'react'
import { getAllProductSlugs } from '../../helpers/products'
import { parseMdFile } from '../../helpers/markdown'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineText, InlineImage, InlineField } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'
import ReactMarkdown from 'react-markdown'
import SnipcartButton from '../../components/snipcartButton'
import InlineNumber from '../../components/inlineNumber'
import Head from 'next/head'
import { toMarkdownString } from 'next-tinacms-markdown'

const Product = ({ markdownFile }) => {
  const cms = useCMS()

  const [product, form] = useForm(
    {
      initialValues: markdownFile,
      id: markdownFile.fileName,
      label: markdownFile.fileName,
      fields: [{
        name: 'frontmatter.excerpt',
        description: 'This will be used for the product description in Snipcart',
        label: 'Excerpt',
        component: 'text',
      }],
      onSubmit: (formState) => {
        return cms.api.git.writeToDisk({
          fileRelativePath: markdownFile.fileRelativePath,
          content: toMarkdownString(formState),
        }).then(() => {
          cms.alerts.success('product saved!')
        })
      },
      reset() {
      },
    }
  )
  usePlugin(form)
  return (
    <main>
      <InlineForm form={form}>
        <Head>
          <title>Products | {product.frontmatter.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="grid">
          <div className="product">
            <div className="product__image">
              <InlineImage
                name="frontmatter.image"
                parse={(filename) => `/${filename}`}
                uploadDir={() => '/public'}
                previewSrc={formValues => formValues.frontmatter.image}
                focusRing={false}
              />
            </div>
            <div className="product__info">
              <div className="product__title">
                <h1><InlineText name="frontmatter.title" focusRing={false} /></h1>
                <span className="product__price">
                  <InlineNumber name="frontmatter.price" dir="rtl" focusRing={false} />$
                </span>
              </div>
              <InlineWysiwyg name="markdownBody" format="markdown" focusRing={false}>
                <ReactMarkdown source={markdownFile.markdownBody} />
              </InlineWysiwyg>
              <div className="product__footer">
                <SnipcartButton product={product} focusRing={false} />
              </div>
            </div>
          </div>
          <style jsx>
            {`
          .product{
            display: flex;
            flex-basis: 800px;
          }
          .product__image{
            flex-basis: 40%;
            flex-grow: 0;
            flex-shrink: 0;
          }
          h1{
            margin: 0;
          }
          .product__title{
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .product__price{
            font-size: 2em;
            width: 100px;
            display:flex;
          }
          .product__info{
            display:flex;
            flex-direction: column;
          }
          .product__footer{
            display: flex;
            justify-content: flex-end;
          }
        `}
          </style>
        </div>
      </InlineForm>
    </main>
  )
}
const getStaticProps = async ({ params }) => {
  return {
    props: {
      markdownFile: parseMdFile(`products/${params.slug}.md`),
    }
  }
}

const getStaticPaths = async () => {
  return {
    paths: getAllProductSlugs().map((slug) => ({
      params: {
        slug: slug.replace('.md', ''),
      },
    })),
    fallback: false,
  }
}

export default Product
export {
  getStaticProps,
  getStaticPaths
}