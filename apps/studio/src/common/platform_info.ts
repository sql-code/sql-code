import * as path from 'path'
import * as electron from 'electron'

const isRenderer = (process && process.type === 'renderer')
const app = isRenderer ? require('@electron/remote').app : electron.app
const p = isRenderer ? require('@electron/remote').process : process
const platform = p.env.OS_OVERRIDE ? p.env.OS_OVERRIDE : p.platform
const testMode = p.env.TEST_MODE ? true : false
const isDevEnv = !(app && app.isPackaged);
const isWindows = platform === 'win32'
const isMac = platform === 'darwin'
const easyPlatform = isWindows ? 'windows' : (isMac ? 'mac' : 'linux')
let windowPrefersDarkMode = false
if (isRenderer) {
  windowPrefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
}
const updatesDisabled = !!p.env.SQLCODE_DISABLE_UPDATES

let userDirectory =  testMode ? './tmp' : app.getPath("userData")
const downloadsDirectory = testMode ? './tmp' : app.getPath('downloads')
const homeDirectory = testMode ? './tmp' : app.getPath('home')
if (p.env.PORTABLE_EXECUTABLE_DIR) {
  userDirectory = path.join(p.env.PORTABLE_EXECUTABLE_DIR, 'sqlcode_data')
}
const platformInfo = {
  isWindows, isMac,
  isLinux: !isWindows && !isMac,
  isSnap: p.env.ELECTRON_SNAP,
  isPortable: isWindows && p.env.PORTABLE_EXECUTABLE_DIR,
  isDevelopment: isDevEnv,
  isAppImage: p.env.DESKTOPINTEGRATION === 'AppImageLauncher',
  sshAuthSock: p.env.SSH_AUTH_SOCK,
  environment: process.env.NODE_ENV,
  env: {
    development: isDevEnv,
    test: testMode,
    production: !isDevEnv && !testMode && !p.env.WEBPACK_DEV_SERVER_URL
  },
  debugEnabled: !!process.env.DEBUG,
  platform: easyPlatform,
  darkMode: testMode ? true : (isRenderer ? require('@electron/remote').nativeTheme : electron.nativeTheme).shouldUseDarkColors || windowPrefersDarkMode,
  userDirectory,
  downloadsDirectory,
  homeDirectory,
  testMode,
  appDbPath: path.join(userDirectory, isDevEnv ? 'app-dev.db' : 'app.db'),
  updatesDisabled,
  appVersion: testMode ? 'test-mode' : app.getVersion(),
  cloudUrl: isDevEnv ? 'https://staging.beekeeperstudio.io' : 'https://app.beekeeperstudio.io'
  // cloudUrl: isDevEnv ? 'http://localhost:3000' : 'https://app.beekeeperstudio.io'
}

export default platformInfo
