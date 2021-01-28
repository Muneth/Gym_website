/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./classes/httpclass.js":
/*!******************************!*\
  !*** ./classes/httpclass.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ EasyHTTP
/* harmony export */ });

// NEW Async Method ....

class EasyHTTP {

    //  Make an HTTP Request
    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }


    //  Make an HTTP POST Request
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: ({
                'Authorization': 'Bearer xoxb-1636459842405-1639851457203-VrgV4WRG7itjOl1d2AzKaEUP',
            
                'Content-Type': 'application/json'
            
            }),
            
            body: JSON.stringify({channel:"C01KHBU4UJU", text:`${this.postcode}\n ${this.city}`})
        });
        const resData = await response.json();
        return resData;
    }


    //  Make an HTTP PUT Request
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }


    //  Make an HTTP DELETE Request
    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const resData = await 'Resource Deleted...';
        return resData;
    }
}


// Fetch API Method....

class EasyHTTPFetch {

    //  Make an HTTP Request
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.json())
                .then(data => resolve(data))
                .catch = err => reject(err);
        });

    }


    //  Make an HTTP POST Request
    post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch = err => reject(err);
        });

    }


    //  Make an HTTP PUT Request
    put(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch = err => reject(err);
        });

    }


    //  Make an HTTP DELETE Request
    delete(url) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(() => resolve('Resource deleted'))
                .catch = err => reject(err);
        });

    }
}




/***/ }),

/***/ "./scripts/address.js":
/*!****************************!*\
  !*** ./scripts/address.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_httpclass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/httpclass */ "./classes/httpclass.js");

if(!localStorage.getItem('token')) {
    console.log('Hello');

    fetch('http://localhost:7531')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
        });
}



  

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
const http = new _classes_httpclass__WEBPACK_IMPORTED_MODULE_0__.default;

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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./scripts/address.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rcHJvamVjdC8uL2NsYXNzZXMvaHR0cGNsYXNzLmpzIiwid2VicGFjazovL2twcm9qZWN0Ly4vc2NyaXB0cy9hZGRyZXNzLmpzIiwid2VicGFjazovL2twcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2twcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2twcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va3Byb2plY3Qvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUVlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWE7O0FBRWIsa0NBQWtDLCtCQUErQixjQUFjLEtBQUssVUFBVSxFQUFFO0FBQ2hHLFNBQVM7QUFDVDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0hBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLHVEQUFROztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkRBQTJELE1BQU07QUFDakU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUEsU0FBUzs7QUFFVCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsQzs7QUFFQSxxQkFBcUIsOEJBQThCO0FBQ25EOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsOEJBQThCLG9DQUFvQyxJQUFJLEdBQUcsV0FBVyxTQUFTLElBQUksR0FBRyxVQUFVLFdBQVcsSUFBSSxHQUFHLFlBQVksYUFBYSxJQUFJLEdBQUcsY0FBYyxhQUFhLElBQUksR0FBRyxjQUFjLEVBQUU7QUFDbE4sS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7OztBQUdUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyx5QkFBeUIsNkJBQTZCLElBQUksUUFBUSxJQUFJLFFBQVEsSUFBSSxRQUFRLElBQUksZ0NBQWdDLEdBQUc7QUFDdEs7QUFDQSxDOzs7Ozs7Ozs7VUM5SkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImFkZHJlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gTkVXIEFzeW5jIE1ldGhvZCAuLi4uXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFYXN5SFRUUCB7XHJcblxyXG4gICAgLy8gIE1ha2UgYW4gSFRUUCBSZXF1ZXN0XHJcbiAgICBhc3luYyBnZXQodXJsKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG4gICAgICAgIGNvbnN0IHJlc0RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc0RhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vICBNYWtlIGFuIEhUVFAgUE9TVCBSZXF1ZXN0XHJcbiAgICBhc3luYyBwb3N0KHVybCwgZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiAoe1xyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyIHhveGItMTYzNjQ1OTg0MjQwNS0xNjM5ODUxNDU3MjAzLVZyZ1Y0V1JHN2l0ak9sMWQyQXpLYUVVUCcsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7Y2hhbm5lbDpcIkMwMUtIQlU0VUpVXCIsIHRleHQ6YCR7dGhpcy5wb3N0Y29kZX1cXG4gJHt0aGlzLmNpdHl9YH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcmVzRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gcmVzRGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gIE1ha2UgYW4gSFRUUCBQVVQgUmVxdWVzdFxyXG4gICAgYXN5bmMgcHV0KHVybCwgZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCByZXNEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIHJldHVybiByZXNEYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyAgTWFrZSBhbiBIVFRQIERFTEVURSBSZXF1ZXN0XHJcbiAgICBhc3luYyBkZWxldGUodXJsKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcmVzRGF0YSA9IGF3YWl0ICdSZXNvdXJjZSBEZWxldGVkLi4uJztcclxuICAgICAgICByZXR1cm4gcmVzRGF0YTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8vIEZldGNoIEFQSSBNZXRob2QuLi4uXHJcblxyXG5jbGFzcyBFYXN5SFRUUEZldGNoIHtcclxuXHJcbiAgICAvLyAgTWFrZSBhbiBIVFRQIFJlcXVlc3RcclxuICAgIGdldCh1cmwpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBmZXRjaCh1cmwpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4gcmVzb2x2ZShkYXRhKSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCA9IGVyciA9PiByZWplY3QoZXJyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vICBNYWtlIGFuIEhUVFAgUE9TVCBSZXF1ZXN0XHJcbiAgICBwb3N0KHVybCwgZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4gcmVzb2x2ZShkYXRhKSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCA9IGVyciA9PiByZWplY3QoZXJyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vICBNYWtlIGFuIEhUVFAgUFVUIFJlcXVlc3RcclxuICAgIHB1dCh1cmwsIGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4gcmVzb2x2ZShkYXRhKSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCA9IGVyciA9PiByZWplY3QoZXJyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vICBNYWtlIGFuIEhUVFAgREVMRVRFIFJlcXVlc3RcclxuICAgIGRlbGV0ZSh1cmwpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiByZXNvbHZlKCdSZXNvdXJjZSBkZWxldGVkJykpXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2ggPSBlcnIgPT4gcmVqZWN0KGVycik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiXHJcbmlmKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSkge1xyXG4gICAgY29uc29sZS5sb2coJ0hlbGxvJyk7XHJcblxyXG4gICAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6NzUzMScpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBkYXRhLnRva2VuKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG5pbXBvcnQgRWFzeUhUVFAgZnJvbSAnLi4vY2xhc3Nlcy9odHRwY2xhc3MnOyAgXHJcblxyXG4vLyBEZWNsYXJpbmcgVmFyaWFibGVzXHJcbmxldCBub20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm9tJyk7XHJcbmxldCB0ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGVsJyk7XHJcbmxldCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpO1xyXG5sZXQgYWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhdXRvY29tcGxldGUnKTtcclxubGV0IG1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZScpO1xyXG5sZXQgbWFpbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRhJyk7XHJcbmxldCBzZW5kRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZW5kRGV0YWlscycpO1xyXG5cclxuLy8gbG9hZGluZyBhbGwgZXZlbnQgbGlzdGVuZXJzLi4uXHJcbmFkZHJlc3MuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBnZXREYXRhKTtcclxuc2VuZERldGFpbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwb3N0RGF0YSk7XHJcblxyXG4vLyBpbnN0YW50aWF0aW5nIG5ldyBPYmplY3QgZm9yIGh0dHAgY2xhc3MuLi5cclxuY29uc3QgaHR0cCA9IG5ldyBFYXN5SFRUUDtcclxuXHJcbmZ1bmN0aW9uIGdldERhdGEoKXtcclxuXHJcbiAgICBhdXRvQ2xlYXIoKTtcclxuICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dFN0cmVldCcpLnZhbHVlO1xyXG4gICAgLy8gaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9cXHMvZywgJysnKTtcclxuXHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnYXV0b2NvbXBsZXRlZGl2Jyk7XHJcbiAgICBtYWluRGl2LmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgLy8gR0VUIFJFUVVFU1QuLi5cclxuICAgIGh0dHAuZ2V0KGBodHRwczovL2FwaS1hZHJlc3NlLmRhdGEuZ291di5mci9zZWFyY2gvP3E9JHtpbnB1dH0mbGltaXQ9NmApXHJcbiAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICBcclxuICAgICAgICBkYXRhLmZlYXR1cmVzLmZvckVhY2goYWRkID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnYXV0b2NvbXBsZXRlbGknKTtcclxuICAgICAgICAgICAgbGkuaW5uZXJUZXh0ID0gYWRkLnByb3BlcnRpZXMubGFiZWw7XHJcbiAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZHJlc3MudmFsdWUgPSBsaS5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgICAgICBhdXRvQ2xlYXIoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGxpKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKSAgICAgXHJcblxyXG4gICAgZnVuY3Rpb24gYXV0b0NsZWFyKCl7XHJcbiAgICAgICAgbGV0IGFsbExpc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXV0b2NvbXBsZXRlZGl2Jyk7XHJcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgYWxsTGlzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBhbGxMaXN0c1tpXS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gXHJcblxyXG5sZXQgYXV0aCA9IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKX1gO1xyXG5jb25zb2xlLmxvZyhhdXRoKTtcclxuXHJcbmZ1bmN0aW9uIHBvc3REYXRhKCl7XHJcblxyXG4gICAgZmV0Y2goJ2h0dHBzOi8vc2xhY2suY29tL2FwaS9jaGF0LnBvc3RNZXNzYWdlJywge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzICh7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYXV0aFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtjaGFubmVsOlwiQzAxS0hCVTRVSlVcIiwgdGV4dDpgTkFNRTokeycgJ30gJHsgbm9tLnZhbHVlfVxcbiBURUw6JHsnICd9ICR7dGVsLnZhbHVlfVxcbiBFTUFJTDokeycgJ30gJHtlbWFpbC52YWx1ZX1cXG4gQWRkcmVzczokeycgJ30gJHthZGRyZXNzLnZhbHVlfVxcbiBNZXNzYWdlOiR7JyAnfSAke21lc3NhZ2UudmFsdWV9YH0pXHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnU3VjY2VzczonLCBkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAvLyAvLyAgUE9TVCBSRVFVRVNULi4uLi5cclxuICAgICAgICBcclxuICAgICAgICAvLyBodHRwLnBvc3QoJ2h0dHBzOi8vc2xhY2suY29tL2FwaS9jaGF0LnBvc3RNZXNzYWdlJywgZGF0YSlcclxuICAgICAgICAvLyAgICAgLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSlcclxuICAgICAgICAvLyAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuXHJcbiAgICAvLyAvLyBlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHJcblx0Ly8gY2hlY2tJbnB1dHMoKTtcclxuXHJcbiAgICAvLyBmdW5jdGlvbiBjaGVja0lucHV0cygpIHtcclxuXHJcbiAgICAvLyAgICAgLy8gdHJpbSB0byByZW1vdmUgdGhlIHdoaXRlc3BhY2VzXHJcbiAgICAvLyAgICAgY29uc3Qgbm9tVmFsdWUgPSBub20udmFsdWUudHJpbSgpO1xyXG4gICAgLy8gICAgIGNvbnN0IHRlbFZhbHVlID0gdGVsLnZhbHVlLnRyaW0oKTtcclxuICAgIC8vICAgICBjb25zdCBlbWFpbFZhbHVlID0gZW1haWwudmFsdWUudHJpbSgpO1xyXG4gICAgLy8gICAgIGNvbnN0IGFkZHJlc3NWYWx1ZSA9IGFkZHJlc3MudmFsdWUudHJpbSgpO1xyXG4gICAgLy8gICAgIGNvbnN0IG1lc3NhZ2VWYWx1ZSA9IG1lc3NhZ2VNYWluLnZhbHVlLnRyaW0oKTtcclxuICAgICAgICBcclxuICAgIC8vICAgICBpZihub21WYWx1ZSA9PT0gJycpIHtcclxuICAgIC8vICAgICAgICAgc2V0RXJyb3JGb3Iobm9tLCAnbmFtZSBjYW5ub3QgYmUgYmxhbmsnKTtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICBzZXRTdWNjZXNzRm9yKG5vbSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGlmKHBhc3N3b3JkVmFsdWUgPT09ICcnKSB7XHJcbiAgICAvLyAgICAgICAgIHNldEVycm9yRm9yKHRlbCwgJ1Bhc3N3b3JkIGNhbm5vdCBiZSBibGFuaycpO1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgIHNldFN1Y2Nlc3NGb3IodGVsKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgaWYoZW1haWxWYWx1ZSA9PT0gJycpIHtcclxuICAgIC8vICAgICAgICAgc2V0RXJyb3JGb3IoZW1haWwsICdFbWFpbCBjYW5ub3QgYmUgYmxhbmsnKTtcclxuICAgIC8vICAgICB9IGVsc2UgaWYgKCFpc0VtYWlsKGVtYWlsVmFsdWUpKSB7XHJcbiAgICAvLyAgICAgICAgIHNldEVycm9yRm9yKGVtYWlsLCAnTm90IGEgdmFsaWQgZW1haWwnKTtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICBzZXRTdWNjZXNzRm9yKGVtYWlsKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgaWYoYWRkcmVzc1ZhbHVlID09PSAnJykge1xyXG4gICAgLy8gICAgICAgICBzZXRFcnJvckZvcihhZGRyZXNzLCAnQWRkcmVzcyBjYW5ub3QgYmUgYmxhbmsnKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgc2V0U3VjY2Vzc0ZvcihhZGRyZXNzKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgaWYoYWRkcmVzc1ZhbHVlID09PSAnJykge1xyXG4gICAgLy8gICAgICAgICBzZXRFcnJvckZvcihtZXNzYWdlTWFpbiwgJ01lc3NhZ2UgY2Fubm90IGJlIGJsYW5rJyk7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHNldFN1Y2Nlc3NGb3IobWVzc2FnZU1haW4pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgLy8gZnVuY3Rpb24gc2V0RXJyb3JGb3IoaW5wdXQsIG1lc3NhZ2UpIHtcclxuICAgIC8vICAgICBjb25zdCBmb3JtQ29udHJvbCA9IGlucHV0LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAvLyAgICAgY29uc3Qgc21hbGwgPSBmb3JtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCdzbWFsbCcpO1xyXG4gICAgLy8gICAgIGZvcm1Db250cm9sLmNsYXNzTmFtZSA9ICdmb3JtLWNvbnRyb2wgZXJyb3InO1xyXG4gICAgLy8gICAgIHNtYWxsLmlubmVyVGV4dCA9IG1lc3NhZ2U7XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vIGZ1bmN0aW9uIHNldFN1Y2Nlc3NGb3IoaW5wdXQpIHtcclxuICAgIC8vICAgICBjb25zdCBmb3JtQ29udHJvbCA9IGlucHV0LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAvLyAgICAgZm9ybUNvbnRyb2wuY2xhc3NOYW1lID0gJ2Zvcm0tY29udHJvbCBzdWNjZXNzJztcclxuICAgIC8vIH1cclxuICAgICAgICBcclxuICAgIC8vIGZ1bmN0aW9uIGlzRW1haWwoZW1haWwpIHtcclxuICAgIC8vICAgICByZXR1cm4gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC8udGVzdChlbWFpbCk7XHJcbiAgICAvLyB9XHJcbn0gICAgXHJcblxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zY3JpcHRzL2FkZHJlc3MuanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9