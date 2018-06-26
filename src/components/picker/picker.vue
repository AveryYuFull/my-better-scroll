<template>
    <transition name='picker-fade'>
        <div class='picker' v-show='state === 1' @click.stop.prevent='cancel'>
            <transition name='picker-move'>
                <div class='picker-panel' v-show='state === 1' @click.stop.prevent>
                    <div class='picker-choose border-bottom-1px'>
                        <div class='cancelBtn' v-text='cancelTxt' @click='cancel'></div>
                        <div class='title' v-text='title'></div>
                        <div class='confirmBtn' v-text='confirmTxt' @click='confirm'></div>
                    </div>
                    <div class='picker-content'>
                        <div class='mask-top border-bottom-1px'></div>
                        <div class='mask-bottom border-top-1px'></div>
                        <div class='wheel-wrapper' ref='wheelWrapper'>
                            <div class='wheel' v-for='(wheel, index) in pickerData' :key='index'>
                                <ul class='wheel-scroll'>
                                    <li class='wheel-item' v-for='(item, index) in wheel' :key='index' v-text='item.text'></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class='picker-footer'></div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import BetterScroll from 'better-scroll'

const COMPONENT_NAME = 'picker'

const STATE_SHOW = 1
const STATE_HIDDEN = 0
const EVENT_CHANGE = 'change'
const EVENT_SELECT = 'select'
const EVENT_VALUE_CHANGE = 'valueChange'
const EVENT_CANCEL = 'cancel'

export default {
    name: COMPONENT_NAME,
    props: {
        data: {
            type: Array,
            default: function () {
                return []
            }
        },
        selectedIndex: {
            type: Array,
            default: function () {
                return []
            }
        },
        cancelTxt: {
            type: String,
            default: 'cancel'
        },
        confirmTxt: {
            type: String,
            default: 'confirm'
        },
        title: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            state: STATE_HIDDEN,
            pickerData: this.data.slice(),
            pickerSelectedIndex: this.selectedIndex,
            pickerSelectedVal: [],
            pickerSelectedText: []
        }
    },
    methods: {
        initWheel () {
            if (!this.wheels || this.dirty) {
                this.$nextTick(() => {
                    const wheelWrapper = this.$refs.wheelWrapper
                    for (let i = 0; i < this.pickerData.length; i++) {
                        this._createWheels(wheelWrapper, i)
                    }
                    this.dirty = false
                })
            } else {
                for (let i = 0; i < this.pickerData.length; i++) {
                    this.wheels[i].enable()
                    this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
                }
            }
        },
        show () {
            if (this.state) {
                return
            }
            this.state = STATE_SHOW
            this.initWheel()
        },
        _createWheels (wheelWrapper, i) {
            if (!this.wheels) {
                this.wheels = []
            }
            if (!this.wheels[i]) {
                this.wheels[i] = new BetterScroll(wheelWrapper.children[i], {
                    wheel: {
                        selectedIndex: this.pickerSelectedIndex[i],
                        wheelWrapperClass: 'wheel-scroll',
                        wheelItemClass: 'wheel-item'
                    },
                    probeType: 3
                })
                this.wheels[i].on('scrollEnd', () => {
                    this.pickerSelectedIndex[i] = this.wheels[i].getSelectedIndex()
                    this.$emit(EVENT_CHANGE, i, this.wheels[i].getSelectedIndex())
                })
            } else {
                this.wheels[i].refresh()
            }
            return this.wheels[i]
        },
        cancel () {
            this.hide()
            this.$emit(EVENT_CANCEL)
        },
        confirm () {
            if (!this._canConfirm()) {
                return
            }
            let change = false
            for (let i = 0; i < this.pickerData.length; i++) {
                let index = this.wheels[i].getSelectedIndex()
                let value = this.pickerData[i][index].value
                if (this.pickerSelectedVal[i] !== value) {
                    change = true
                }
                this.pickerSelectedIndex[i] = index
                this.pickerSelectedText[i] = this.pickerData[i][index].text
                this.pickerSelectedVal[i] = value
            }
            this.$emit(EVENT_SELECT, this.pickerSelectedIndex, this.pickerSelectedVal, this.pickerSelectedText)
            if (change) {
                this.$emit(EVENT_VALUE_CHANGE, this.pickerSelectedIndex, this.pickerSelectedVal, this.pickerSelectedText)
            }
            this.hide()
        },
        _canConfirm () {
            return this.wheels.every((wheel, index) => {
                return !wheel.isInTransition
            })
        },
        hide () {
            this.state = STATE_HIDDEN
            for (let i = 0; i < this.wheels.length; i++) {
                this.wheels[i].disable()
            }
        },
        setData (data) {
            this.pickerData = data.slice()
            this.dirty = true
            this.initWheel()
        },
        scrollTo (i, dist) {
            const wheel = this.wheels[i]
            this.pickerSelectedIndex[i] = dist
            wheel.wheelTo(dist)
        },
        refresh () {
            setTimeout(() => {
                this.wheels.forEach ((wheel, index) => {
                    wheel.refresh()
                })
            }, 200)
        }
    },
    created () {
        if (this.pickerSelectedIndex || this.pickerSelectedIndex.length <= 0) {
            this.pickerSelectedIndex = []
            for (let i = 0; i < this.pickerData.length; i++) {
                this.pickerSelectedIndex[i] = 0
            }
        }
        this.wheels = null // 每一个齿轮
        this.dirty = true // 是否有数据改动，如果数据改动了，就设置为true，否则设置为false
    },
    mounted () {
        console.log('data: ', this.data)
    },
    watch: {
        data (newVal) {
            this.setData(newVal)
        }
    }
}
</script>

<style lang='less' scoped>
@import '../../commons/less/variable.less';
@import '../../commons/less/base.less';
@import '../../commons/less/mixin.less';

.picker {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow: hidden;
    text-align: center;
    font-size: @fontsize-medium;
    background: @color-mask-bgc;
    &.picker-fade-enter, &.picker-fade-leave-active {
      opacity: 0
    }
    &.picker-fade-enter-active, &.picker-fade-leave-active {
      transition: all .3s ease-in-out
    }
    .picker-panel {
        position: absolute;
        bottom: 0;
        z-index: 600;
        width: 100%;
        height: 273px;
        background-color: @color-white;
        &.picker-move-enter, &.picker-move-leave-active {
            transform: translate3d(0, 273px, 0)
        }
        &.picker-move-enter-active, &.picker-move-leave-active {
            transition: all .3s ease-in-out
        }
        .picker-choose {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            color: @color-light-grey;
            padding: 0 16px;
            .title {
                color: @color-dark-grey;
                font-size: @fontsize-large-x;
            }
            .confirmBtn {
                color: @color-main;
                font-size: @fontsize-medium;
                &.active {
                    color: @color-main-ll;
                }
            }
            .cancel {
                font-size: @fontsize-medium;
                &.active {
                    color: @color-active-light-gray-fe;
                }
            }
        }
        .picker-content {
            position: relative;
            top: 20px;
            .mask-top, .mask-bottom {
                z-index: 10;
                width: 100%;
                height: 68px;
                pointer-events: none;
                transform: translateZ(0)
            }
            .mask-top {
                position: absolute;
                top: 0;
                background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
            }
            .mask-bottom {
                position: absolute;
                bottom: 0;
                background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
            }
            .wheel-wrapper {
                display: flex;
                padding: 0 16px;
                .wheel {
                    .flex-fix;
                    height: 173px;
                    overflow: hidden;
                    font-size: @fontsize-large-xx;
                    .wheel-scroll {
                        padding: 0;
                        margin-top: 68px;
                        line-height: 36px;
                        list-style: none;
                        .wheel-item {
                            list-style: none;
                            height: 36px;
                            overflow: hidden;
                            white-space: nowrap;
                            color: @color-dark-grey;
                        }
                    }
                }
            }
        }
        .picker-footer {
            height: 20px;
        }
    }
}
</style>
