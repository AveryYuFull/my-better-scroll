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
                    <input-option name='threshold (≥ 40)' :value='threshold'
                        :update:value='updateThreshold'></input-option>
                    <input-option name='stop (≥ 40)' :value='stop' class='last'
                        :update:value='updateStop'></input-option>
                </div>
            </div>
            <div class='group'>
                <switch-option name='上拉加载'></switch-option>
                <input-option name='threshold'></input-option>
                <input-option name='moreTxt' value='加载更多'></input-option>
                <input-option name='noMoreTxt' value='没有更多数据了' class='last'></input-option>
            </div>
            <div class='group'>
                <input-option name='startY' class='last'></input-option>
            </div>
        </div>
        <div slot='demo'>
            <scroll ref='scroll'
                :data='items' 
                :scrollbar='scrollbarObj'
                @pullingUp='onPullingUp'
                @pullingDown='onPullingDown'></scroll>
        </div>
        <div slot='methods'>
            <div class='group'>
                <input-option name='x' value='0'></input-option>
                <input-option name='y' value='-200'></input-option>
                <input-option name='time' value='700'></input-option>
                <select-option name='easing'></select-option>
                <button class='scrollBtn'>ScrollTo</button>
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

export default {    
    data () {
        return {
            scrollbar: true,
            scrollbarFade: true,
            pullDownRefresh: true,
            threshold: 90,
            stop: 40,
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
                threshold: this.threshold,
                stop: this.stop
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
                if (Math.random() >= 0) {
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
        updateThreshold (val) {
            this.threshold = val
        },
        updateStop (val) {
            this.stop = val
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
