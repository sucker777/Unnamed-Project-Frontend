
import './styles/quasar.scss'
import lang from 'quasar/lang/zh-TW.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import { Dialog, Notify } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Dialog,
    Notify
  },
  lang: lang
}