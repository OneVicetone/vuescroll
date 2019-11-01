import VueScroll from './src/VueScroll.vue'


VueScroll.install = function(Vue){
    Vue.component(VueScroll.name,VueScroll)
}

export default VueScroll