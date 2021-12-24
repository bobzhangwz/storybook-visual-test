import initStoryshots, { Stories2SnapsConverter } from '@storybook/addon-storyshots'
import { render } from '@testing-library/react'
import { setupServer } from 'msw/node'

const server = setupServer()

const runStoryShotTest = ({ story, context, done }) => {
  const converter = new Stories2SnapsConverter()
  converter.getSnapshotFileName(context)
  const msw = story.parameters?.msw || []
  server.use(...msw)

  const StoryElement = () => <div> {story.render()} </div>
  const tree = render(<StoryElement />)
  const waitTime = 400
  setTimeout(() => done(), waitTime)
}

runStoryShotTest.beforeAll = () => server.listen()
runStoryShotTest.afterAll = () => server.close()
runStoryShotTest.afterEach = () => server.resetHandlers()

initStoryshots({asyncJest: true, test: runStoryShotTest})

