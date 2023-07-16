<template>
  <div v-if="entryType == ''">
    <n-grid x-gap="12" :cols="5" :y-gap="10">
      <n-grid-item v-for="item of EntryTypes" :key="item.name">
        <div :class="`${item.name === entryType ? 'box is-active' : 'box'}`" @click="entryType = item.name">
          <n-h4 class="box-title">{{ item.label }}</n-h4>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
  <div v-else>
    <n-page-header>
      <n-grid x-gap="12" :cols="3" :y-gap="10">
        <n-grid-item>
          <n-card title="What is an entry?">
            An entry is much like a tweet on Twitter, or a post on Instagram, with the difference that you can automate
            it. For example, if you want to rent your house for two weeks, you can have TBD ask interested parties a
            couple of questions and notify you about the responses. Or maybe you have a restaurant and want to offer
            pizza for delivery; You can find a delivery service on TBD and attach that to the Pizza entry. Any order is
            automatically charged for the pizza and the delivery, and the money is distributed among the parties... Or a
            roofer that accepts appointments and takes a small down-payment for a initial survey.
            <template #footer>
              <n-p><b>TLDR: Classifieds, with a reddit flair and built-in incentive structure</b>></n-p>
            </template>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <EntryForm :entry-type="entryType" />
        </n-grid-item>
        <n-grid-item> </n-grid-item>
      </n-grid>
      <template #title>
        <n-text>Post a new Entry</n-text>
      </template>
      <template #header>
        <n-breadcrumb>
          <n-breadcrumb-item>Home</n-breadcrumb-item>
          <n-breadcrumb-item>Post</n-breadcrumb-item>
        </n-breadcrumb>

        <n-grid x-gap="12" :cols="12" :y-gap="2">
          <n-grid-item v-for="item of EntryTypes" :key="item.name">
            <div
              :class="`${item.name === entryType ? 'box is-small is-active' : 'box is-small'}`"
              @click="entryType = item.name"
            >
              <n-p class="box-title">{{ item.label }}</n-p>
            </div>
          </n-grid-item>
        </n-grid>
      </template>
      <template #footer>Helptext</template>
    </n-page-header>
  </div>
</template>

<script setup lang="ts">
import { NGrid, NGridItem, NH4, NP, NText, NPageHeader, NBreadcrumb, NBreadcrumbItem, NCard } from 'naive-ui'
import EntryForm from '@/components/entry-form.vue'
import { EntryTypes } from '@tbd/common'

const entryType = ref<string>('')
</script>

<style scoped lang="css">
.box {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  height: 180px;
  display: flex;
  align-items: center;
  text-align: center;
}
.is-small {
  height: 100px;
}
.is-active {
  border: 1px solid #000;
}
.box-title {
  margin: 0 auto;
}
</style>
