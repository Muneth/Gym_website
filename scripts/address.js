// Declaring Variables
let nom = document.querySelector('#nom');
let tel = document.querySelector('#tel');
let email = document.querySelector('#email');
let address = document.querySelector('#autocomplete');
let message = document.querySelector('#message');
let mainDiv = document.querySelector('#data');
let sendDetails = document.querySelector('#sendDetails');


// loading all event listeners...
address.addEventListener('keyup', getData);
sendDetails.addEventListener('click', postData);


// instantiating new Object for http class...
const http = new EasyHTTP;

function getData(){

    let input = document.querySelector('.inputStreet').value;

    // input = input.replace(/\s/g, '+');

    // GET REQUEST...
    http.get(`https://api-adresse.data.gouv.fr/search/?q=${input}&limit=6`)
    .then(data => {
        
        data.features.forEach(add => {

            let li = document.createElement('li');

            li.innerText = add.properties.label;

            console.log(li);

            li.addEventListener('click', (e) => {
                console.log('hello');
                address.value = li.innerText;
            })
            
            mainDiv.appendChild(li);
        });

    })
    .catch(err => console.log(err))      
} 

function postData(){

    fetch('https://slack.com/api/chat.postMessage', {
        
        method: 'POST',
        
        headers: new Headers ({
            'Authorization': 'Bearer xoxb-1636459842405-1639851457203-VrgV4WRG7itjOl1d2AzKaEUP',
    
            'Content-Type': 'application/json'
            
        }),
        
        body: JSON.stringify({channel:"C01KHBU4UJU", text:`NAME:${' '} ${ nom.value}\n TEL:${' '} ${tel.value}\n EMAIL:${' '} ${email.value}\n Address:${' '} ${address.value}\n Message:${' '} ${message.value}`})
        
    })
    
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}    

// //  POST REQUEST.....

// http.post('https://slack.com/api/chat.postMessage', data)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
