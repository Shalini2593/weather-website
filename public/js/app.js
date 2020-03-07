console.log('Client side js file is loaded.')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    const weatherForm = document.querySelector('form');
    const message1 = document.getElementById('message-1');
    const message2 = document.querySelector('#message-2');

    message1.textContent = '';
    message2.textContent = '';
    
    weatherForm.addEventListener('submit', (e) => {
    
        e.preventDefault();

        message1.style.color = null;    
        message1.textContent = 'Loading...';
        const location = document.getElementById('address');
    
        fetch('http://localhost:3000/weather?address=' + location.value).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log('Error : ', data.error);
                    message1.textContent = data.error;
                    message1.style.color = 'red';
                }
                else {
                    console.log(data.location);
                    console.log(data.forecast);
                    message1.textContent = data.location;
                    message2.textContent = data.forecast;
                }
            });
        });
    });
});
