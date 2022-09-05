<template>
  <span> {{ msg }} </span>
</template>

<script>
export default {
  name: 'HelloWold',
  components: {},
  props: {},
  data () {
    return {
      msg: 'HelloWold'
    }
  },
  created () { },
  mounted () { },
  activated () { },
  updated () { },
  beforeRouteUpdate () { },
  methods: {},
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
span {
  height: 200px;
  background: #f90;
}
</style>
