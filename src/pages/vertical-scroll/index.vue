<template>
<div>
    <optional-demo>
        <div slot='options'>
            <div class='group'>
                <switch-option name='滚动条'></switch-option>
                <switch-option name='fade' class='last'></switch-option>
            </div>
            <div class='group'>
                <switch-option name='下拉刷新'></switch-option>
                <input-option name='threshold (≥ 40)' value='90'></input-option>
                <input-option name='stop (≥ 40)' value='40' class='last'></input-option>
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
            <scroll :data='list' @pullingUp='onPullingUp'
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
import OptionalDemo from '../../components/optional-demo/optional-demo'
import SwitchOption from '../../components/switch-option/switch-option'
import InputOption from '../../components/input-option/input-option'
import SelectOption from '../../components/select-option/select-option'
import Scroll from '../../components/scroll/scroll'

export default {    
    data () {
        return {
            list: [
                'I am the No.1 line',
                'I am the No.2 line',
                'I am the No.3 line',
                'I am the No.4 line'
            ]
        }
    },
    methods: {
        onPullingUp () {
            setTimeout(() => {
                const len = this.list.length
                for (let i = 0; i < 2; i++) {
                    this.list.push(`I am the No.${i + len + 1}`)
                }
            }, 1000)
        },
        onPullingDown () {
            console.log('onPullingDown')
            setTimeout(() => {
                const len = this.list.length
                for (let i = 0; i < 2; i++) {
                    this.list.unshift(`I am the No.${i + len + i}`)
                }
            }, 1000090)
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
