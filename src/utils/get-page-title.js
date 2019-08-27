import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Element Project'

export default function getPageTile (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  } else {
    return `${title}`
  }
}
