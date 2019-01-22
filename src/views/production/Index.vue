<template>
  <div>
    产品与服务
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
        
    },
    title: camelize('产品与服务'),
    mounted(){
     
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>