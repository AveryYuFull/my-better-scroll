<template>
    <div class='feature'>
        <ul class='feature-list'>
            <li class='feature-item'>
                <div class='title'>{{ $t('features.userExperience.title') }}</div>
                <p :class='lang'>{{ $t('features.userExperience.desc') }}</p>
            </li>
            <li class='feature-item'>
                <div class='title'>{{ $t('features.application.title') }}</div>
                <p :class='lang'>{{ $t('features.application.desc') }}</p>
            </li>
            <li class='feature-item'>
                <div class='title'>{{ $t('features.dependence.title') }}</div>
                <p :class='lang'>{{ $t('features.dependence.desc') }}</p>
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
  }
}
</script>

<style lang="less" scoped>
.feature-list {
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .feature-item {
        padding: 0.8rem;
        margin-bottom: 1rem;
        text-align: left;
        .title {
            margin-bottom: 15px;
            color: #333;
            font-size: 24px;
            line-height: 28px;
            font-weight: normal;
        }
        p {
            line-height: 180%;
        }
    }
}
</style>
