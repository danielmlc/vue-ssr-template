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
        return store.dispatch('setList')
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