<template>
  <div>
    <p v-for="(i,index) in datalist" :key="index">
        {{i.v_Col1}}
    </p>
  </div>
</template>

<script >
const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)
export default {
    data(){
        return {
            datalist:[]
        }
    },
    computed:{

    },
    asyncData ({ store }) {
        const options={
            url:'/api/services/app/ssingletable01/getMainPageList',
            method:'post',
            data:{
                draw:1,
                maxResultCount:15,
                queryConditionItem:[
                ],
                skipCount:0,
                sorting:''
            },
        }
         store.dispatch('setResult',options)
    },
    title: camelize('home'),
    created(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>