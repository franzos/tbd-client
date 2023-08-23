<template>
  <n-button :loading="isBusy" :disabled="!fileListLengthRef" style="margin-bottom: 12px" @click="handleClick">
    Upload File
  </n-button>
  <n-upload ref="uploadRef" :default-upload="false" :multiple="false" @change="handleChange">
    <n-button>Select File</n-button>
  </n-upload>
</template>

<script setup lang="ts">
import { NButton, NUpload } from 'naive-ui'
import type { UploadInst, UploadFileInfo } from 'naive-ui'
import { useFileStore } from '@/stores/file'
import { storeToRefs } from 'pinia'

const fileListLengthRef = ref(0)
const uploadRef = ref<UploadInst | null>(null)
const uploadData = ref<UploadFileInfo[]>([])

const fileStore = useFileStore()
const { isBusy } = storeToRefs(fileStore)

const handleChange = (data: { fileList: UploadFileInfo[] }) => {
  fileListLengthRef.value = data.fileList.length
  uploadData.value = data.fileList
}

const handleClick = () => {
  if (uploadData.value && uploadData.value[0].file) {
    uploadfile(uploadData.value[0].file)
  }
}

const emits = defineEmits(['file:upload-finish'])

const uploadfile = async (file: File) => {
  const files = await fileStore.uploadFile(file)
  if (files) {
    emits('file:upload-finish', files[0])
    fileListLengthRef.value = 0
    uploadRef.value = null
    uploadData.value = []
  }
}
</script>
