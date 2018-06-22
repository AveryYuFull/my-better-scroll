<template>
    <page title='索引列表'>
        <div slot='content'>
            <div class='split'></div>
            <div class='view-wrapper'>
                <div class='index-list-wrapper'>
                    <index-list :data='data'></index-list>
                </div>
            </div>
        </div>
    </page>
</template>

<script>
import Page from '../../components/page/page'
import IndexList from '../../components/index-list/index-list'
import cityData from '../../data/index-list.json'

export default {
    data () {
        return {
            cityData: []
        }
    },
    computed: {
        data () {
            const data = []
            this.cityData.forEach((group, index) => {
                const groupObj = {}
                groupObj.name = group.name
                groupObj.items = []
                group.cities.forEach((city, index) => {
                    groupObj.items.push(city)
                })
                data.push(groupObj)
            })
            return data
        }
    },
    mounted () {
        setTimeout(() => {
            this.cityData = cityData
        }, 0)
    },
    components: {
        Page,
        IndexList
    }
}
</script>

<style lang='less' scoped>
.split {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 10px;
    background: #efeff4;
}
.view-wrapper {
    position: fixed;
    top: 54px;
    left: 0;
    bottom: 0;
    width: 100%;
    .index-list-wrapper {
        height: 100%;
        width: 95%;
        margin: 0 auto;
    }
}
</style>
