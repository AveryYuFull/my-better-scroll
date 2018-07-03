<template>
    <Page class='form-list-view'
        :title="$t('examples.formList')"
        :desc="$t('formListPage.desc')">
        <div slot='content'>
            <scroll>
                <ul class='list-content'>
                    <template v-for='(item, index) in items'>
                        <li class='listItem' :key='index'>
                            <div>
                                <input :id="`input${index}`" type='checkbox'/>
                                <label :for="`input${index}`" @click.stop v-text="$t('formListPage.previousTxt') + index + $t('formListPage.followingTxt')"></label>
                                <input type='text' class='text-input' />
                            </div>
                            <span v-text='`input ${index}`'></span>
                        </li>
                    </template>
                </ul>
            </scroll>
        </div>
    </Page>
</template>

<script>
import Page from '../../components/page/page'
import Scroll from '../../components/scroll/scroll'

export default {
    data () {
        return {
            items: new Array(10)
        }
    },
    components: {
        Page,
        Scroll
    }
}
</script>

<style lang='less' scoped>
.form-list-view {
    .list-content {
        .listItem {
            padding: 30px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            .text-input {
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 3px;
            }
        }
    }
}
</style>
