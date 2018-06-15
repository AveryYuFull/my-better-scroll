<template>
    <div ref='wrapper' class='list-wrapper'>
        <div class='scroll-content'>
            <slot name='list-content'>
                <ul class='list-content' ref='list'>
                    <li class='list-item' v-for='(item, index) in data' :key='index' v-text='item'></li>
                </ul>
            </slot>
            <div class='pull-upload' v-if='pullUpLoad'>
                <div class='txt' v-if='!isPullingUp' v-text='pullUpLoadTxt'>
                </div>
                <div v-else class='after-trigger'>
                    <loading></loading>
                </div>
            </div>
        </div>
        <slot>
            <div class='pull-down-wrapper' v-if='pullDownRefresh' :style='pullDownStyle'>
                <div class='before-trigger' v-if='beforePullDown'>
                    <span>before pull down</span>
                </div>
                <div class='after-trigger' v-else>
                    <div v-if='pulling' class='loading'>
                        <loading></loading>
                    </div>
                    <div class='rebounding' v-else>
                        <span v-text='pullDownRefreshTxt'></span>
                    </div>
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
import BetterScroll from 'better-scroll'
import Loading from '../../components/loading/loading'
import { getRect } from '../../commons/js/dom'
const COMPONENT_NAME = 'scroll'

export default {
    name: COMPONENT_NAME,
    props: {
        data: {
            type: Array,
            default: function () {
                return []
            }
        },
        freeScroll: {
            type: Boolean,
            default: false
        },
        click: {
            type: Boolean,
            default: true
        },
        dblclick: {
            type: null,
            default: false
        },
        probeType: {
            type: Number,
            default: 1
        },
        scrollbar: {
            type: null,
            default: true
        },
        pullUpLoad: {
            type: Boolean | Object,
            default: true
        },
        pullDownRefresh: {
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
            isPullingUp: false,
            pullUpDirty: true,
            beforePullDown: true,
            isPullingDown: false,
            pulling: false,
            isRebounding: false,
            pullDownStyle: ''
        }
    },
    created () {
        this.pullDownInitTop = -10
    },
    computed: {
        pullUpLoadTxt () {
            const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || this.$i18n.t('scrollComponent.defaultLoadTxtMore')
            const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || this.$i18n.t('scrollComponent.defaultLoadTxtNoMore')

            return this.pullUpDirty ? moreTxt : noMoreTxt
        },
        pullDownRefreshTxt () {
            return this.pullDownRefresh && this.pullDownRefresh.txt || this.$i18n.t('scrollComponent.defaultRefreshTxt')
        }
    },
    methods: {
        refresh () {
            this.scroll && this.scroll.refresh()
        },
        finishPullUp () {
            this.scroll && this.scroll.finishPullUp()
        },
        finishPullDown () {
            this.scroll && this.scroll.finishPullDown()
        },
        initScroll () {
            if (!this.$refs.wrapper) {
                return
            }
            
            if (this.$refs.list && (this.pullUpLoad)) {
                this.$refs.list.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
            }
            const options = {
                freeScroll: this.freeScroll,
                click: this.click,
                dblclick: this.dblclick,
                probeType: this.probeType,
                scrollbar: this.scrollbar,
                pullUpLoad: this.pullUpLoad,
                pullDownRefresh: this.pullDownRefresh
            }

            this.scroll = new BetterScroll(this.$refs.wrapper, options)

            if (this.pullUpLoad) {
                this.initPullUpLoad()
            }
            if (this.pullDownRefresh) {
                this.initPullDownRefresh()
            }
        },
        initPullDownRefresh () {
            this.scroll.on('pullingDown', (e) => {
                this.beforePullDown = false
                this.isPullingDown = true
                this.pulling = true
                this.$emit('pullingDown')
            })
        },
        initPullUpLoad () {
            this.scroll.on('pullingUp', (e) => {
                this.isPullingUp = true
                this.$emit('pullingUp')
            })
        },
        forceUpdate (dirty) {
            if (this.pullUpLoad && this.isPullingUp) {
                this.isPullingUp = false
                this.pullUpDirty = dirty
                this.finishPullUp()
            } else if (this.pullDonwRefresh && this.isPullingDown) {
                this.pulling = false
                this.beforeRebound().then(() => {
                    this.afterRebound()
                })
            }
            this.refresh()
        },
        beforeRebound () {
            const { stopTime } = this.pullDonwRefresh
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.isRebounding = true
                    this.isPullingDown = false
                    this.pullDownStyle = { top: this.pullDownInitTop }
                    resolve()
                }, stopTime)
            })
        },
        afterRebound () {
            this.isRebounding = false
            this.beforePullDown = true
            this.finishPullDown()
            this.refresh()
        }
    },
    mounted () {
        this.initScroll()
    },
    watch: {
        data (newVal) {
            setTimeout(() => {
                this.forceUpdate(true)
            }, this.refreshDelay)
        }
    },
    components: {
        'loading': Loading
    }
}
</script>

<style lang='less' scoped>
.list-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    .scroll-content {
        .list-content {
            .list-item {
                padding: .9375rem; /* 15/16 */
                text-align: left;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
        }
        .pull-upload {
            width: 100%;
            padding: 16px 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .pull-down-wrapper {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .before-trigger {
            margin-top: 10px;
        }
        .after-trigger {
            margin-top: 10px;
        }
    }
}
</style>
