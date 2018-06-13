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
        <div></div>
    </optional-demo>
</div>
</template>

<script>
import OptionalDemo from '../../components/optional-demo/optional-demo'
import SwitchOption from '../../components/switch-option/switch-option'
import InputOption from '../../components/input-option/input-option'

export default {    
    components: {
        "optional-demo": OptionalDemo,
        'switch-option': SwitchOption,
        'input-option': InputOption
    }    
}
</script>

<style lang='less' scoped>
.options {
    .group {
        border: 1px solid rgba(0, 0, 0, 0.1);
        margin-bottom: 1rem;
        .last {
            border-bottom: none;
        }
    }
}
</style>
