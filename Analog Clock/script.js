const hr = document.querySelector('#hr');
const min = document.querySelector('#min');
const sec = document.querySelector('#sec');
const btn = document.querySelector('#btn')
 setInterval(() =>{
     let day = new Date();
     let hh = day.getHours() * 30;
     let mh = day.getMinutes() * 6;
     let sh = day.getSeconds() * 6;
    
    //  Document style change
     hr.style.transform = `rotateZ(${(hh) + (mh / 12)}deg)`;
     min.style.transform = `rotateZ(${(mh) + (sh / 60)}deg)`;
     sec.style.transform = `rotateZ(${sh}deg)`;
 });

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

btn.addEventListener('click',function(e){
    var classes = ['', 'light', 'halloween', 'christmas', 'winter', 'summer'],
    randomClass = classes[getRandomInt(0, classes.length - 1)];
    document.body.className = randomClass;
});  