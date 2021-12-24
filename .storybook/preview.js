import { initialize, mswDecorator } from 'msw-storybook-addon'
import { addDecorator } from '@storybook/react'
import withAxiosDecorator from 'storybook-axios'
import axios from 'axios'
import StoryRouter from 'storybook-react-router'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClientDecorate = (Story) => {
  const [queryClient] = React.useState(
    new QueryClient({ defaultOptions: { queries: {refetchOnWindowFocus: false, retry: false } } })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <Story/>
    </QueryClientProvider>
  )
}

initialize()
addDecorator(mswDecorator)
addDecorator(withAxiosDecorator(axios))
addDecorator(StoryRouter)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [queryClientDecorate]

