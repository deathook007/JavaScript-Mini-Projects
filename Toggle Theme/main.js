const container = document.querySelector('.container');
const bodyClass = document.querySelector('body')
document.querySelector('.btn').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const currentRotation = parseInt(getComputedStyle(container).getPropertyValue('--rotation'));
    container.style.setProperty('--rotation', currentRotation + 180);
    if(bodyClass.classList.contains('dark')){
        document.querySelector('.heading').innerHTML = 'Dark Mood Active'
    }
    else {
        document.querySelector('.heading').innerHTML = 'Light Mood Active'
    }
});