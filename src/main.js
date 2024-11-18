import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const app = createApp(App)

.component('font-awesome-icon', FontAwesomeIcon)
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faWeight } from '@fortawesome/free-solid-svg-icons'
import { faRuler } from '@fortawesome/free-solid-svg-icons'
import { faBaby } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faBabyCarriage } from '@fortawesome/free-solid-svg-icons'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { faBowlFood } from '@fortawesome/free-solid-svg-icons'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { faDrumstickBite } from '@fortawesome/free-solid-svg-icons'
import { faGlassWhiskey } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUserSecret,faWeight,faRuler,faBaby,faCalendar,faBabyCarriage,faNoteSticky,faQuestion,faSignOut,faBowlFood,faClipboard,faDrumstickBite,faGlassWhiskey,faChartLine)
app.use(createPinia())
app.use(router)

app.mount('#app')
