<template>
  <div class="main">
    <div class="dropzone-container" @dragover="dragover" @dragleave="dragleave" @drop="drop">
      <input type="file" name="file" id="fileInput" class="hidden-input" @change="onChange" ref="file"
        accept=".pdf,.jpg,.jpeg,.png" />
      <label for="fileInput" class="file-label" v-if="!files.length">
        <div>
          <q-icon name="upload_file" size="100px" color="blue-2" />
          <br>
          <i class="text-grey-5">Drag and drop</i>
        </div>
      </label>
      <div class="preview-container" v-if="files.length">
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
  methods: {
    onChange() {
      this.files.push(...this.$refs.file.files);
      let incomingFiles = Array.from(this.$refs.file.files);
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
      this.$refs.file.files = e.dataTransfer.files;
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
  height: 240px;
  width: 200px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  background: rgba(0, 0, 0, 0.05)
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
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
