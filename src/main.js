import Vue from 'vue'
import Titre from './AppTitre.vue'
import GoogleMap from './GoogleMapLoader.vue'

Vue.config.productionTip = false


new Vue({el:'#app', render:h => h(Titre)})
new Vue({el:'#carteGoogle', render:h => h(GoogleMap)})
