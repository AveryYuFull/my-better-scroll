<template>
    <div class='full-page-slide-wrapper' v-if='items && items.length > 0'>
        <slide ref='slide'
            :loop='false'
            :autoPlay='false'>
            <div v-for='(item, index) in items' :key='index' class='slide-item'>
                <div class='full-page-img-wrapper' :style='getStyle(index)'>
                    <div class='button-wrapper' v-if='items.length - 1 === index' @click='handleClick'>
                        <span v-text="$t('fullPageSlideComponent.buttonTxt')"></span>
                    </div>
                </div>
            </div>
        </slide>
    </div>
</template>

<script>
const COMPONENT_NAME = 'full-page-slide'

import Slide from '../slide/slide'

export default {
    name: COMPONENT_NAME,
    props: {
        data: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data () {
        return {
            items: this.data.slice()
        }
    },
    methods: {
        handleClick () {
            this.$emit('finish')
        },
        getStyle (index) {
            return {
                background: `url(${ this.items[index] }) no-repeat center / 100% 100%`
            }
        }
    },
    components: {
        Slide
    }
}
</script>

<style lang='less' scoped>
@import '../../commons/less/variable.less';

.full-page-slide-wrapper {
    height: 100%;
    .slide {
        height: 100%;
        overflow: hidden;
        .slide-group {
            height: 100%;
            .slide-item {
                height: 100%;
                .full-page-img-wrapper {
                    height: 100%;
                    position: relative;
                    .button-wrapper {
                        position: absolute;
                        bottom: 90px;
                        left: 50%;
                        transform: translateX(-50%);
                        span {
                            display: inline-block;
                            width: 130px;
                            padding: 15px 0;
                            border: 4px solid rgba(255, 255, 255, 0.7);
                            border-radius: 4px;
                            color: rgba(255, 255, 255, 0.7);
                            font-size: @fontsize-large-xx;
                        }
                    }
                }
            }
        }
    }
}
</style>
