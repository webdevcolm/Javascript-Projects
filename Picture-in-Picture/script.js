const videoElement = document.getElementById('video');
const button = document.getElementById('button');


// bring up option to play video 
async function selectMediaStream(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = ()=>{
            videoElement.play();
        }

    }
    catch (error){
        console.log('whoops, error', error)
    }
}
button.addEventListener('click', async ()=>{
// disable button
button.disabled = true;
await videoElement.requestPictureInPicture();
// reset button
button.disabled = false;


});

selectMediaStream()