<template>
    <div class='mf-loading-container'>
        <img :src='loadingIcon' alt='' />
    </div>
</template>

<script>
import loadingIcon from '../../commons/images/loading.gif'

export default {
    data () {
        return {
            loadingIcon
        }
    }
}
</script>

<style lang="less" scoped>
.mf-loading-container {
    img {
        width: 20px;
        height: 20px;
        display: block;
    }
}
</style>


