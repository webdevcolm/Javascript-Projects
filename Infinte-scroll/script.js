const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// unsplash api
const count = 30;
const apiKey = 'dlMy6FYM3tded4unWzPQZ2UogqHpe4t4s6gpLxTUkdg';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images are loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true
    }
}

function setAttributes(element, attributes){
    for ( const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

    // Create Element for link and photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photoArray.length;
    photoArray.forEach((photo)=>{
        // Create <a> to link to unsplash
        const item= document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // creare <img>
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,


        });
        // event listner see if all img are loaded
        img.addEventListener('load', imageLoaded)

        // put img inside <a>, then put both inside omagecontainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// get photos
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    }catch(error){

    }
}
// check to see if photos will run out 
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();

    }
})
// on load
getPhotos()