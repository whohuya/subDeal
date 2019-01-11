import '@babel/polyfill'
import 'url-polyfill'
import dva from 'dva'

import { reducer as formReducer } from 'redux-form'

import createHistory from 'history/createHashHistory'
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading'
import 'moment/locale/zh-cn'
import FastClick from 'fastclick'
import './rollbar'

import './index.less'

// define global Promise
import Bluebird from 'bluebird'

global.Promise = Bluebird

// 1. Initialize
const app = dva({
  extraReducers: {
    form: formReducer
  },
  history: createHistory()
})

// 2. Plugins
app.use(createLoading())

// 3. Register global model
app.model(require('./models/global').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')

FastClick.attach(document.body)

export default app._store  // eslint-disable-line
