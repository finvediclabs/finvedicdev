<template>
  <!-- Top Image -->
    <div class="top-image">   
   
    </div>
  <div class="faq-page">
    <div class="faq-content">
      <!-- FAQ Items -->
      <div v-for="faq in filteredFAQs" :key="faq.id" class="faq-item-container">
        <q-expansion-item 
          class="faq-item" 
          :class="{ 'faq-item--active': isExpanded === faq.id }" 
          @click="toggleExpand(faq.id)" 
          group="faqs" 
          expand-icon="">
          <template v-slot:header>
            <div class="faq-label">
              <span>{{ faq.title }}</span>
              <i class="fa" ></i>
            </div>
          </template>

          <!-- Content for FAQ item 1 -->
          <div v-if="faq.id === 1">
            <q-card>
              <q-card-section>
                <span class="bold">✅</span> Digital books can be accessed through the "Library" section of the Gurukul portal. Once there, you can browse and read the available digital books directly within the platform.
                  <br />
                   <div class="images">
                     <q-img :src="FAQ101" alt="Image 1" width="500px" style="margin-bottom: 15px"></q-img>
                     <q-img :src="FAQ102" alt="Image 2" width="500px" style="margin-bottom: 15px"></q-img>
                     <q-img :src="FAQ103" alt="Image 3" width="500px" style="margin-bottom: 15px"></q-img>
                     <q-img :src="FAQ104" alt="Image 4" width="500px" style="margin-bottom: 15px"></q-img>
                   </div>
              </q-card-section>
           </q-card>
          </div>


          <!-- Content for FAQ item 2 -->
          <div v-if="faq.id === 2">
            <q-card>
              <q-card-section>
                <span class="bold">✅</span> Videos can be accessed through the relevant course sections. Navigate to the course materials, and click on the video you wish to watch. The video will play directly in your browser.
                <br />
               <div class="images">
              <q-img :src="FAQ201" alt="image 1" width="500px" style="margin-bottom: 15px"></q-img>
              <q-img :src="FAQ202" alt="image 2" width="500px" style="margin-bottom: 15px"></q-img>
              <q-img :src="FAQ23" alt="image 3" width="500px" style="margin-bottom: 15px"></q-img>
              </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Content for FAQ item 3 -->
          <div v-if="faq.id === 3">
            <q-card>
              <q-card-section>
                <span class="bold">✅</span> If you are experiencing slow video streaming, check your internet connection first. If the issue persists, email us at "support@finvedic.com" for troubleshooting tips.
              </q-card-section>
            </q-card>
          </div>

          <!-- Content for FAQ item 4 -->
          <div v-if="faq.id === 4">
            <q-card>
              <q-card-section>
                <span class="bold">✅</span> Classroom presentations are available in the "Library" section. Navigate to the appropriate module and click on the presentation files to view them.
                <br />
               <div class="images">
                <q-img :src="FAQ401" alt="image 2" width="500px" style="margin-bottom: 15px"></q-img>
                <q-img :src="FAQ402" alt="image 3" width="500px" style="margin-bottom: 15px"></q-img>
                <q-img :src="FAQ403" alt="image 1" width="500px" style="margin-bottom: 15px"></q-img>
             
              </div>
              </q-card-section>
            </q-card>
          </div>
          
          <!-- Content for FAQ item 5 -->
          <div v-if="faq.id === 5">
            <q-card>
              <q-card-section>
                <span class="bold">✅</span> Interacting with Drona AI is easy. Access Drona through the main dashboard, and type your questions or requests in the chat interface. Drona will provide responses and recommendations based on your inputs and is available 24/7.
                <br />
                <div class="images">
                  <q-img :src="FAQ501" alt="Interacting with Drona - Image 2" width="500px" style="margin-bottom: 15px"></q-img>
                  <q-img :src="FAQ502" alt="Interacting with Drona - Image 3" width="500px" style="margin-bottom: 15px"></q-img>
                  <q-img :src="FAQ503" alt="Interacting with Drona - Image 1" width="500px" style="margin-bottom: 15px"></q-img>
                </div>
              </q-card-section>
            </q-card>
          </div>

        <!-- Content for FAQ item 7 -->
          <div v-if="faq.id === 7">
            <q-card>
              <q-card-section>
                <span class="bold">✅</span> No, digital books are only accessible online through the portal and cannot be downloaded.
              </q-card-section>
            </q-card>
          </div>

        <!-- Content for FAQ item 8 -->
          <div v-if="faq.id === 8">
            <q-card>
              <q-card-section>
                <span class="bold">✅</span> No, classroom presentations are only available for online viewing.
              </q-card-section>
            </q-card>
          </div>

        <!-- Content for FAQ item 9 -->
          <div v-if="faq.id === 9">
            <q-card>
              <q-card-section>
                <span class="bold">✅</span> Video content is generally not available for download to protect intellectual property. Videos can be streamed online through the portal.
              </q-card-section>
            </q-card>
          </div>

        <!-- Content for FAQ item 10 -->
          <div v-if="faq.id === 10">
            <q-card>
              <q-card-section>
                <span class="bold">✅</span> To update your profile, go to the "Profile" section at the top right corner in your account settings. Here, you can edit your personal information, change your password, and update other relevant details.
              </q-card-section>
            </q-card>
          </div>

          <!-- Content for FAQ item 11 -->
          <div v-if="faq.id === 11">
            <q-card>
              <q-card-section>
                <span class="bold">✅</span> The entire curriculum can be downloaded from the website.
                <br />
                <div class="images">
                  <q-img :src="FAQ1101" alt="Interacting with Drona - Image 1" width="500px" style="margin-bottom: 15px"></q-img>
                  <q-img :src="FAQ1102" alt="Interacting with Drona - Image 2" width="500px" style="margin-bottom: 15px"></q-img>
                  <q-img :src="FAQ1103" alt="Interacting with Drona - Image 3" width="500px" style="margin-bottom: 15px"></q-img>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Add more content or nested FAQs if needed -->

          <!-- Content for FAQ item 6, 12 -->
        <!-- Content for subFAQs (if any) -->
          <div v-if="faq.subFAQs && faq.subFAQs.length">
            <div v-for="subFaq in faq.subFAQs" :key="subFaq.id">
              <q-expansion-item 
                class="nested-faq-item" 
                :class="{ 'nested-faq-item--active': isExpanded === subFaq.id }"
                @click="toggleExpand(subFaq.id)"
                group="nested-faqs"
                expand-icon="">
                <template v-slot:header>
                  <div class="faq-label">
                    {{ subFaq.title }}
                    <i class="fa"></i>
                  </div>
                </template>
                <q-card>
                  <q-card-section>
                    {{ subFaq.content }}
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>
          </div>

        </q-expansion-item>
      </div>
    </div>

    <!-- Search Input and Suggestions -->
    <div class="search-container">
      <div class="search-wrapper">
        <i class="fas fa-search search-icon"></i>
        <input 
          type="text" 
          v-model="searchQuery" 
          @input="filterFAQs" 
          placeholder="Search FAQs..." 
        />
      </div>
      <div class="suggestions">
        <button @click="filterByCategory('Books')">Books</button>
        <button @click="filterByCategory('Videos')">Videos</button>
        <button @click="filterByCategory('Presentations')">Presentations</button>
        <button @click="filterByCategory('Classrooms')">Classrooms</button>
      </div>
    </div>
  </div>
</template>





<script>
import FAQ101 from "../../assets/FAQ1.01.png";
import FAQ102 from "../../assets/FAQ1.02.png";
import FAQ103 from "../../assets/FAQ1.03.png";
import FAQ104 from "../../assets/FAQ1.04.png";
import FAQ201 from "../../assets/FAQ2.01.png";
import FAQ202 from "../../assets/FAQ2.02.png";
import FAQ23 from "../../assets/FAQ2.3.png";
import FAQ401 from "../../assets/FAQ4.01.png";
import FAQ402 from "../../assets/FAQ4.02.png";
import FAQ403 from "../../assets/FAQ4.03.png";
import FAQ503 from "../../assets/FAQ5.03.png";
import FAQ502 from "../../assets/FAQ5.02.png";
import FAQ501 from "../../assets/FAQ5.01.png";
import FAQ1101 from "../../assets/FAQ11.01.png";
import FAQ1102 from "../../assets/FAQ11.02.png";
import FAQ1103 from "../../assets/FAQ11.03.png";
export default {
  name: 'FAQPage',
  data() {
    return {
      FAQ101:FAQ101,
      FAQ102:FAQ102,
      FAQ103:FAQ103,
      FAQ104:FAQ104,
      FAQ201:FAQ201,
      FAQ202:FAQ202,
      FAQ23:FAQ23,
      FAQ401:FAQ401,
      FAQ402:FAQ402,
      FAQ403:FAQ403,
      FAQ503:FAQ503,
      FAQ502:FAQ502,
      FAQ501:FAQ501,
      FAQ1101:FAQ1101,
      FAQ1102:FAQ1102,
      FAQ1103:FAQ1103,
      
      isExpanded: null, // Track which FAQ item is expanded
      searchQuery: '', // Track the search query
      faqs: [
        {
          id: 1,
          title: "1. How can I access the digital Books?",
          category: "Books",
          content: `Digital books can be accessed through the "Library" section of the Gurukul portal. Once there, you can browse and read the available digital books directly within the platform.` ,
          images: [
            "src/assets/FAQ1.01.png",
            "src/assets/FAQ1.02.png",
            "src/assets/FAQ1.03.png",
            "src/assets/FAQ1.04.png",
          ]
        },
        {
          id: 2,
          title: "2. How to access Videos?",
          category: "Videos",
          content: `Videos can be accessed through the relevant course sections. Navigate to the course materials, and click on the video you wish to watch. The video will play directly in your browser.` ,
          images: [
            "src/assets/FAQ2.01.png",
            "src/assets/FAQ2.02.png",
            "src/assets/FAQ2.3.png"
          ]
        },
        {
          id: 3,
          title: "3. My video streaming is slow. How can I get help?",
          category: "Videos",
          content: `If you are experiencing slow video streaming, check your internet connection first. If the issue persists, email us at "support@finvedic.com" for troubleshooting tips.` ,
        },
        {
          id: 4,
          title: "4. How can I access classroom presentations?",
          category: "Classroom",
          content: `Classroom presentations are available in the "Library" section. Navigate to the appropriate module and click on the presentation files to view them.` ,
          images: [
            "src/assets/FAQ4.01.png",
            "src/assets/FAQ4.02.png",
            "src/assets/FAQ4.03.png"
          ]
        },
        {
          id: 5,
          title: "5. How to interact with Drona?",
          category: "Drona AI",
          content: "Interacting with Drona AI is easy. Access Drona through the main dashboard, and type your questions or requests in the chat interface. Drona will provide responses and recommendations based on your inputs and is available 24/7.",
          images: [
            "src/assets/FAQ5.01.png",
            "src/assets/FAQ5.02.png",
            "src/assets/FAQ5.03.png"
          ]
        },
        {
          id: 6,
          title: "6. Starting with Virtual Labs, a guide",
          category: "Labs",
          subFAQs: [
            { id: 6.1, title: "a. What are Finvedic Labs?", content: `✅ Finvedic Labs are virtual lab environments that allow you to perform practical exercises and experiments related to your course.` },
            { id: 6.2, title: "b. How to access a Virtual Machine (VM)?", content: `✅ To access a VM, go to the "Labs" section of your course. If a lab download is not available, request the VM option. Select the required lab activity, and a VM will be allocated to you. Follow the on-screen instructions to start the VM.` },
            { id: 6.3, title: "c. How many lab hours are provided in this course?", content: `✅ The number of lab hours provided is 200 hours in total.` },
            { id: 6.4, title: "d. After exhausting the lab hours, can I get additional hours for practice?", content: `✅ No, additional hours for practice are not available after the initial 200 hours are exhausted.` },
            { id: 6.5, title: "e. How to close the VM after I use it?", content: `✅ To close the VM, save your work, press the 'X' mark to return to the Gurukul portal, then click the "Shut Down" button.` },
            { id: 6.6, title: "f. How will my work be saved in the labs?", content: `✅ To save your work, you need to create a Git repository where your work will be stored. Ensure you follow the saving procedures outlined in the lab manual.` },
            { id: 6.7, title: "g. How can I submit my work from labs for review?", content: `✅ You can submit your work by uploading it to the "Assignments" section of your course. Follow the instructions provided for submission.` },
            { id: 6.8, title: "h. How will I be able to retrieve my last session in labs?", content: `✅ Your previous session can be retrieved by accessing the Git repository you created before.` },
            { id: 6.9, title: "i. How can I get help if I am stuck with code in the labs?", content: `✅ If you are stuck with code, email us at support@finvedic.com.` },
          ]
        },
        {
          id: 7,
          title: "7. Can I download the digital Books?",
          category: "Books",
          content: `No, digital books are only accessible online through the portal and cannot be downloaded.` ,
        },
        {
          id: 8,
          title: "8. Can I download the classroom presentations?",
          category: "Presentations",
          content: `No, classroom presentations are only available for online viewing.` ,
        },
        {
          id: 9,
          title: "9. Can I download the videos?",
          category: "Videos",
          content: `Video content is generally not available for download to protect intellectual property. Videos can be streamed online through the portal.` ,
        },
        {
          id: 10,
          title: "10. How to update my Profile?",
          category: "Profile",
          content: `To update your profile, go to the "Profile" section at the top right corner in your account settings. Here, you can edit your personal information, change your password, and update other relevant details.` ,
        },
          {
          id: 11,
          title: "11. Where do I find the entire curriculum?",
          category: "Curriculum",
          content: `The entire curriculum can be downloaded from the website.`,
          images: [
            "src/assets/FAQ11.01.png",
            "src/assets/FAQ11.02.png",
            "src/assets/FAQ11.03.png"
          ]
        },
        {
          id: 12,
          title: "12. Virtual Classrooms:",
          category: "Classrooms",
          subFAQs: [
            { id: 12.1, title: "a. How to attend a virtual classroom?", content: `✅ To attend a virtual classroom, click on the Google Meet link provided in your classrooms. Ensure you have a stable internet connection and any required software installed.` },
            { id: 12.2, title: "b. How to ask questions in the virtual classroom?", content:  `✅ During a virtual classroom session, you can ask questions using the chat feature or by using the "Raise Hand" option to speak directly.` },
            { id: 12.3, title: "c. How do I submit my assignments?", content: `✅ Assignments can be submitted by emailing them to support@finvedic.com. Follow the submission guidelines provided.` },
            { id: 12.4, title: "d. What is the duration of the classes?", content: `✅ Class duration varies by course. Check your course schedule for specific class times and durations.` },
            { id: 12.5, title: "e. What if the link to my class is not working?", content: `✅ If the class link is not working, try refreshing the page or using a different browser. If the issue persists, email us at support@finvedic.com.` },
            { id: 12.6, title: "f. How to track my upcoming classes?", content: `✅ You can track your upcoming classes through the "Schedule" section of your dashboard. This section provides a calendar view of all your classes and important dates.` },
          
          ]
        },
        // Add more FAQs as needed
      ],
      filteredFAQs: [] // Store the filtered list of FAQs
    };
  },
  mounted() {
    this.filterFAQs(); // Initial filter setup
  },
  methods: {
    toggleExpand(id) {
      this.isExpanded = this.isExpanded === id ? null : id; // Toggle the expanded state
    },
    filterFAQs() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        this.filteredFAQs = this.faqs; // Show all FAQs if no search query
      } else {
        this.filteredFAQs = this.faqs.filter(faq => {
          // Check if the main FAQ title or any subFAQ title contains the search query
          return faq.title.toLowerCase().includes(query);
        });
      }
    },
    filterByCategory(category) {
      this.filteredFAQs = this.faqs.filter(faq => faq.category === category);
      this.searchQuery = ''; // Clear the search query
    }
  }
};
</script>


<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'); /*for font awesome icon*/

.faq-page {
  display: flex;
  justify-content: space-between;
  margin: 20px;
  height: 80vh; /* Ensure the container has a fixed height */
  
}

.faq-content {
  width: 70%; /* 3/4 of the screen */
  overflow-y: auto; /* Enable vertical scrolling */
}

.search-container {
  width: 23%; /* Remaining 1/4 of the screen */
  margin-right: 5%; /* Optional spacing adjustment */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: 100%; /* Ensure the container doesn't exceed its parent's height */
}

.search-wrapper {
  width: 100%;
  position: relative;
}

.search-wrapper .search-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 20px;
}

.search-container input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 40px;
  box-shadow: 2px 3px 3px #dcdcdc;
}

.suggestions {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.suggestions button {
  color: #5479F7;
  background-color: #f4f4f4;
  border: 1.5px solid #5479F7;
  padding: 10px 20px;
  border-radius: 18px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.suggestions button:hover {
  background-color: #5479F7;
  color: #fff;
}

.bold {
  font-weight: bold;
  font-size: 23px;
}
.head {
  text-align: center;
  margin-bottom: 20px;
}
.faq-label {
  background-color: #5479F7;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  transition: background-color 0.3s;
  font-size: 18px;
  color: #fff;
  
}
.faq-label:hover {
  background-color: #fff;
  color: #5479F7;
 
}

.images {
  display: flex;
  flex-wrap: wrap; /* Allow images to wrap to the next line if necessary */
  justify-content: space-around; /* Center items horizontally */
  margin-top: 3%;
}

.faq-image {
  max-width: 100%; /* Ensure images don't exceed the width of their container */
  height: auto; /* Maintain aspect ratio */
  margin: 0px 5px; /* Add some horizontal margin */
}

.headFaq {
  color: #5479F7;
  font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
}

.faq-label i {
  font-size: 22px;
  position: absolute;
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
  right: 25px;
  top: 20px; /* Adjusted for better positioning */

  
}

.faq-label i::before {
  content: "\f063"; /* Right arrow by default (Font Awesome) */
  font-family: "Font Awesome 5 Free"; /* Ensure you use the correct font family */
  font-weight: 900; /* Required for solid icons */
  display: block;
}

.faq-item--active .faq-label i::before {
  content: "\f062"; /* Up arrow when active (Font Awesome) */
}

/* Custom scrollbar styles */
.faq-content::-webkit-scrollbar,
.search-container::-webkit-scrollbar {
  width: 8px;
}

.faq-content::-webkit-scrollbar-thumb
 {
  background-color: #5479F7;
  border-radius: 10px;
}

.faq-content::-webkit-scrollbar-track
 {
  background-color: #9CC2FB;
  border-radius: 30px;
}
.search-container {
  overflow-x: hidden; /* Hide horizontal scrollbar */
  overflow-y: auto; /* Allow vertical scrolling */
  white-space: nowrap; /* Prevent wrapping that could cause overflow */
}

.search-container * {
  max-width: 100%; /* Ensure all child elements respect container width */
  box-sizing: border-box; /* Include padding and border in element's width */
}

.faq-item .q-expansion-item__toggle-icon {
  display: none;
}
.faq-item .q-expansion-item__container {
  padding: 0; /* Remove padding from the container */
}
.faq-item .q-expansion-item__header {
  padding-right: 0; /* Remove padding on the right */
}
.faq-item .q-item__section.column.q-item__section--side.justify-center.q-focusable.relative-position.cursor-pointer {
  display: none;
}

.faq-item .q-card {
  width: 100%;
}

.faq-item .images {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.faq-item .images img {
  width: 100%;
  max-width: 500px;
  height: auto;
  margin-bottom: 15px;
}

.nested-faq-item .faq-label i {
  font-size: 18px; /* Slightly smaller for nested items */
  position: absolute;
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
  right: 25px;
  top: 20px; /* Adjust as needed */
}

.nested-faq-item .faq-label i::before {
  content: "\f063"; /* Right arrow by default (Font Awesome) */
  font-family: "Font Awesome 5 Free"; /* Ensure you use the correct font family */
  font-weight: 900; /* Required for solid icons */
  display: block;
}

.nested-faq-item.faq-item--active .faq-label i::before {
  content: "\f062"; /* Up arrow when active (Font Awesome) */
}

/* Nested FAQ Styles */
.nested-faq-item .faq-label {
  background-color: #98aefa;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  transition: background-color 0.3s;
  font-size: 16px;
  color: #fff;
  position: relative;
}

.nested-faq-item .faq-label:hover {
  background-color: #fcfcfc;
  color: #98aefa;
}

.nested-faq-item .faq-label i {
  font-size: 18px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.nested-faq-item .faq-label i::before {
  content: "\f063"; /* Font Awesome down arrow */
  font-family: "Font Awesome 5 Free"; /* Ensure you use the correct font family */
  font-weight: 900; /* Required for solid icons */
}

/* Change the icon to an up arrow when the nested FAQ is active */
.nested-faq-item--active .faq-label i::before {
  content: "\f062"; /* Font Awesome up arrow */
}

/* Ensure the expansion item is styled correctly */
.nested-faq-item .q-expansion-item__container {
  padding: 0; /* Remove padding from the container */
}

.nested-faq-item .q-expansion-item__header {
  padding-right: 0; /* Remove padding on the right */
}

.nested-faq-item .q-item__section.column.q-item__section--side.justify-center.q-focusable.relative-position.cursor-pointer {
  display: none;
}

.nested-faq-item .q-card {
  width: 100%;
}

.nested-faq-item .images {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.nested-faq-item .images img {
  width: 100%;
  max-width: 500px;
  height: auto;
  margin-bottom: 15px;
}

/* Styles for the top image */
 .top-image {
  width: 100%;
    height: 46vh !important;
  text-align: center; /* Center the image */
  margin-bottom: 20px; /* Space between the image and the content below */
}

.top-image img {
  width: 100%; /* Make the image responsive */

  max-height: 300px; /* Limit the height of the image */
  object-fit: cover; /* Cover the space, cropping if necessary */
}

</style>