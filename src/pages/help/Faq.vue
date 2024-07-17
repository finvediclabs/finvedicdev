<template>
  <div class="head text-center q-mb-md">
    <h3>FAQ's</h3>
  </div>
  <div class="cont q-mb-md">
    <q-list bordered>
      <q-expansion-item class="faq-item" group="faqs" expand-icon="mdi-chevron-down">
        <template v-slot:header>
          <div class="faq-label">1. How can I access the digital books?</div>
        </template>

        <!-- Question 1 -->
        
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> Digital books can be accessed through the "Library" section of the Gurukul portal. Once there, you can browse and read the available digital books directly within the platform.
            </q-card-section>
          </q-card>
        </q-expansion-item>
       
     
      
      <!-- Question 2 -->
      <q-expansion-item class="faq-item" group="faqs" expand-icon="mdi-chevron-down">
        <template v-slot:header>
          <div class="faq-label">2. How to access videos?</div>
        </template>
     
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> Videos can be accessed through the relevant course sections. Navigate to the course materials, and click on the video you wish to watch. The video will play directly in your browser.
            </q-card-section>
          </q-card>
        </q-expansion-item>
    

      <!-- Question 3 -->
      <q-expansion-item class="faq-item" group="faqs" expand-icon="mdi-chevron-down">
        <template v-slot:header>
          <div class="faq-label">3. My video streaming is slow. How can I get help?</div>
        </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span>If you are experiencing slow video streaming, check your internet connection first. If the issue persists, email us at support@finvedic.com for troubleshooting tips.
            </q-card-section>
          </q-card>
       
      </q-expansion-item>

      <!-- Question 4 -->
      <q-expansion-item class="faq-item" group="faqs" expand-icon="mdi-chevron-down">
        <template v-slot:header>
          <div class="faq-label">4. How can I access classroom presentations?</div>
        </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span>  Classroom presentations are available in the "Library" section. Navigate to the appropriate module and click on the presentation files to view them.
            </q-card-section>
          </q-card>
        
      </q-expansion-item>

      <!-- Question 5 -->
      <q-expansion-item class="faq-item" group="faqs" expand-icon="mdi-chevron-down">
        <template v-slot:header>
          <div class="faq-label">5. How to interact with Drona?</div>
        </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span>Interacting with Drona AI is easy. Access Drona through the main dashboard, and type your questions or requests in the chat interface. Drona will provide responses and recommendations based on your inputs and is available 24/7.
            </q-card-section>
          </q-card>
       
      </q-expansion-item>

      <!-- Question 6 -->
      <q-expansion-item class="faq-item" group="faqs" expand-icon="mdi-chevron-down">
        <template v-slot:header>
          <div class="faq-label">6. Starting with Virtual Labs, a guide:</div>
        </template>
        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label"> a. What are Finvedic Labs?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> Finvedic Labs are virtual lab environments that allow you to perform practical exercises and experiments related to your course.
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label"> b. How to access a Virtual Machine (VM)?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span>  To access a VM, go to the "Labs" section of your course. If a lab download is not available, request the VM option. Select the required lab activity, and a VM will be allocated to you. Follow the on-screen instructions to start the VM.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">c. How many lab hours are provided in this course?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> The number of lab hours provided is 200 hours in total.
            </q-card-section>
          </q-card>
        </q-expansion-item>
        

        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">d. After exhausting the lab hours, can I get additional hours for practice?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span>  No, additional hours for practice are not available after the initial 200 hours are exhausted.
            </q-card-section>
          </q-card>
        </q-expansion-item>


        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">e. How to close the VM after I use it?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> To close the VM, save your work, press the 'X' mark to return to the Gurukul portal, then click the "Shut Down" button.
            </q-card-section>
          </q-card>
        </q-expansion-item>


        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">f. How will my work be saved in the labs?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> To save your work, you need to create a Git repository where your work will be stored. Ensure you follow the saving procedures outlined in the lab manual.
            </q-card-section>
          </q-card>
        </q-expansion-item>


        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">g. How can I submit my work from labs for review?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> You can submit your work by uploading it to the "Assignments" section of your course. Follow the instructions provided for submission.
            </q-card-section>
          </q-card>
        </q-expansion-item>


        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">h. How will I be able to retrieve my last session in labs?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> Your previous session can be retrieved by accessing the Git repository you created before.
            </q-card-section>
          </q-card>
        </q-expansion-item>


        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">i. How can I get help if I am stuck with code in the labs?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> If you are stuck with code, email us at support@finvedic.com.
            </q-card-section>
          </q-card>
        </q-expansion-item>

      </q-expansion-item>

      <!-- Question 7 -->
      <q-expansion-item class="faq-item" group="faqs" expand-icon="mdi-chevron-down">
        <template v-slot:header>
          <div class="faq-label">7. Can I download the digital books?</div>
        </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> No, digital books are only accessible online through the portal and cannot be downloaded.
            </q-card-section>
          </q-card>
       
      </q-expansion-item>

      <!-- Question 8 -->
      <q-expansion-item class="faq-item" group="faqs" expand-icon="mdi-chevron-down">
        <template v-slot:header>
          <div class="faq-label">8. Can I download the classroom presentations?</div>
        </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> No, classroom presentations are only available for online viewing.
            </q-card-section>
          </q-card>
       
      </q-expansion-item>

      <!-- Question 9 -->
      <q-expansion-item class="faq-item" group="faqs" expand-icon="mdi-chevron-down">
        <template v-slot:header>
          <div class="faq-label">9. Can I download the videos?</div>
        </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> Video content is generally not available for download to protect intellectual property. Videos can be streamed online through the portal.
            </q-card-section>
          </q-card>
      </q-expansion-item>

      <!-- Question 10 -->
      <q-expansion-item class="faq-item" group="faqs" expand-icon="mdi-chevron-down">
        <template v-slot:header>
          <div class="faq-label">10. How to update my profile?</div>
        </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> To update your profile, go to the "Profile" section at the top right corner in your account settings. Here, you can edit your personal information, change your password, and update other relevant details.
            </q-card-section>
          </q-card>
      </q-expansion-item>

      <!-- Question 11 -->
      <q-expansion-item class="faq-item" group="faqs" expand-icon="mdi-chevron-down">
        <template v-slot:header>
          <div class="faq-label">11. Where do I find the entire curriculum?</div>
        </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> The entire curriculum can be downloaded from the website.
            </q-card-section>
          </q-card>
      </q-expansion-item>

      <!-- Question 12 -->
      <q-expansion-item class="faq-item" group="faqs" expand-icon="mdi-chevron-down">
        <template v-slot:header>
          <div class="faq-label">12. Virtual Classrooms:</div>
        </template>
        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">a. How to attend a virtual classroom?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> To attend a virtual classroom, click on the Google Meet link provided in your classrooms. Ensure you have a stable internet connection and any required software installed.
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">b. How to ask questions in the virtual classroom?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> During a virtual classroom session, you can ask questions using the chat feature or by using the "Raise Hand" option to speak directly.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">c. How do I submit my assignments?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> Assignments can be submitted by emailing them to support@finvedic.com. Follow the submission guidelines provided.
            </q-card-section>
          </q-card>
        </q-expansion-item>
        

        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">d. What is the duration of the classes?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> Class duration varies by course. Check your course schedule for specific class times and durations.
            </q-card-section>
          </q-card>
        </q-expansion-item>


        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">e. What if the link to my class is not working?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span>  If the class link is not working, try refreshing the page or using a different browser. If the issue persists, email us at support@finvedic.com.
            </q-card-section>
          </q-card>
        </q-expansion-item>


        <q-expansion-item class="nested-faq-item" group="nested-faqs" expand-icon="mdi-chevron-down">
          <template v-slot:header>
            <div class="faq-label">f. How to track my upcoming classes?</div>
          </template>
          <q-card>
            <q-card-section>
              <span class="bold">✅</span> You can track your upcoming classes through the "Schedule" section of your dashboard. This section provides a calendar view of all your classes and important dates.
            </q-card-section>
          </q-card>
        </q-expansion-item>



      </q-expansion-item>

     
      
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'FAQPage'
}
</script>

<style scoped>
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
  color: #083461;
}
.faq-label:hover {
  background-color: #fff;
  color: #5479F7;
}
.nested-faq-item .faq-label {
  background-color: #98aefa;
}
.nested-faq-item .faq-label:hover {
  background-color: #98aefa;
   
  color: #fff;
}
</style>
