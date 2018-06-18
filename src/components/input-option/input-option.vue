<template>
    <div class='input-option'>
        <span class='name' v-text='name'></span>
        <input type='text' v-model='inputValue' />
    </div>
</template>

<script>
const COMPONENT_NAME='input-option'
export default {
    name: COMPONENT_NAME,
    props: {
        name: {
            type: String,
            default: ''
        },
        value: {
            type: String | Number,
            default: '0'
        },
        minValue: null
    },
    data () {
        return {
            inputValue: this.value
        }
    },
    watch: {
        inputValue (newVal) {
            this.$emit('update:value', this.minValue ? Math.max(this.inputValue, this.minValue) : this.inputValue)
        }
    }
}
</script>

<style lang='less' scoped>
.input-option {
    font-weight: normal;    
    height: 3.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 15px;
    &.last {
        border-bottom: none;
    }
    .name {
        flex: 1;
    }
    input {
        padding-left: 0.8rem;
        height: 100%;
        outline: none;
        width: 10rem;
        background: #fff;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 1px 1px #eee inset;
    }
}
</style>
