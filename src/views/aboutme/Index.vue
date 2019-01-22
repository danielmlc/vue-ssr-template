<template>
  <div>
    我只是个模板
  </div>
</template>

<script >
const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)
export default {
    data(){
        return {

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
        return store.dispatch('setResult',options)
    },
    title: camelize('home'),
    mounted(){
        console.log(this.$store)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>