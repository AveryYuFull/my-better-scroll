<template>
    <div class='feature'>
        <ul class='feature-list'>
            <li class='feature-item' v-for='(item, index) in items' :key='index'>
                <div class='title'>{{ $t(item.title) }}</div>
                <p :class='lang'>{{ $t(item.desc) }}</p>
            </li>
        </ul>
    </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data () {
    return {}
  },
  computed: {
    lang () {
      return this.$i18n.locale
    }
  },
  created () {
      this.items = [{
          title: 'features.userExperience.title',
          desc: 'features.userExperience.desc'
      }, {
          title: 'features.application.title',
          desc: 'features.application.desc'
      }, {
          title: 'features.dependence.title',
          desc: 'features.dependence.desc'
      }]
  }
}
</script>

<style lang="less" scoped>
@import '../../commons/less/variable.less';

.feature-list {
    margin: 2rem 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .feature-item {
        padding: 0.8rem;
        margin-bottom: 1rem;
        text-align: left;
        @media screen and (min-width: 64rem) {
            flex: 0 1 27%;
        }
        @media screen and (max-width: 64rem) {
            flex: 0 1 100%;
        }
        .title {
            margin-bottom: 15px;
            color: #333;
            font-size: @fontsize-large-xxx;
            line-height: 28px;
            font-weight: normal;
        }
        p {
            line-height: 180%;
        }
    }
}
</style>
