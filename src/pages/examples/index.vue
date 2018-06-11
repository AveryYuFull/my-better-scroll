<template>
    <div class='example-list-container'>
        <ul class='list'>
            <li class='item' v-for='(item, index) in exampleList' :key='index'>
                <router-link :to='item.path'>
                    <img :src='imgPath(item.img)' alt='' />
                    <span class='desc' v-text="`${$t('examples.' + item.desc)}`"></span>
                </router-link>
            </li>
        </ul>
        <transition name="move">
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    methods: {
        imgPath (path) {
            return require('../../commons/images/' + this.$i18n.t('examples.' + path))
        }
    },
    created () {
        // example 例子的hardcode 模块
        this.exampleList = [{
            desc: 'verticalScroll',
            img: 'verticalScrollPic',
            path: '/examples/vertical-scroll/' + this.$i18n.locale
        }, {
            desc: 'indexList',
            img: 'indexListPic',
            path: ''
        }, {
            desc: 'picker',
            img: 'pickerPic',
            path: ''
        }, {
            desc: 'slide',
            img: 'slidePic',
            path: ''
        }, {
            desc: 'startGuidance',
            img: 'startGuidancePic',
            path: ''
        }, {
            desc: 'freeScroll',
            img: 'freeScrollPic',
            path: ''
        }, {
            desc: 'formList',
            img: 'formListPic',
            path: ''
        }]
    }
}
</script>

<style lang="less" scoped>
.example-list-container {
    .list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
            border: 1px solid rgba(0, 0, 0, 0.1);
            padding: 0.8rem;
            background: #fff;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
            text-align: center;
            margin-bottom: 2rem;
            flex: 0 1 28%;
            a {
                line-height: 3rem;
                color: #606c71;
                img {
                    max-width: 100%;
                    height: auto;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
            }
        }
    }
    .view {
        transition: all 0.3s;
        transform: translate3d(0, 0, 0);
        &.move-enter-active, &.move-leave-active {
            transform: translate3d(100%, 0, 0);
        }
    }
}
</style>
