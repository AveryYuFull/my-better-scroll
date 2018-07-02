<template>
    <div class='slide' ref='slide'>
        <div class='slide-group' ref='slideGroup'>
            <slot></slot>
        </div>
        <div class='dots' v-if='showDot'>
            <span class='dot' :class="{ 'active': currentPageIndex === index }" v-for='(dot, index) in dots' :key='index'></span>
        </div>
    </div>
</template>

<script>
const COMPONENT_NAME = 'slide'

import BScroll from 'better-scroll'

export default {
    name: COMPONENT_NAME,
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: false
        },
        interval: {
            type: Number,
            default:4000
        },
        showDot: {
            type: Boolean,
            default: true
        },
        click: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    mounted () {
        setTimeout(() => {
            this._setSlideWidth()
            if (this.showDot) {
                this._initDot()
            }
            this._initSlide()
            if (this.autoPlay) {
                this._play()
            }
        }, 20)
        window.addEventListener('resize', () => {
            if (!this.slide || !this.slide.enabled) {
                return
            }
            clearTimeout(this.resizeTimer)
            this.resizeTimer = setTimeout(() => {
                this.refresh()
            }, 60)
        })
    },
    created () {
        this.children = null
        this.slide = null
        this.playTimer = null
        this.resizeTimer = null
    },
    activated () {
        if (!this.slide) {
            return
        }
        this.slide.enable()
        let pageIndex = this.slide.getCurrentPage().pageX
        if (pageIndex > this.dots.length) {
            pageIndex = pageIndex % this.dots.length
        }
        this.slide.goToPage(pageIndex, 0, 0)
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
            this._play()
        }
    },
    deactivated () {
        this.slide.disable()
        clearTimeout(this.playTimer)
        clearTimeout(this.resizeTimer)
    },
    beforeDestroy () {
        this.slide.disable()
        clearTimeout(this.playTimer)
        clearTimeout(this.resizeTimer)
    },
    methods: {
        refresh () {
            this._setSlideWidth(true)
            this.slide.refresh()
        },
        _setSlideWidth (isResize) {
            this.children = this.$refs.slideGroup.children
            let width = 0
            let slideWidth = this.$refs.slide.clientWidth
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                child.style.width = `${ slideWidth }px`
                width += slideWidth
            }
            if (this.loop && !isResize) {
                width += 2 * slideWidth
            }
            this.$refs.slideGroup.style.width = `${ width }px`
        },
        _initDot () {
            this.dots = new Array(this.children.length)
        },
        _initSlide () {
            this.slide = new BScroll(this.$refs.slide, {
                scrollX: true, // 横向滚动
                scrollY: false, // 不允许纵向滚动
                momentum: false, // 是否开启动量动画，关闭可以提升效率
                snap: {
                    loop: this.loop,
                    threshold: 0.3,
                    speed: 400
                },
                click: this.click
            })
            this.slide.on('scrollEnd', this._onScrollEnd)
        },
        _onScrollEnd () {
            let pageIndex = this.slide.getCurrentPage().pageX
            this.currentPageIndex = pageIndex
            if (this.autoPlay) {
                this._play()
            }
        },
        _play () {
            let pageIndex = this.slide.getCurrentPage().pageX + 1
            clearTimeout(this.playTimer)
            this.playTimer = setTimeout(() => {
                this.slide.goToPage(pageIndex, 0, 400)
            }, this.interval)
        }
    }
}
</script>

<style lang='less' scoped>
@import '../../commons/less/variable';

.slide {
    position: relative;
    text-align: center;
    .slide-group {
        display: flex;
        height: 100%;
        .slide-item {
            a {
                display: block;
                width: 100%;
                overflow: hidden;
                text-decoration: none;
                img {
                    display: block;
                    width: 100%;
                }
            }
        }
    }
    .dots {
        position: absolute;
        bottom: 12px;
        z-index: 99;
        width: 100%;
        .dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: @color-light-gray-s;
            margin: 0 4px;
            &.active {
                width: 20px;
                border-radius: 5px;
                background: @color-white;
            }
        }
    }
}
</style>
