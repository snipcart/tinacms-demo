import React from 'react'
import { useCMS } from 'tinacms'
import { InlineField } from 'react-tinacms-inline'
import { InputFocusWrapper } from 'react-tinacms-inline/dist/react-tinacms-inline.cjs.development'

const InlineNumber = ({
  name,
  className,
  focusRing = true,
  dir = 'ltr'
}) => {
  const cms = useCMS()

  return (
    <div>

      <InlineField name={name}>
        {({ input }) => {
          if (cms.enabled) {
            if (!focusRing) {
              return <input type="number" {...input} className={className} />
            }

            return (
              <InputFocusWrapper>
                <input type="number" {...input} className={className} />
              </InputFocusWrapper>
            )
          }
          return <>{input.value}</>
        }}

      </InlineField>
      <style jsx>
        {`
          input{
            width: 100%;
            display: block;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            box-sizing: border-box;
            color: inherit;
            letter-spacing: inherit;
            line-height: inherit;
            max-width: inherit;
            background-color: inherit;
            text-align: inherit;
            outline: none;
            resize: none;
            border: none;
            overflow: visible;
            position: relative;
            -ms-overflow-style: none;
            direction: ${dir};
            text-align: ${dir === 'ltr' ? 'left' : 'right'}
          }
        `}
      </style>
    </div>
  )
}

export default InlineNumber