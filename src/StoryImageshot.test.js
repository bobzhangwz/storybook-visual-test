import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

const getMatchOptions = () => {
  return {
    comparisonMehtod: 'pixelmatch',
    customDiffConfig: {
      threshold: 0.01
    },
    failureThreshhold: 0.03,
    failureThreshholdType: 'percent'
  }
}

const beforeScreenshot = (page, { context: {kind, story}, url}) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500)
  })
}

initStoryshots({
  suite: 'image storyshots',
  test: imageSnapshot({
    storybookUrl: 'http://localhost:6006',
    getMatchOptions,
    beforeScreenshot
  })
})
