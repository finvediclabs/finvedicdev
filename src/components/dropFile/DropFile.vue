<template>
  <div class="main">
    <div class="dropzone-container shadow-3" style=" position: relative;" @dragover="dragover" @dragleave="dragleave" @drop="drop">
      <input type="file" name="file" :id="fileRef" class="hidden-input" @change="onChange" :ref="fileRef" :accept="accept" />
      <label :for="fileRef" class="file-label" v-if="!files.length">
        <div>
          <q-icon name="upload_file" size="100px" color="blue-2" />
          <br>
          <i class="text-grey-5">Drag and drop</i>
        </div>
      </label>
      <div class="dropzone-container" v-if="files.length">
        <div v-for="file in files" :key="file.name" class="preview-card">
          <div>
            <img class="preview-img" :src="generateURL(file)" />
            <p> {{ file.name }} </p>
          </div>
          <q-btn icon="close" size="xs" class="q-pa-xs close-btn" color="grey"
            @click="remove(files.indexOf(file))"></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'drop-file',
  data() {
    return {
      isDragging: false,
      files: [],
    }
  },
  props: ['accept', 'fileRef'],
  methods: {
    onChange() {
      this.files.push(...this.$refs[this.fileRef].files);
      let incomingFiles = Array.from(this.$refs[this.fileRef].files);
      const fileExist = this.files.some((r) =>
        incomingFiles.some(
          (file) => file.name === r.name && file.size === r.size
        )
      );
      if (!fileExist) {
        this.files.push(...incomingFiles);
      }
      this.$emit('update', this.files);
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs[this.fileRef].files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove(i) {
      this.files.splice(i, 1);
      this.$emit('update', this.files);
    },
    generateURL(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },
  }
}
</script>
<style>
.main {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.dropzone-container {
  height: 200px;
  width: 200px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.05);
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  width: 100%;
  height: 100%;
  font-size: 20px;
  display: block;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-card {
  display: flex;
}

.preview-img {
  width: 150px;
  height: 150px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
