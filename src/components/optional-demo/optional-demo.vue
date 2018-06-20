<template>
    <div class='page'>
        <header class='header'>
            <img class='back' :src='backIcon' alt='back'  @click='back' />
            <h1>普通 Scroll 组件</h1>
        </header>
        <div ref='wrapper' class='page-content'>
            <main class='main-content'>
                <section class='desc'>
                    <span>基于 BScroll 实现垂直滚动列表组件</span>
                </section>
                <div class='options'>
                    <div class='title sub'>Options</div>
                    <div class='option-list'>
                        <slot name="options"></slot>
                    </div>
                </div>
                <div class='demo'>
                    <div class='title sub'>Demo</div>
                    <div class='scroll-list-wrap'>
                        <slot name='demo'></slot>
                    </div>
                </div>
                <div class='methods'>
                    <div class='title sub'>Methods</div>
                    <div class='method-list'>
                        <slot name='methods'></slot>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import backIcon from '../../commons/images/back.svg'

export default {
    data () {
        return {
            backIcon
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
.page {
    font-weight: normal;    
    .header {
        position: relative;
        line-height: 44px;
        height: 44px;
        box-shadow: 0 1px 6px #ccc;
        display: flex;
        justify-content: space-around;
        h1 {
            margin: 0;
            font-size: 16px;
            color: #007bff;
        }
        .back {
            position: absolute;
            top: 8px;
            left: 0;
            width: 26px;
        }
    }
    .page-content {
        .title {
            font-size: 1.5rem;
            font-weight: 500;
            color: #333;
            padding: 1rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 1rem;
        }
        .main-content {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            @media screen and (min-width: 42rem) {
                padding: 2rem 2rem;
                font-size: 1.1rem;
            }
            @media screen and (max-width: 42rem) {
                padding: 1rem 1rem 2rem 1rem;
                font-size: 1rem;
            }
            .desc {
                flex: 0 1 100%;
                text-align: left;
                margin: 0.7rem 0;
                @media screen and (min-width: 42rem) {
                    margin: 2rem 0;
                }
            }
            .options {
                flex: 0 1 25%;
                @media screen and (max-width: 42rem) {
                    flex: 0 1 100%;
                }
            }
            .demo {
                flex: 0 1 23rem;
                @media screen and (max-width: 42rem) {
                    flex: 0 1 100%;
                }
                .scroll-list-wrap {
                    height: 30rem;
                    position: relative;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    border-radius: .3rem;
                    overflow: hidden;
                }
            }
            .methods {
                flex: 0 1 25%;
                @media screen and (max-width: 42rem) {
                    flex: 0 1 100%;
                }
            }
            .content {
                border: 1px solid;
                height: 600px;
            }
        }
    }
}
</style>
