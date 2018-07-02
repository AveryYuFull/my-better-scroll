<template>
    <div class='example'>
        <ul class='example-list'>
            <li class='example-item' v-for='(item, index) in exampleList' :key='index'>
                <router-link :to='item.path'>
                    <img :src='imgPath(item.img)' alt='' />
                    <div class='desc' v-text="$t(`examples.${item.title}`)"></div>
                </router-link>
            </li>
        </ul>
        <transition name='move'>
            <router-view class='view'></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    methods: {
        imgPath (img) {
            return require('../../commons/images/' + this.$i18n.t(`examples.${img}`))
        }
    },
    created () {
        this.exampleList = [{
            img: 'verticalScrollPic',
            title: 'verticalScroll',
            path: '/examples/vertical-scroll/' + this.$i18n.locale
        }, {
            img: 'indexListPic',
            title: 'indexList',
            path: '/examples/index-view/' + this.$i18n.locale
        }, {
            img: 'pickerPic',
            title: 'picker',
            path: '/examples/picker/' + this.$i18n.locale
        }, {
            img: 'slidePic',
            title: 'slide',
            path: '/examples/slide/' + this.$i18n.locale
        }, {
            img: 'startGuidancePic',
            title: 'startGuidance',
            path: '/examples/full-page-slide/' + this.$i18n.locale
        }, {
            img: 'freeScrollPic',
            title: 'freeScroll',
            path: ''
        }, {
            img: 'formListPic',
            title: 'formList',
            path: ''
        }]
    }
}
</script>

<style lang='less' scoped>
@import '../../commons/less/variable.less';

.example {
    .example-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .example-item {
            background-color: @color-white;
            padding: 0.8rem;
            margin-bottom: 2rem;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
            text-align: center;
            @media screen and (min-width: 42rem) {
                flex: 0 1 28%;
            }
            @media screen and (max-width: 42rem) {
                flex: 0 1 100%;
            }
            img {
                max-width: 100%;
                border: 1px solid rgba(0, 0, 0, 0.1);
            }
            a {
                line-height: 3rem;
                color: #606c71;
            }
        }
    }
    .view {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 99;
        overflow: auto;
        transition: all 0.3s;
        transform: translate3d(0, 0, 0);
        &.move-enter-active, &.move-leave-active {
            transform: translate3d(100%, 0, 0);
        }
    }
}
</style>