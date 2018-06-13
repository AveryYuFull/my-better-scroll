<template>
    <div class='switch-option'>
        <span class='name' v-text='name'></span>
        <div class='switch-ellipse' :class="{'active': checked}" @click='toggleSwitch'>
            <span class='switch-circle' :class="{'active': checked}"></span>
        </div>
    </div>
</template>

<script>
const COMPONENT_NAME = 'switch-option'

export default {
    name: COMPONENT_NAME,
    props: {
        name: {
            type: String,
            default: ''
        },
        value: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            checked: this.value
        }
    },
    methods: {
        toggleSwitch () {
            this.checked = !this.checked
        }
    },
    watch: {
        checked (newVal) {
            this.$emit('update:value', newVal)
        }
    }
}
</script>

<style lang='less' scoped>
.switch-option {
    font-weight: normal;    
    height: 3.2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
        flex: 0 1 auto; 
    }
    .switch-ellipse {
        height: 31px;
        width: 51px;
        border: 2px solid rgba(0, 0, 0, 0.1);
        background: #fff;
        border-radius: 1000px;
        position: relative;
        transition: all 0.1s;
        &.active {
            background: #3b99fc;
            transition: all 0.2s ease 0.2s;
        }
        .switch-circle {
            height: 27px;
            width: 27px;
            border-radius: 50%;
            background: #fff;
            position: absolute;
            left: 0;
            top: 1px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: -1px 1px 1px #999;
            transition: all 0.3s;
            &.active {
                left: 23px;
                transition: all 0.4s ease 0.1s;
            }
        }
    }
}
</style>
