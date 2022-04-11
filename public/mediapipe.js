let DOM_EL = {
    video: null,
    canvas: null,
    ctx: null
}

window.addEventListener('DOMContentLoaded', () => {
    // assign references
    DOM_EL.video = document.getElementsByClassName('input_video')[0];
    DOM_EL.canvas = document.getElementsByClassName('output_canvas')[0];
    DOM_EL.canvas.width = window.innerWidth;
    DOM_EL.canvas.height = window.innerWidth;
    DOM_EL.ctx = DOM_EL.canvas.getContext("2d", { alpha: false, desynchronized: false });
  
    init();
  })

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');      

function get_angles(a,b,c){
    ang = (Math.atan2(c[1]-b[1], c[0]-b[0]) - Math.atan2(a[1]-b[1], a[0]-b[0])) * (180/Math.PI);
    if(ang<0)
        return 360 + ang;
    else
        return ang;                                                 
}

console.log("Start Load");

var model;

async function loadModel(){
    const model = await tf.loadLayersModel('model.json')
    return model;
}

let loadedModel = loadModel().then((resolve, reject)=>{
    model = resolve;
    }).then(function() {
        console.log("Model: ", model) // logs "foo"
});


function onResults(results) {

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks) {

        const landmark_list =[];

        for (const landmarks of results.multiHandLandmarks) {

            for(let i=0; i<21; i++){
            const temp = [landmarks[i].x, landmarks[i].y]
            landmark_list.push(temp);
            }

            // console.log("Landmarks: ", landmark_list, landmark_list.length, landmark_list[0].length);
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                        {color: '#00FF00', lineWidth: 5});
            drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
            
            console.log(model);
            console.log(tf.tensor([landmark_list]));
            console.log(model.predict(tf.tensor(landmark_list)));
        }
    }
    canvasCtx.restore();
}


const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});


hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({image: videoElement});
    },
    width: 1280,
    height: 720
});

camera.start();