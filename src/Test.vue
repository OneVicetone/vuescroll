<template>
  <VueScroll 
    loadingText="正在努力刷新刷新～" 
    postUrl='https://api.asilu.com/geo/' 
    loadingIcon='http://img.lanrentuku.com/img/allimg/1212/5-121204194027-50.gif'
    reload
    @getFetchRes='getFetchRes'
  >
      <h1>{{h1}}</h1>
  </VueScroll>
</template>

<script>
import VueScroll from './VueScroll/index'
export default {
    components:{
        VueScroll
    },
    data(){
        return {
            h1:'hah'
        }
    },
    methods:{
        getFetchRes(data){
            this.h1 = data.address
        }
    }
}
</script>

<style>

</style>template