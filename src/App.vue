<template>
  <div id="app">
    <section class='page-header'>
      <nav class='nav'>
        <div class='left'>
          <router-link :to='lang' class='brand'>BetterScroll</router-link>
          <a class='tab' href='https://ustbhuangyi.github.io/better-scroll/doc/' target='_blank'>{{ $t('navigator.doc') }}</a>
          <router-link :to='examplesPath' class='tab'>{{ $t('navigator.demo') }}</router-link>
        </div>
        <div class='right'>
          <span class='tab language-wrapper'>
            <span @click='toogleLanguage'>Language</span>
            <ul class='option-wrapper' v-show='showLanguage'>
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
      <a class='btn' href='https://ustbhuangyi.github.io/better-scroll/doc/' target='_blank'>{{ $t('navigator.started') }}</a>
      <router-link :to='examplesPath' class='btn'>{{ $t('navigator.demo') }}</router-link>
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
        <a href='https://github.com/ustbhuangyi'>ustbhuangyi</a>.
      </span>
    </footer>
  </div>
</template>

<script>
import githubIcon from './commons/images/github.svg'

export default {
  name: 'App',
  data () {
    return {
      githubIcon: githubIcon,
      showLanguage: false
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
  created () {
    this.$i18n.locale = this.$route.params.lang === 'zh' ? 'zh' : 'en'
  },
  methods: {
    chooseLanguage (lang) {
      if (this.$route.params.lang !== lang) {
        this.$i18n.locale = lang
        let newPath = this.$route.path.substring(0, -2) + lang
        this.$router.replace(newPath)
      }
    },
    toogleLanguage () {
      this.showLanguage = !this.showLanguage
    }
  }
}
</script>

<style lang='less' scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-weight: 600;
  .page-header {
    background: linear-gradient(120deg, #E55D87, #5FC3E4);
    color: #fff;
    padding: 1.5rem 4rem 2rem 4rem;
    a {
      color: #fff;
      text-decoration: none;
    }
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
      .tab {
        margin-right: 1rem;
        &:hover {
          box-shadow: 0 3px 0 rgba(255, 255, 255, 0.5);
          cursor: pointer;
        }
      }
      .left {
        .brand {
          font-size: 20px;
          margin-right: 3rem;
        }
      }
      .right {
        .language-wrapper {
          position: relative;
          .option-wrapper {
            list-style-type: none;
            position: absolute;
            top: 1.875rem /* 30/16 */;
            left: .625rem /* 10/16 */;
            margin: 0;
            padding: 0;
            line-height: 30px;
          }
        }
        img {
          width: 1.2rem;
        }
      }
    }
    .project-name {
      font-size: 2.25rem;
      margin-bottom: 1rem;
      text-align: center;
    }
    .project-tagline {
      margin-bottom: 1rem;
      font-weight: normal;
      opacity: 0.7;
      font-size: 1.15rem;
    }
  }

  .main-content {
    padding: 2rem 2rem;
    font-size: 1.1rem;
  }

  .site-footer {
    font-size: 1rem;
    padding-top: 2rem;
    margin-top: 2rem;
    border-top: 1px solid #d7d7d7;
    .site-footer-owner {
      font-weight: bold;
    }
  }
}
</style>
