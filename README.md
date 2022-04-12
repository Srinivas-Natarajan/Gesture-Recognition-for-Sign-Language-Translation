# Gesture-Recognition-for-Sign-Language-Translation
This program will use gesture detection to help identify common ASL gestures as well as alphabets, translating them into sentences. These will be converted to speach using Google's TTS library. This application will be converted into a Android application for greater usability.


<br>

## Steps to run

1. Install all the required node modules by using `npm install` in the root working directory of the project.
2. Run the express server using the command `nodemon app.js`.
3. The default port is 3000 so open up `localhost:3000` on Google Chrome
4. Let the model load up before predicting the gestures


<br>

## File Descriptions

- `checkpoints`: Contains the Tensorflow checkpoints for various models created during development
- `videos`: Video demonstrations of various models in testing
- `Gesture Training.ipynb`: Notebook to train new gestures and modify existing ones
- `playground.ipynb`: General notebook to test out various feature selection methods as well as mediapipe models

<br> 

## Video Demo


https://user-images.githubusercontent.com/46743379/155891806-f778c457-dad2-483e-9b3c-fdd23c3ea747.mp4

