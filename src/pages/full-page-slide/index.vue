<template>
    <full-page-slide :data='items' @finish='finish'></full-page-slide>
</template>

<script>
import FullPageSlide from '../../components/full-page-slide/full-page-slide'

export default {
    data () {
        return {
            items: [
                require('../../commons/images/spring.jpeg'),
                require('../../commons/images/summer.jpeg'),
                require('../../commons/images/fall.jpeg'),
                require('../../commons/images/winter.jpeg')
            ]
        }
    },
    methods: {
        finish () {
            this.$router.back()
        }
    },
    components: {
        FullPageSlide
    }
}
</script>

<style lang='less' scoped>
</style>
