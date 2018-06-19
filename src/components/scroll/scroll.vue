<template>
  <div class='list-wrapper' ref='wrapper'>
      <div class='scroll-content'>
          <slot>
              <ul ref='list' class='list-content'>
                  <li class='list-item' v-for='(item, index) in data' :key='index' v-text='item'></li>
              </ul>
          </slot>
          <slot name='pullUpLoad'>
              <div class='pullUpLoad-wrapper' v-if='pullUpLoad'>
                  <div class='before-trigger' v-if='!isPullingUpLoad'>
                      <span v-text='pullUpLoadTxt'></span>
                  </div>
                  <div class='after-trigger' v-else>
                      <loading></loading>
                  </div>
              </div>
          </slot>
      </div>
      <slot name='pullDownRefresh'>
          <div class='pullDownRefresh-wrapper' v-if='pullDownRefresh' :style='pullDownRefreshStyle'>
              <div class='before-trigger' v-if='beforePullDown'>
                  <span>before pull down</span>
              </div>
              <div v-else class='after-trigger'>
                  <div v-if='pullingDown'>
                      <loading></loading>
                  </div>
                  <div v-else>
                      <span v-text='pullDownRefreshTxt'></span>
                  </div>
              </div>
          </div>
      </slot>
  </div>
</template>

<script>
const COMPONENT_NAME = 'scroll'
import BetterScroll from 'better-scroll'
import Loading from '../../components/loading/loading'
import { getRect } from '../../commons/js/dom'

export default {
    name: COMPONENT_NAME,
    props: {
        data: {
            type: Array,
            default: function () {
                return []
            }
        },
        probeType: {
            type: Number,
            default: 1
        },
        startY: {
            type: Number,
            default: 0
        },
        scrollX: {
            type: Boolean,
            default: false
        },
        scrollY: {
            type: Boolean,
            default: true
        },
        freeScroll: {
            type: Boolean,
            default: false
        },
        click: {
            type: Boolean,
            default: false
        },
        scrollbar: {
            type: Boolean | Object,
            default: true
        },
        pullDownRefresh: {
            type: null,
            default: function () {
                return {
                    stop: 40,
                    threshold: 90
                }
            }
        },
        pullUpLoad: {
            type: Boolean | Object,
            default: true
        },
        refreshDelay: {
            type: Number,
            default: 20
        }
    },
    data () {
        return {
            isPullingUpLoad: false,
            beforePullDown: true,
            pullingDown: false,
            isPullingDown: false,
            isRebounding: false,
            pullUpDirty: true,
            pullDownRefreshStyle: ''
        }
    },
    computed: {
        pullUpLoadTxt () {
            const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || this.$i18n.t('scrollComponent.defaultLoadTxtMore')
            const noMoreTxt =  this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || this.$i18n.t('scrollComponent.defaultLoadTxtNoMore')

            return this.pullUpDirty ? moreTxt : noMoreTxt
        },
        pullDownRefreshTxt () {
            return this.pullDownRefresh && this.pullDownRefresh.txt || this.$i18n.t('scrollComponent.defaultRefreshTxt')
        }
    },
    methods: {
        initScroll () {
            if (!this.$refs.wrapper) {
                return
            }
            if (this.$refs.list && (this.pullDownRefresh || this.pullUpLoad)) {
                this.$refs.list.style.minHeight = `${ getRect(this.$refs.wrapper).height + 1 }px`
            }
            const options = {
                probeType: this.probeType,
                startY: this.startY,
                scrollX: this.scrollX,
                scrollY: this.scrollY,
                freeScroll: this.freeScroll,
                click: this.click,
                scrollbar: this.scrollbar,
                pullDownRefresh: this.pullDownRefresh,
                pullUpLoad: this.pullUpLoad
            }
            console.log('options: ', options)
            this.scroll = new BetterScroll(this.$refs.wrapper, options)

            if (this.pullDownRefresh) {
                this.initPullDownRefresh()
            }
            if (this.pullUpLoad) {
                this.initPullUpLoad()
            }
        },
        initPullDownRefresh () {
            this.scroll.on('pullingDown', () => {
                this.beforePullDown = false
                this.isPullingDown = true
                this.pullingDown = true
                this.$emit('pullingDown')
            })

            this.scroll.on('scroll', (pos) => {
                if (this.beforePullDown) {
                    this.pullDownRefreshStyle = `top: ${Math.min(10, pos.y + this.pullDownInitTop)}px`
                }

                if (this.isRebounding) {
                    this.pullDownRefreshStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
                }
            })
        },
        initPullUpLoad () {
            this.scroll.on('pullingUp', () => {
                this.isPullingUpLoad = true
                this.$emit('pullingUp')
            })
        },
        forceUpdate (dirty) {
            if (this.pullDownRefresh && this.isPullingDown) {
                this.pullingDown = false
                this.beforeReboundance().then(() => {
                    this.afterReboundance()
                })
            } else if (this.pullUpLoad && this.isPullingUpLoad) {
                this.isPullingUpLoad = false
                this.pullUpDirty = dirty
                this.finishPullUp()
                this.refresh()
            } else {
                this.refresh()
            }
        },
        beforeReboundance () {
            const { stopTime = 600 } = this.pullDownRefresh            
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.isRebounding = true
                    this.isPullingDown = false
                    this.finishPullDown()
                    resolve()
                }, stopTime)
            })
        },
        afterReboundance () {
            setTimeout(() => {
                this.isRebounding = false
                this.beforePullDown = true
                this.pullDownRefreshStyle = `top:${this.pullDownInitTop}px`
                this.refresh()
            }, this.scroll.options.bounceTime)
        },
        refresh () {
            this.scroll && this.scroll.refresh()
        },
        finishPullUp () {
            this.scroll && this.scroll.finishPullUp()
        },
        finishPullDown () {
            this.scroll && this.scroll.finishPullDown()
        },
        destroy () {
            this.scroll && this.scroll.destroy()
        },
        scrollTo () {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        }
    },
    created () {
        this.pullDownInitTop = -50
    },
    mounted () {
        this.initScroll()
    },
    beforeDestroy () {
        this.destroy()
    },
    watch: {
        data (newVal) {
            setTimeout(() => {
                this.forceUpdate(true)
            }, this.refreshDelay)
        }
    },
    components: {
        Loading
    }
}
</script>

<style lang="less">
  .list-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    .list-content {
      position: relative;
      z-index: 10;
      background: #fff;
      .list-item {
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        padding-left: 20px;
        border-bottom: 1px solid #e5e5e5;
        text-align: left;
      }
    }
  }

  .pullDownRefresh-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
    .after-trigger {
      margin-top: 10px;
    }
  }

  .pullUpLoad-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }
</style>
