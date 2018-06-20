<template>
  <div id='app'>
    <section class='page-header'>
      <nav class='nav'>
        <div class='left'>
          <router-link :to='lang' class='brand'>BetterScroll</router-link>
          <a class='tab' href='https://ustbhuangyi.github.io/better-scroll/doc/' v-text="$t('navigator.doc')" target='_blank'></a>
          <router-link :to='examplesPath' class='tab' v-text="$t('navigator.demo')"></router-link>
        </div>
        <div class='right'>
          <span class='tab language-wrapper' @click='toggleLanguage'>
            <span>Language</span>
            <ul class='options-wrapper' v-if='showLanguage'>
              <li @click="chooseLanguage('en')">English</li>
              <li @click="chooseLanguage('zh')">中文</li>
            </ul>
          </span>
          <a href='https://github.com/ustbhuangyi/better-scroll' target='_blank'>
            <img :src='githubIcon' alt='GitHub' />
          </a>
        </div>
      </nav>
      <h1 class='project-name'>BetterScroll</h1>
      <h2 class='project-tagline'>inspired by iscroll, and it has a better scroll perfermance</h2>
      <a href='https://ustbhuangyi.github.io/better-scroll/doc/' class='btn' v-text="$t('navigator.started')" target='_blank'></a>
      <router-link class='btn' v-text="$t('navigator.demo')" :to='examplesPath'></router-link>
    </section>
    <section class='main-content'>
      <transition name='fade'>
        <router-view class='view'></router-view>
      </transition>
    </section>
    <footer class='site-footer'>
      <span class='site-footer-owner'>
        <a href='https://github.com/ustbhuangyi/picker'>BetterScroll</a>
        is maintained by
        <a href='https://github.com/ustbhuangyi'>ustbhuangyi</a>
      </span>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showLanguage: false,
      githubIcon: require('./commons/images/github.svg')
    }
  },
  computed: {
    lang () {
      return '/' + this.$i18n.locale
    },
    examplesPath () {
      return '/examples/' + this.$i18n.locale
    }
  },
  methods: {
    toggleLanguage () {
      this.showLanguage = !this.showLanguage
    },
    chooseLanguage (lang) {
      if (this.$route.params.lang !== lang) {
        this.$i18n.locale = lang
        const newPath = this.$route.path.substring(0, -2) + lang
        this.$router.replace(newPath)
      }
    }
  },
  created () {
    this.$i18n.locale = this.$route.params.lang === 'en' ? 'en' : 'zh'
  }
}
</script>

<style lang='less' scoped>
@import './commons/less/variable.less';

.page-header {
  .nav {
    margin-bottom: 1.5rem;
    line-height: 1.6rem;
    display: flex;
    justify-content: space-between;
    @media screen and (min-width: 42rem) {
      margin-bottom: 4rem;
    }
    @media screen and (max-width: 42rem) {
      margin-bottom: 3rem;
    }
    .tab {
      padding-bottom: 5px;
      @media screen and (min-width: 42rem) {
        margin-right: 1rem;
      }
      @media screen and (max-width: 42rem) {
        margin-right: 0.4rem
      }
      &:hover {
        box-shadow: 0 3px 0 rgba(255, 255, 255, 0.5);
        cursor: pointer;
      }
    }
    .language-wrapper {
      position: relative;
      .options-wrapper {
        position: absolute;
        width: 100%;
        left: 0;
        top: 2rem;
        line-height: 2rem;
      }
    }
    a {
      color: @color-white;
      &:hover {
        text-decoration: none;
      }
    }

    .left {
      .brand {
        font-size: @fontsize-large-xx;
        @media screen and (min-width: 42rem) {
          margin-right: 3rem;
        }
        @media screen and (max-width: 42rem) {
          margin-right: 1rem;
        }
      }
    }
    .right {
      img {
        width: 1.2rem;
        position: relative;
        top: 0.2rem;
      }
    }
  }
  h1 {
    @media screen and (min-width: 42rem) {
      margin-bottom: 1rem;
    }
    @media screen and (max-width: 42rem) {
      margin-bottom: 0.5rem;
    }
  }
  .btn {
    min-width: 7rem;
  }
}
.main-content {
  .view {
    transition: all 0.4s ease-in-out;
    &.fade-enter-active, &.fade-leave-active {
      opacity: 0.01;
    }
    &.fade-enter, &.fade-leave {
      transition: opacity 0.4s;
    }
  }
}
.site-footer {
  text-align: center;
}
</style>
