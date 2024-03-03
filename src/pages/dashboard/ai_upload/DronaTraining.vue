<template>
    
    <div
      class="drop-container"
      @dragover.prevent
      @dragenter.prevent
      @drop="handleDrop"
    >
      <input
        type="file"
        @change="handleFileUpload"
        accept="application/pdf"
        style="display: none;"
        ref="fileInput"
      />
      
      <div class="btn border-gradient-blue-purple" style="position: absolute; top: 45px;left: 25%;
    transform: translateX(-50%);width: 20%;">
        <span>
          <img src="https://gurukul.finvedic.com/images/monk_half.png" alt="Person Icon" style="transform: scaleX(-1);">
          Drona Training</span>
    </div>
  
      <div style="display: flex; flex-direction: column; align-items: center; padding-top: 60px;">
  <p style="font-size: 16px; margin-bottom: 20px;">Drag and drop PDF file here, or</p>
  <button style="font-size: 32px; background: none; border:2px solid grey;border-radius:20px;cursor:pointer" @click="openFilePicker">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-type-pdf" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
  <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
  <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
  <path d="M17 18h2" />
  <path d="M20 15h-3v6" />
  <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
</svg>

</button>

</div>


<button class="upload" style="" @click="uploadPDF">Upload</button>

      <div v-if="pdfUrl">
        <h2>Uploaded PDF:</h2>
        <embed :src="pdfUrl" type="application/pdf" width="600" height="400" />
      </div>
      <div v-if="notification" class="notification">
        {{ notification }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedFile: null,
        pdfUrl: null,
        notification: null,
      };
    },
    methods: {
      handleFileUpload(event) {
        this.selectedFile = event.target.files[0];
      },
      handleDrop(event) {
        event.preventDefault();
        this.selectedFile = event.dataTransfer.files[0];
      },
      openFilePicker() {
        this.$refs.fileInput.click();
      },
      async uploadPDF() {
        if (!this.selectedFile) {
          this.notification = "Please select a PDF file to upload."; // Set notification message
          setTimeout(() => {
            this.notification = null; // Clear notification after a delay
          }, 3000); // Adjust the delay as needed
          return;
        }
  
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        formData.append("source", "portal");
  
        try {
          const response = await axios.post("https://fnbackend.finvedic.com/api/bot", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
  
          // Assuming the response contains a URL for the uploaded file
          this.pdfUrl = response.data.url;
          this.notification = "PDF uploaded successfully"; // Set notification message
          setTimeout(() => {
            this.notification = null; // Clear notification after a delay
          }, 3000); // Adjust the delay as needed
        } catch (error) {
          console.error("Error uploading PDF:", error);
          // Handle error
        }
      },
    },
  };
  </script>
  
  <style scoped>
  
.border-gradient-blue-purple {
	background-image: linear-gradient(120deg, #33ccff 0%, #841eeb 100%);
}
.btn {
	font-size: 1rem;
	font-weight: 400;
	border-radius: 999px;
  box-sizing: border-box;
	color: #1a1a1a;
	display: inline-block;
	padding: 2px;
	position: relative;
  text-decoration: none;
	text-transform: uppercase;
}

.btn > span {
	align-items: center;
	background: #f8f8f8;
	border-radius: 999px;
  display: flex;
  justify-content: center;
  transition: background .5s ease;
  padding: 0.4rem 0.4rem;
}

.btn:hover > span {
	background: transparent;
}
.btn:hover {
	color: #fff;
}
.drop-container {
    margin-top: 80px;
    margin-right: 40px;
    margin-left: 40px;
    min-height: 300px;
    text-align: center;
    border: 3px solid #5479F7; /* Set initial border */
    border-radius: 24px;
    background: #ececec ;/* Define gradient colors */
    background-clip: padding-box, border-box; /* Clip gradient to border */
    animation: rotate-color 5s linear infinite; /* Apply rotation animation */
    
}
.drop-container:hover{
  background-color: #c5d3ff;
}


  
  .drop-container p {
    margin: 0;
  }
  
  .drop-container button {
    margin-top: 10px;
  }
  
  .notification {
    background-color: #4caf50;
    color: white;
    padding: 16px;
    border-radius: 5px;
    position: fixed;
    bottom: 60px;
    right: 20px;
  }
  .upload{
    background-color: #5479F7; 
    border-radius: 30px;
    font-size:16px;
    font-weight:600;
    color:#ffff;
    padding:12px 30px;
    margin-top:40px;
    border:none;cursor:pointer
  }
  .old_monk{
    position: absolute;
    bottom: 0;
    
  }
  span img{
    width:60px;
    border-radius: 50% 50% ;
  }
  </style>
  