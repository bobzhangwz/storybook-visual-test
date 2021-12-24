import { setupServer } from 'msw/lib/types/node'

export const setupMockServer = () => {
  const server = setupServer()
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  const mockStoryBookResponse = (component, meta) => {
    const mswHandler = component.parameters?.msw || meta.parameters?.msw || []
    server.use(...mswHandler)
  }

  return { server, mockStoryBookResponse }
}

// import {composeStory} from '@storybook/testing-react'
// import Meta, {Story} from './xxx.stories'
// const { mockStoryBookResponse } = setupMockServer()
// const sut = composeStory(Story, Meta)
// mockStoryBookResponse(Story, Meta)
// render(<TestComponent/>)
