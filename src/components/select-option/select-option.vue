<template>
    <div class='select-option'>
        <span class='name' v-text='name'></span>
        <select v-model='selected'>
            <option v-for='(option, index) in options' :value='option' v-text='option' :key='index'></option>
        </select>
    </div>
</template>

<script>
const COMPONENT_NAME = 'select-option'

export default {
    name: COMPONENT_NAME,
    props: {
        name: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: function () {
                return []
            }
        },
        value: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            selected: this.value
        }
    },
    watch: {
        selected (newVal) {
            this.$emit('update:value', newVal)
        }
    }
}
</script>

<style lang="less" scoped>
.select-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 15px;
    .name {
        flex: 1;
    }
    select {
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        width: 10.8rem;
        height: 100%;
        outline: none;
        box-shadow: 0 0 1px 1px #eee inset;
    }
}
</style>

