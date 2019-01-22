<template>
  <div>
    <p v-for="(i,index) in datalist" :key="index">
        {{i.v_Col1}}
    </p>
  </div>
</template>

<script >
import base from '../../mixns/base.js';
import utils from '../../common/js/utils.js';
const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)
export default {
    mixins:[base],
    data(){
        return {
            datalist:[]
        }
    },
    computed:{

    },
    asyncData ({ store }) {
        const options=utils.getContentByNode('服务电话')
        store.dispatch('setResult',options)
    },
    title: camelize('首页'),
    mounted(){
        console.log(this.$store.state)
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>