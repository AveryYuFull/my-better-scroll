<template>
    <page :title="$t('examples.picker')"  class='picker-view'
        :desc="$t('pickerPage.desc')">
        <div slot='content'>
            <div class='select' @click='showPicker(0)' ref='select0' v-text='selectedText[0]'></div>
            <picker :data='data[0]' :title='title[0]' ref='picker0'></picker>
        </div>
    </page>
</template>

<script>
import Page from '../../components/page/page'
import Picker from '../../components/picker/picker'

import pickData from '../../data/picker.json'

export default {
    data () {
        return {
            selectedText: [
                this.$i18n.t('pickerPage.oneColumn') + this.$i18n.t('pickerPage.pickerDemo'),
                this.$i18n.t('pickerPage.twoColumn') + this.$i18n.t('pickerPage.pickerDemo'),
                this.$i18n.t('pickerPage.threeColumn') + this.$i18n.t('pickerPage.pickerDemo'),
                this.$i18n.t('pickerPage.linkColumn') + this.$i18n.t('pickerPage.pickerDemo')
            ], 
            title: [
                this.$i18n.t('pickerPage.oneColumn') + this.$i18n.t('pickerPage.picker'),
                this.$i18n.t('pickerPage.twoColumn') + this.$i18n.t('pickerPage.picker'),
                this.$i18n.t('pickerPage.threeColumn') + this.$i18n.t('pickerPage.picker'),
                this.$i18n.t('pickerPage.linkage') + this.$i18n.t('pickerPage.picker')
            ],
            data: [
                [pickData.data1]
            ]
        }
    },
    methods: {
        showPicker (index) {
            this.$refs[`picker${index}`].show()
        }
    },
    components: {
        Page,
        Picker
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
