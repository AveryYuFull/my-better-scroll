<template>
    <picker ref='picker'
        :data='linkageData' :title='title'
        :selected-index='selectedIndex'
        :cancel-txt='cancelTxt' :confirm-txt='confirmTxt'
        @change='handleChange'></picker>
</template>

<script>
import Picker from '../picker/picker'

const COMPONENT_NAME = 'city-picker'

export default {
    name: COMPONENT_NAME,
    props: {
        data: {
            type: Array,
            default: function () {
                return []
            }
        },
        confirmTxt: {
            type: String,
            default: ''
        },
        cancelTxt: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        selectedIndex: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data () {
        return {
            tempIndex: [0, 0, 0]
        }
    },
    computed: {
        linkageData () {
            const [ provinceList, cityList, areaList ] = this.data
            let provinces = provinceList
            let citys = cityList[provinces[this.tempIndex[0]].value]
            let areas = areaList[citys[this.tempIndex[1]].value]

            return [provinces, citys, areas]
        }
    },
    methods: {
        show () {
            this.$refs.picker.show()
        },
        handleChange (i, newIndex) {
            if (newIndex !== this.tempIndex[i]) {
                for (let j = 2; j > i; j--) {
                    this.tempIndex.splice(j, 1, 0)
                    this.$refs.picker.scrollTo(j, 0)
                }
                this.tempIndex.splice(i, 1, newIndex)
            }
        }
    },
    watch: {
        linkageData () {
            this.$refs.picker.refresh()
        }
    },
    components: {
        Picker
    }
}
</script>

<style scoped lang='less'>
</style>
