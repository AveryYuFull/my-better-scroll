<template>
    <page :title="$t('examples.picker')"  class='picker-view'
        :desc="$t('pickerPage.desc')">
        <div slot='content'>
            <div class='select' @click='showPicker(0)' ref='select0' v-text='selectedText[0]'></div>
            <picker ref='picker0' 
                :data='data[0]' :title='title[0]'
                :selected-index='selectedIndex[0]'
                @select='handleSelect(0, arguments)'
                @value-change='handleSelect(0, arguments)'
                ></picker>
            <div ref='select1' class='select' @click='showPicker(1)' v-text='selectedText[1]'></div>
            <picker ref='picker1'
                :data='data[1]' :title='title[1]'
                :selected-index='selectedIndex[1]'
                @select='handleSelect(1, arguments)'
                @value-change='handleSelect(1, arguments)'>
            </picker>
            <div ref='select2' class='select' @click='showPicker(2)' v-text='selectedText[2]'></div>
            <picker ref='picker2'
                :data='data[2]' :title='title[2]'
                :selected-index='selectedIndex[2]'
                @select='handleSelect(1, arguments)'
                @value-change='handleSelect(1, arguments)'
            ></picker>
            <div ref='select3' class='select' @click='showPicker(3)' v-text='selectedText[3]'></div>
            <city-picker ref='picker3'
                :data='data[3]' :title='title[3]'
                :selected-index='selectedIndex[3]'></city-picker>
        </div>
    </page>
</template>

<script>
import Page from '../../components/page/page'
import Picker from '../../components/picker/picker'
import CityPicker from '../../components/city-picker/city-picker'

import pickData from '../../data/picker.json'
import { provinceList, cityList, areaList } from '../../data/area'

export default {
    data () {
        return {
            selectedText: [
                this.$i18n.t('pickerPage.oneColumn') + this.$i18n.t('pickerPage.pickerDemo'),
                this.$i18n.t('pickerPage.twoColumn') + this.$i18n.t('pickerPage.pickerDemo'),
                this.$i18n.t('pickerPage.threeColumn') + this.$i18n.t('pickerPage.pickerDemo'),
                this.$i18n.t('pickerPage.linkage') + this.$i18n.t('pickerPage.pickerDemo')
            ], 
            title: [
                this.$i18n.t('pickerPage.oneColumn') + this.$i18n.t('pickerPage.picker'),
                this.$i18n.t('pickerPage.twoColumn') + this.$i18n.t('pickerPage.picker'),
                this.$i18n.t('pickerPage.threeColumn') + this.$i18n.t('pickerPage.picker'),
                this.$i18n.t('pickerPage.linkage') + this.$i18n.t('pickerPage.picker')
            ],
            data: [
                [pickData.data1],
                [pickData.data1, pickData.data2],
                [pickData.data1, pickData.data2, pickData.data3],
                [provinceList, cityList, areaList]
            ],
            selectedIndex: [
                [0],
                [1, 0],
                [0, 1, 2],
                [0, 0, 0]
            ],
        }
    },
    methods: {
        showPicker (index) {
            this.$refs[`picker${index}`].show()
        },
        handleSelect (index, args) {
            this.selectedText.splice(index, 1, args[2].join('，'))
        }
    },
    components: {
        Page,
        Picker,
        CityPicker
    }
}
</script>

<style scoped lang='less'>
.picker-view {
    .select {
        margin: 0 10px 40px 10px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #e5e5e5;
        text-align: center;
        background: #fff;
    }
}
</style>
