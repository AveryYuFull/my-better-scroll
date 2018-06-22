<template>
    <page :title="$t('examples.picker')"
        :desc="$t('pickerPage.desc')">
        <div slot='content'>
            <div class='select' @click='showPicker(0)' ref='select0' v-text='selectedText[0]'></div>
            <picker :data='[data[0]]'></picker>
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
                this.$i18n.t('pickerPage.oneColumn') + this.$i18n.t('pickerPage.pickDemo'),
                this.$i18n.t('pickerPage.twoColumn') + this.$i18n.t('pickerPage.pickDemo'),
                this.$i18n.t('pickerPage.threeColumn') + this.$i18n.t('pickerPage.pickDemo'),
                this.$i18n.t('pickerPage.linkColumn') + this.$i18n.t('pickerPage.pickDemo')
            ], 
            data: [
                [pickData.data1]
            ]
        }
    },
    components: {
        Page,
        Picker
    }
}
</script>

<style scoped lang='less'>
</style>
