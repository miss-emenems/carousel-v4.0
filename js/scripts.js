// ---- Load APIs ---- //


const root = document.getElementById('root');

var request = new XMLHttpRequest(),
    method = 'GET',
    src = root.getAttribute('data-api');

request.open(method, src , true);


// Make data available for not looped elements
function onload() {
    return new Promise(function(resolve) {
        if (document.readyState === 'complete') { return resolve(); }
        request.addEventListener('load', resolve);
    });
}

let dataAvailable = onload().then(function () {
    const data = JSON.parse(request.response);

    return data;
});

request.send();


// ---- Create carousel elements ---- //


// Create carousel elements - path

const carouselPath = document.createElement('div');
carouselPath.setAttribute('class', 'carousel__path');


// Create carousel elements - Prev button

const buttonPrev = document.createElement('button')
buttonPrev.setAttribute('class', 'carousel__button carousel__button--prev');
buttonPrev.setAttribute('onclick', 'showPrev()');
buttonPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';


// Create carousel elements - Next button

const buttonNext = document.createElement('button')
buttonNext.setAttribute('class', 'carousel__button carousel__button--next');
buttonNext.setAttribute('onclick', 'showNext()');
buttonNext.innerHTML = '<i class="fas fa-chevron-right"></i>';


// Render carousel elements

root.appendChild(carouselPath);
root.appendChild(buttonPrev);
root.appendChild(buttonNext);



// ---- Set up width for carousel path ---- //


const carouselWidth = root.offsetWidth;

dataAvailable.then(function pathLength(data) {

    const numberOfItems = data.length;
    const pathFullLength = numberOfItems * carouselWidth + 'px';

    carouselPath.style.width = pathFullLength;

    return pathFullLength;

});



// ---- Change position of the carousel path when click on nav buttons ---- //


let pathPosition = 0; // Set up start value to calculate updated position

// Both functions (showPrev, showNext) triggered by onclick event
function showPrev() {

    dataAvailable.then(function (data) {

        pathPosition--;

        if (pathPosition === data.length*(-1)) {
            pathPosition = 0;
        }

        if (pathPosition > -1) {
            carouselPath.style.left = (carouselWidth * pathPosition)*(-1) + 'px';
        } else if (pathPosition >= data.length*(-1)) {
            carouselPath.style.left = (carouselWidth * pathPosition)*(-1) + (carouselWidth)*(data.length)*(-1) + 'px';
        }

        console.log('Prev clicked', pathPosition, '; path moved to:', carouselPath.style.left);

    });

}

function showNext() {
    dataAvailable.then(function (data) {
        pathPosition++;

        if (pathPosition === data.length) {
            pathPosition = 0;
        }

        if (pathPosition <= -1) {
            carouselPath.style.left = (carouselWidth * pathPosition)*(-1) + (carouselWidth)*(data.length)*(-1) + 'px';
        } else if (pathPosition < data.length) {
            carouselPath.style.left = (carouselWidth * pathPosition)*(-1) + 'px';
        }

        console.log('Next clicked', pathPosition, '; path moved to:', carouselPath.style.left);

    });

}


// ---- Open and close overview popup ---- //

expandSlideContent();

function expandSlideContent() {
    document.onclick = function(e, slideId) {

        slideId = e.target.getAttribute('data-target');

        if (e.target.classList.contains('button--expand')) {

            document.getElementById(slideId).classList.add('expanded');

        }

        else if (e.target.classList.contains('button--close')) {

            document.getElementById(slideId).classList.remove('expanded');

        }
    }
}


// ---- Create slide elements ---- //

dataAvailable.then(function populateSlide(data) {
    console.log(request.status);
    console.log(data);
    if (request.status >= 200) {
        data.forEach(item => {

            // Create slide
            const slide = document.createElement('div');
            slide.setAttribute('class', 'slide');
            slide.setAttribute('style', 'background-image: url("' + item.imageUrl + '")' );


            // Create custom class name (for styling purposes)
            const slideBody = document.createElement('div');
            let customClass = root.getAttribute('data-slide-class');
            slideBody.setAttribute('class', customClass);
            slideBody.setAttribute('id', item.id);

            // Create inner container for content
            const slideContent = document.createElement('div');
            slideContent.setAttribute('class', 'slide__content');

            // Create html elements for text
            const h2 = document.createElement('h2');
            h2.textContent = item.title;

            const height = document.createElement('div');
            height.setAttribute('class', 'height');
            height.textContent = 'Height: ' + item.height;

            const deathRate = document.createElement('div');
            deathRate.setAttribute('class', 'death-rate');
            deathRate.textContent = 'Death Rate: ' + item.height;

            const pFull = document.createElement('p');
            pFull.setAttribute('class', 'description');
            if (window.innerHeight > 800 ) {
                pFull.textContent = item.description;
            } else {
                pFull.textContent = item.description.substring(0,300) + "...";
            }


            const img = document.createElement('div');
            img.setAttribute('class', 'slide__image');
            img.setAttribute('style', 'background-image: url("' + item.imageUrl + '")' );

            const link = document.createElement('a');
            link.setAttribute('class', 'button--g4m button--shop');
            link.setAttribute('href', item.url);
            link.setAttribute('target', '_blank');
            link.textContent = "Learn more";


            //Create expand and close buttons to access and escape full details popups
            const buttonExpand = document.createElement('button');
            buttonExpand.setAttribute('class', 'button--g4m button--expand');
            buttonExpand.setAttribute('data-target', item.id );
            buttonExpand.innerHTML = 'Details  <i class="fa fa-search"></i>';

            const buttonClose = document.createElement('button');
            buttonClose.setAttribute('class', 'button--close');
            buttonClose.setAttribute('data-target', item.id );
            buttonClose.innerHTML = '<i class="fa fa-times"></i>';


            // Render slide content elements
            carouselPath.appendChild(slide);
            slide.appendChild(slideBody);
            slideBody.appendChild(slideContent);
            slideBody.appendChild(img);
            slideBody.appendChild(buttonClose);

            slideContent.innerHTML+= h2.outerHTML + height.outerHTML + deathRate.outerHTML + pFull.outerHTML + link.outerHTML + buttonExpand.outerHTML;


            // Force dimensions of each slide (needed to keep active slide in their place when popup is revealed
            slide.style.width = carouselWidth + 'px';

        });
    }


});