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
        multiple
      />
      <q-img :src="Character_Drona" alt="Person Icon" style="width:60px; position: absolute; top: 65px;left: 26%; 
    transform: translateX(-50%);"/>
      

      <template class="btn border-gradient-blue-purple" style="position: absolute; top: 65px;left: 26%;
    transform: translateX(-50%);">
        
          <q-img :src="Character_Drona" alt="Person Icon" style="width:20%"/>
      
    </template>
  
      <div style="display: flex; flex-direction: column; align-items: center; padding-top: 70px;">
        <div>
          <span class="training_text">DRONA TRAINING</span>
        </div>
  <p style="font-size: 14px; margin-bottom: 16px;margin-top:20px;color:white;">Drag and drop<br>PDF file here, or</p>
  <button style="font-size: 18px; background: none; border:1px solid white;border-radius:10px;cursor:pointer" @click="openFilePicker">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-type-pdf" width="60" height="60" viewBox="0 0 24 24" stroke-width="1" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
 import Character_Drona from "../../../assets/Character_Drona.png";
  
  
  export default {
    data() {
      return {
        selectedFile: null,
        pdfUrl: null,
        notification: null,
       Character_Drona:Character_Drona,
      };
    },
    methods: {
      handleFileUpload(event) {
        this.selectedFiles = Array.from(event.target.files);
      },
      handleDrop(event) {
          event.preventDefault();
          this.selectedFiles = Array.from(event.dataTransfer.files);
      },
      openFilePicker() {
        this.$refs.fileInput.click();
      },
      
      async uploadPDF() {
        if (!this.selectedFiles) {
          this.notification = "Please select a PDF file to upload."; // Set notification message
          setTimeout(() => {
            this.notification = null; // Clear notification after a delay
          }, 3000); // Adjust the delay as needed
          return;
        }
        
        const formData = new FormData();

        this.selectedFiles.forEach(file => {
          formData.append("files", file);
          formData.append("source", "portal");
        })
        try {
            const response = await axios.post("http://localhost:8087/api/drona/upload/files", formData);
            this.$emit('files-refresh');
    
            if (response.data.DronaResponse && response.data.DronaResponse.length > 0) {
                this.notification = response.data.DronaResponse[0].status;
            } // Set notification message
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
	/* background-image: linear-gradient(120deg, #33ccff 0%, #841eeb 100%); */
}
.training_text {
  /* background: linear-gradient(80deg, #0740FF, #C04BE2); */
  background-color:white;
  color:#5479F7;
  /* border: 2px solid green; */
  border-radius:20px;
  /* color: white; */
  /* top:10px; */
  width:100%;
  padding:10px 24px;
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
  padding: 0.1rem 0.1rem;
}

/* .btn:hover > span {
	background: transparent;
} */
.btn:hover {
	color: #fff;
}
.drop-container {
    margin-top: 20px;
    margin-right: 40px;
    margin-left: 40px;
    min-height: 100%;
    min-width: 86%;
    text-align: center;
    /* border: 3px solid #5479F7; Set initial border */
    border-radius: 24px;
    background-image:url('/src/assets/Drona_BG.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* background: #ececec Define gradient colors */
    background-clip: padding-box, border-box; /* Clip gradient to border */
    animation: rotate-color 5s linear infinite; /* Apply rotation animation */
    
}
.drop-container:hover .training_text {
  background: linear-gradient(80deg, #0740FF, #C04BE2);
  color:white;
}


  
  .drop-container p {
    margin: 0;
  }
  
  .drop-container button {
    /* margin-top: 10px; */
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
    background-color: #ffff; 
    border-radius: 30px;
    font-size:18px;
    font-weight:500;
    color:#5479F7;
    padding:8px 40px;
    margin-top:20px;
    border:none;cursor:pointer
  }
  .old_monk{
    position: absolute;
    bottom: 0;
    
  }
  span img{
    width:80px;
    border-radius: 50% 50% ;
  }
  </style>
  