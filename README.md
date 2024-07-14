CODE CHALLENGE #3 DETAILS

Project Structure and How to Run It

How to Run:
-For the Frontend directory, I used Vite for coding, so to run it, you will use the command npm run dev.
-For the Backend directory, I used ExpressJS. I also made a small change in the package.json file so that when you run it, it will build as well. However, if there are any changes in the backend, you will need to rerun it. The command to run is npm start.

Project Structure:
-Initially, when accessing the website, users will first go to the login section, specifically by entering their phone number and receiving an access code to log in. Simultaneously, an account will be created in Firestore. A small issue here is that the code will be sent not from the backend but from Firebase Auth because I have issues with Twilio and other SMS APIs.

-After entering the verification code, the phone number will be saved in the browser's localStorage. Then it will automatically navigate to the main interface, which includes the Dashboard and Login.

-In the Dashboard section, there will be Services and Profile:
-Services: After entering the necessary information and clicking on "Generate Captions" and "Get Post Ideas", the frontend will send a request to the backend to use Gemini and create captions and post ideas based on the inputs. The backend will then return a JSON response to the frontend, which will be rendered on the interface.
-The captions and post ideas displayed in the view will have save and share functions. Save will store them in the database, which in this case is Firestore, using the user's phone number (saved in localStorage). Share defaults to sharing on Facebook.
-Profile: The first step is to retrieve the phone number from localStorage and send a request to fetch the content saved in the previous steps based on the phone number.

-Currently, this is all there is as there are still many bugs to fix.

SOME IMAGES
-Login page
![image](https://github.com/user-attachments/assets/aa0d5860-1fef-49aa-8980-cfee9cb01a19)

-Home
![image](https://github.com/user-attachments/assets/a540be56-3f27-4caa-9889-cfe7e99c6055)

-Dashboard
![image](https://github.com/user-attachments/assets/697d77e5-11bd-49f5-91ac-b169675bc34f)

-Services
![image](https://github.com/user-attachments/assets/22b292fa-2119-42cf-91da-b9f9ce8eda71)

![image](https://github.com/user-attachments/assets/17a9a527-5e0a-430e-a01a-f580e4d61d07)

-mp4 about firebase send the code to access

https://github.com/user-attachments/assets/54ccdc19-e2cb-4492-ab4b-f41ebe63bfe1






