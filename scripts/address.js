
if(!localStorage.getItem('token')) {
    console.log('Hello');

    fetch('http://localhost:7531')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
        });
}



import EasyHTTP from '../classes/httpclass';  

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

    autoClear();
    let input = document.querySelector('.inputStreet').value;
    // input = input.replace(/\s/g, '+');

    let div = document.createElement('div');
    div.classList.add('autocompletediv');
    mainDiv.appendChild(div);

    // GET REQUEST...
    http.get(`https://api-adresse.data.gouv.fr/search/?q=${input}&limit=6`)
    .then(data => {
        
        data.features.forEach(add => {
            let li = document.createElement('li');
            li.classList.add('autocompleteli');
            li.innerText = add.properties.label;
            li.addEventListener('click', (e) => {
                address.value = li.innerText;
                autoClear();
            })
            div.appendChild(li);

        });
        
    })
    .catch(err => console.log(err))     

    function autoClear(){
        let allLists = document.getElementsByClassName('autocompletediv');
        for ( let i = 0; i < allLists.length; i++){
            allLists[i].remove();
        }
    }
} 

let auth = `Bearer ${localStorage.getItem('token')}`;
console.log(auth);

function postData(){

    fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': auth
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

        
        // //  POST REQUEST.....
        
        // http.post('https://slack.com/api/chat.postMessage', data)
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err));

    // // e.preventDefault();
	
	// checkInputs();

    // function checkInputs() {

    //     // trim to remove the whitespaces
    //     const nomValue = nom.value.trim();
    //     const telValue = tel.value.trim();
    //     const emailValue = email.value.trim();
    //     const addressValue = address.value.trim();
    //     const messageValue = messageMain.value.trim();
        
    //     if(nomValue === '') {
    //         setErrorFor(nom, 'name cannot be blank');
    //     } else {
    //         setSuccessFor(nom);
    //     }
        
    //     if(passwordValue === '') {
    //         setErrorFor(tel, 'Password cannot be blank');
    //     } else {
    //         setSuccessFor(tel);
    //     }
        
    //     if(emailValue === '') {
    //         setErrorFor(email, 'Email cannot be blank');
    //     } else if (!isEmail(emailValue)) {
    //         setErrorFor(email, 'Not a valid email');
    //     } else {
    //         setSuccessFor(email);
    //     }
        
    //     if(addressValue === '') {
    //         setErrorFor(address, 'Address cannot be blank');
    //     }else{
    //         setSuccessFor(address);
    //     }
        
    //     if(addressValue === '') {
    //         setErrorFor(messageMain, 'Message cannot be blank');
    //     }else{
    //         setSuccessFor(messageMain);
    //     }
    // }
    
    // function setErrorFor(input, message) {
    //     const formControl = input.parentElement;
    //     const small = formControl.querySelector('small');
    //     formControl.className = 'form-control error';
    //     small.innerText = message;
    // }
    
    // function setSuccessFor(input) {
    //     const formControl = input.parentElement;
    //     formControl.className = 'form-control success';
    // }
        
    // function isEmail(email) {
    //     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    // }
}    


