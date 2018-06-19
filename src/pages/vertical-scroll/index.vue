<template>
<div>
    <optional-demo>
        <div slot='options'>
            <div class='group'>
                <switch-option :name="$t('normalScrollListPage.scrollbar')" :value='scrollbar'
                    @update:value='updateScrollbar'></switch-option>
                <switch-option v-if='scrollbar' name='fade' class='last' :value='scrollbarFade'
                    @update:value='updateScrollbarFade'></switch-option>
            </div>
            <div class='group'>
                <switch-option :name="$t('normalScrollListPage.pullDownRefresh')" :value='pullDownRefresh'
                    @update:value='updatePullDownRefresh'></switch-option>
                <div v-if='pullDownRefresh'>
                    <input-option name='threshold (≥ 40)' :value='pullDownRefreshThreshold'
                        :update:value='updatePullDownRefreshThreshold'></input-option>
                    <input-option name='stop (≥ 40)' :value='pullDownRefreshStop' class='last'
                        :update:value='updatePullDownRefreshStop'></input-option>
                </div>
            </div>
            <div class='group'>
                <switch-option :name="$t('normalScrollListPage.pullUpLoad')" :value='pullUpLoad'
                    @update:value='updatePullUpLoad'></switch-option>
                <div v-if='pullUpLoad'>
                    <input-option name='threshold' :value='pullUpLoadThreshold'
                        @update:value='updatePullUpLoadThreshold'></input-option>
                    <input-option name='moreTxt' :value='moreTxt'
                        @update:value='updateMoreTxt'></input-option>
                    <input-option name='noMoreTxt' :value='noMoreTxt' class='last'
                        @update:value='updateNoMoreTxt'></input-option>
                </div>
            </div>
            <div class='group'>
                <input-option name='startY' class='last' :value='startY'
                    @update:value='updateStartY'></input-option>
            </div>
        </div>
        <div slot='demo'>
            <scroll ref='scroll'
                :data='items' 
                :scrollbar='scrollbarObj'
                :pullDownRefresh='pullDownRefreshObj'
                :pullUpLoad='pullUpLoadObj'
                :startY='parseInt(startY)'
                @pullingUp='onPullingUp'
                @pullingDown='onPullingDown'></scroll>
        </div>
        <div slot='methods'>
            <div class='group'>
                <input-option name='x' :value='scrollToX'
                    @update:value='updateScrollToX'></input-option>
                <input-option name='y' :value='scrollToY'
                    @update:value='updateScrollToY'></input-option>
                <input-option name='time' :value='scrollToTime'
                    @update:value='updateScrollToTime'></input-option>
                <select-option name='easing' :value='scrollToEasing' :options='scrollToEasingOptions'
                    @update:value='updateScrollToEasing'></select-option>
                <button class='scrollBtn' @click='scrollTo'>ScrollTo</button>
            </div>
        </div>
    </optional-demo>
</div>
</template>

<script>
import Vue from 'vue'
import OptionalDemo from '../../components/optional-demo/optional-demo'
import SwitchOption from '../../components/switch-option/switch-option'
import InputOption from '../../components/input-option/input-option'
import SelectOption from '../../components/select-option/select-option'
import Scroll from '../../components/scroll/scroll'

import { ease } from '../../commons/js/ease'

export default {    
    data () {
        return {
            scrollbar: true,
            scrollbarFade: true,
            pullDownRefresh: true,
            pullDownRefreshThreshold: 90,
            pullDownRefreshStop: 40,
            pullUpLoad: true,
            pullUpLoadThreshold: 0,
            moreTxt: '加载更多',
            noMoreTxt: '没有更多数据了',
            startY: 0,
            scrollToX: 0,
            scrollToY: -200,
            scrollToTime: 700,
            scrollToEasing: 'bounce',
            scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
            items: [],
            itemIndex: 0
        }
    },
    computed: {
        scrollbarObj () {
            return this.scrollbar ? {fade: this.scrollbarFade} : false
        },
        pullDownRefreshObj () {
            return this.pullDownRefresh ? {
                threshold: this.pullDownRefreshThreshold,
                stop: this.pullDownRefreshStop
            } : false
        },
        pullUpLoadObj () {
            return this.pullUpLoad ? {
                threshold: this.pullUpLoadThreshold,
                txt: {
                    more: this.moreTxt,
                    noMore: this.noMoreTxt
                }
            } : false
        }
    },
    created () {
        for (let i = 0; i < 2; i++) {
            this.items.push(`${this.$i18n.t('normalScrollListPage.previousTxt')} ${ (++this.itemIndex) } ${ this.$i18n.t('normalScrollListPage.followingTxt') }`)
        }
    },
    methods: {
        onPullingUp () {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    // 如果有新的数据
                    for (let i = 0; i < 2; i++) {
                        this.items.push(`${ this.$i18n.t('normalScrollListPage.previousTxt') } ${ ++this.itemIndex } ${ this.$i18n.t('normalScrollListPage.followingTxt') }`)
                    }
                } else {
                    // 如果没有新的数据
                    this.$refs.scroll.forceUpdate()
                }
            }, 1000)
        },
        onPullingDown () {
            setTimeout(() => {
                if (Math.random() >= 0.5) {
                    // 如果有新的数据
                    this.items.unshift(`${ this.$i18n.t('normalScrollListPage.newDataTxt')}`)
                } else {
                    // 如果没有数据
                    this.$refs.scroll.forceUpdate()
                }
            }, 1000)
        },
        updateScrollbar (val) {
            this.scrollbar = val
        },
        updateScrollbarFade (val) {
            this.scrollbarFade = val
        },
        updatePullDownRefresh (val) {
            this.pullDownRefresh = val
        },
        updatePullDownRefreshThreshold (val) {
            this.pullDownRefreshThreshold = val
        },
        updatePullDownRefreshStop (val) {
            this.pullDownRefreshStop = val
        },
        updatePullUpLoad (val) {
            this.pullUpLoad = val
        },
        updatePullUpLoadThreshold (val) {
            this.pullUpLoadThreshold = val
        },
        updateMoreTxt (val) {
            this.moreTxt = val
        },
        updateNoMoreTxt (val) {
            this.noMoreTxt = val
        },
        updateStartY (val) {
            this.startY = val
        },
        updateScrollToX (val) {
            this.scrollToX = val
        },
        updateScrollToY (val) {
            this.scrollToY = val
        },
        updateScrollToTime (val) {
            this.scrollToTime = val
        },
        updateScrollToEasing (val) {
            this.scrollToEasing = val
        },
        scrollTo () {
            this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime, ease[this.scrollToEasing])
        },
        rebuildScroll () {
            Vue.nextTick(() => {
                this.$refs.scroll.destroy()
                this.$refs.scroll.initScroll()
            })
        }
    },
    watch: {
       scrollbarObj: {
           handler () {
               this.rebuildScroll()
           },
           deep: true
       },
       pullDownRefreshObj: {
           handler () {
               this.rebuildScroll()
           },
           deep: true
       },
       pullUpLoadObj: {
           handler () {
               this.rebuildScroll()
           },
           deep: true
       },
       startY () {
           this.rebuildScroll()
       }
    },
    components: {
        "optional-demo": OptionalDemo,
        'switch-option': SwitchOption,
        'input-option': InputOption,
        'select-option': SelectOption,
        'scroll': Scroll
    }    
}
</script>

<style lang='less' scoped>
.group {
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    .last {
        border-bottom: none;
    }
    .scrollBtn {
        height: 3.2rem;
        width: 100%;
        outline: none;
        border: none;
        background: #3b99fc;
        box-shadow: 0 0 0 1px #3b99fc;
        color: #FFF;
        font-weight: bold;
        border-bottom-left-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
        cursor: pointer;
    }
}
</style>
