<template>
    <div class='index-list'>
        <scroll :data='data' ref='indexList'
            :listen-scroll='listenScroll'
            :probe-type='probeType'
            @scroll='scroll'>
            <div class='index-list-content'>
                <div class='index-list-title' v-if='title' v-text='title'></div>
                <ul ref='groups'>
                    <li v-for='(group, index) in data' ref='listGroup' :key='index'>
                        <h2 class='index-list-anchor' v-text='group.name'></h2>
                        <ul>
                            <li v-for='(item, index) in group.items' class='index-list-item border-bottom-1px' v-text='item.name' :key='index'
                                @touchstart='addActiveCls'
                                @touchend='removeActiveCls'></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </scroll>
        <div class='index-list-nav'
            @touchstart='onShortcutTouchStart'
            @touchmove.stop.prevent='onShortcutTouchMove'>
            <ul>
                <li v-for='(item, index) in shortcutList' :key='index' v-text='item'
                    :class="{'active': index === currentIndex}"
                    :data-index='index'></li>
            </ul>
        </div>
        <div class='index-list-fixed' v-text='fixedTitle' v-show='fixedTitle'></div>
    </div>
</template>

<script>
const COMPONENT_NAME = 'index-list'
import Scroll from '../scroll/scroll'
import {
    addClass,
    removeClass,
    getData
} from '../../commons/js/dom'

const TITLE_HEIGHT = 50
const ANCHOR_HEIGHT = 18

const ACTIVE_CLS = 'index-list-item_active'

export default {
    name: COMPONENT_NAME,
    props: {
        data: {
            type: Array,
            default: function () {
                return []
            }
        },
        title: {
            type: String,
            default: 'Current City: Beijing'
        }
    },
    data () {
        return {
            scrollY: -1,
            currentIndex: 0
        }
    },
    computed: {
        shortcutList () {
            return this.data.map((group) => {
                return group.name.substr(0, 1)
            })
        },
        fixedTitle () {
            if (this.scrollY > -TITLE_HEIGHT) {
                return
            }
            return this.data[this.currentIndex] ? this.data[this.currentIndex].name : ''
        }
    },
    methods: {
        addActiveCls (e) {
            addClass(e.currentTarget, ACTIVE_CLS)
        },
        removeActiveCls (e) {
            removeClass(e.currentTarget, ACTIVE_CLS)
        },
        onShortcutTouchStart (e) {
            this.touches.y1 = e.touches[0].pageY
            this.touches.startAnchorIndex = getData(e.target, 'index')
            this.scrollToElement(this.touches.startAnchorIndex)
        },
        onShortcutTouchMove (e) {
            let touch = e.touches[0]
            this.touches.y2 = touch.pageY
            let delta = (this.touches.y2 - this.touches.y1) / ANCHOR_HEIGHT | 0
            this.touches.endAnchorIndex  = parseInt(this.touches.startAnchorIndex) + delta
            this.scrollToElement(this.touches.endAnchorIndex)
        },
        scrollToElement (index) {
            if (index < 0) {
                index = 0
            } else if (index > this.listHeight.length - 2) {
                index = this.listHeight.length - 2
            }
            this.$refs.indexList.scrollToElement(this.$refs.listGroup[index], 0)
            this.scrollY = this.$refs.indexList.scroll.y
        },
        calculateHeight () {
            const list = this.$refs.listGroup
            if (!list) {
                return
            }
            this.listHeight = []
            let height = TITLE_HEIGHT
            this.listHeight.push(height)
            for (let i = 0; i < list.length; i++) {
                height += list[i].clientHeight
                this.listHeight.push(height)
            }
        },
        scroll (pos) {
            this.scrollY = pos.y
        }
    },
    created () {
        this.touches = {}
        this.listHeight = []
        this.listenScroll = true
        this.probeType = 3
    },
    mounted () {
        setTimeout(() => {
            this.calculateHeight()
        }, 20)
    },
    watch: {
        data () {
            setTimeout(() => {
                this.calculateHeight()
            }, 20)
        },
        scrollY (newVal) {
            const listHeight = this.listHeight
            // 如果在顶部
            if (-newVal < TITLE_HEIGHT) {
                this.currentIndex = 0
                return
            }
            // 如果在中间
            for (let i = 0; i < listHeight.length - 1; i++) {
                let height1 = listHeight[i]
                let height2 = listHeight[i + 1]
                if (-newVal >= height1 && -newVal < height2) {
                    this.currentIndex = i
                    return
                }
            }
            // 如果在结尾
            this.currentIndex = listHeight.length - 2
        }
    },
    components: {
        Scroll
    }
}
</script>

<style lang='less' scoped>
@import '../../commons/less/variable.less';
@import '../../commons/less/mixin.less';
@import '../../commons/less/base.less';

.index-list {
    position: relative;
    width: 100%;
    height: 100%;
    .index-list-content {
        background-color: @color-white;
        border-radius: 2px;
        .index-list-title {
            padding: 14px 16px;
            font-size: @fontsize-medium;
            line-height: 1.6;
            color: @color-dark-grey;
        }
        .index-list-anchor {
            padding: 16px 16px 10px 16px;
            line-height: 1;
            font-size: @fontsize-medium;
            color: @color-light-grey;
            background: @color-title-background;
        }
        .index-list-item {
            position: relative;
            height: 50px;
            line-height: 50px;
            padding: 0 16px;
            font-size: @fontsize-medium;
            color: @color-dark-grey;
            &:last-child {
                .border-none;
            }
            &.index-list-item_active {
                background-color: @color-active-light-gray;
            }
        }
    }
    .index-list-nav {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-family: Helvetica;
        > ul {
            > li {
                padding: 6px 16px 0 16px;
                text-align: center;
                line-height: 1;
                font-size: 12px;
                color: @color-grey;
                &.active {
                    color: @color-main-l;
                }
            }
        }
    }
    .index-list-fixed {
        position: absolute;
        top: 0;
        left: 0;
        width: 91%;
        padding: 16px 16px 10px 16px;
        font-size: @fontsize-medium;
        color: @color-light-grey;
        background: @color-title-background;
        line-height: 1;
    }
}
</style>
