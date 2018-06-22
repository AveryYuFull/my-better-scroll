<template>
    <div class='page'>
        <header class='header'>
            <img :src='backIcon' class='back' alt='back' @click='back' />
            <div class='title' v-text='title'></div>
        </header>
        <div class='wrapper'>
            <section v-show='desc' class='desc'>
                <slot name='desc'>{{ desc }}</slot>
            </section>
            <main class='content'>
                <slot name='content' v-text='content'></slot>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            backIcon: require('../../commons/images/back.svg')
        }
    },
    methods: {
        back () {
            this.$router.back()
        }
    }
}
</script>

<style lang='less' scoped>
@import '../../commons/less/variable.less';

.page {
    background: #efeff4 !important;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f7f7f7;
        box-shadow: 0 1px 6px #ccc;
        height: 44px;
        line-height: 44px;
        img {
            width: 26px;
            color: @color-main;
            margin-left: 15px;
        }
        .title {
            flex: 1;
            text-align: center;
            color: @color-main;
            font-size: 16px;
        }
    }
    .wrapper {
       .desc {
           padding: 20px;
           line-height: 20px;
           font-size: 14px;
           color: #606c71;
       } 
    }
}
</style>
