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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rcHJvamVjdC8uL2NsYXNzZXMvaHR0cGNsYXNzLmpzIiwid2VicGFjazovL2twcm9qZWN0Ly4vc2NyaXB0cy9hZGRyZXNzLmpzIiwid2VicGFjazovL2twcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2twcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2twcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va3Byb2plY3Qvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUVlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWE7O0FBRWIsa0NBQWtDLCtCQUErQixjQUFjLEtBQUssVUFBVSxFQUFFO0FBQ2hHLFNBQVM7QUFDVDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0hBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQix1REFBUTs7QUFFekI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJEQUEyRCxNQUFNO0FBQ2pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBLFNBQVM7O0FBRVQsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLEM7O0FBRUEscUJBQXFCLDhCQUE4Qjs7QUFFbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw4QkFBOEIsb0NBQW9DLElBQUksR0FBRyxXQUFXLFNBQVMsSUFBSSxHQUFHLFVBQVUsV0FBVyxJQUFJLEdBQUcsWUFBWSxhQUFhLElBQUksR0FBRyxjQUFjLGFBQWEsSUFBSSxHQUFHLGNBQWMsRUFBRTtBQUNsTixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUzs7O0FBR1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLHlCQUF5Qiw2QkFBNkIsSUFBSSxRQUFRLElBQUksUUFBUSxJQUFJLFFBQVEsSUFBSSxnQ0FBZ0MsR0FBRztBQUN0SztBQUNBLEM7Ozs7Ozs7OztVQzVKQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyBORVcgQXN5bmMgTWV0aG9kIC4uLi5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVhc3lIVFRQIHtcclxuXHJcbiAgICAvLyAgTWFrZSBhbiBIVFRQIFJlcXVlc3RcclxuICAgIGFzeW5jIGdldCh1cmwpIHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XHJcbiAgICAgICAgY29uc3QgcmVzRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gcmVzRGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gIE1ha2UgYW4gSFRUUCBQT1NUIFJlcXVlc3RcclxuICAgIGFzeW5jIHBvc3QodXJsLCBkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6ICh7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgeG94Yi0xNjM2NDU5ODQyNDA1LTE2Mzk4NTE0NTcyMDMtVnJnVjRXUkc3aXRqT2wxZDJBekthRVVQJyxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtjaGFubmVsOlwiQzAxS0hCVTRVSlVcIiwgdGV4dDpgJHt0aGlzLnBvc3Rjb2RlfVxcbiAke3RoaXMuY2l0eX1gfSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCByZXNEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIHJldHVybiByZXNEYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyAgTWFrZSBhbiBIVFRQIFBVVCBSZXF1ZXN0XHJcbiAgICBhc3luYyBwdXQodXJsLCBkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHJlc0RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc0RhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vICBNYWtlIGFuIEhUVFAgREVMRVRFIFJlcXVlc3RcclxuICAgIGFzeW5jIGRlbGV0ZSh1cmwpIHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCByZXNEYXRhID0gYXdhaXQgJ1Jlc291cmNlIERlbGV0ZWQuLi4nO1xyXG4gICAgICAgIHJldHVybiByZXNEYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLy8gRmV0Y2ggQVBJIE1ldGhvZC4uLi5cclxuXHJcbmNsYXNzIEVhc3lIVFRQRmV0Y2gge1xyXG5cclxuICAgIC8vICBNYWtlIGFuIEhUVFAgUmVxdWVzdFxyXG4gICAgZ2V0KHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGZldGNoKHVybClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiByZXNvbHZlKGRhdGEpKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoID0gZXJyID0+IHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gIE1ha2UgYW4gSFRUUCBQT1NUIFJlcXVlc3RcclxuICAgIHBvc3QodXJsLCBkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiByZXNvbHZlKGRhdGEpKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoID0gZXJyID0+IHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gIE1ha2UgYW4gSFRUUCBQVVQgUmVxdWVzdFxyXG4gICAgcHV0KHVybCwgZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiByZXNvbHZlKGRhdGEpKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoID0gZXJyID0+IHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gIE1ha2UgYW4gSFRUUCBERUxFVEUgUmVxdWVzdFxyXG4gICAgZGVsZXRlKHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHJlc29sdmUoJ1Jlc291cmNlIGRlbGV0ZWQnKSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCA9IGVyciA9PiByZWplY3QoZXJyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJcclxuaWYoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpKSB7XHJcblxyXG4gICAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6NzUzMScpXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBkYXRhLnRva2VuKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG5pbXBvcnQgRWFzeUhUVFAgZnJvbSAnLi4vY2xhc3Nlcy9odHRwY2xhc3MnOyAgXHJcblxyXG4vLyBEZWNsYXJpbmcgVmFyaWFibGVzXHJcbmxldCBub20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm9tJyk7XHJcbmxldCB0ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGVsJyk7XHJcbmxldCBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpO1xyXG5sZXQgYWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhdXRvY29tcGxldGUnKTtcclxubGV0IG1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZScpO1xyXG5sZXQgbWFpbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRhJyk7XHJcbmxldCBzZW5kRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZW5kRGV0YWlscycpO1xyXG5cclxuLy8gbG9hZGluZyBhbGwgZXZlbnQgbGlzdGVuZXJzLi4uXHJcbmFkZHJlc3MuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBnZXREYXRhKTtcclxuc2VuZERldGFpbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwb3N0RGF0YSk7XHJcblxyXG4vLyBpbnN0YW50aWF0aW5nIG5ldyBPYmplY3QgZm9yIGh0dHAgY2xhc3MuLi5cclxuY29uc3QgaHR0cCA9IG5ldyBFYXN5SFRUUDtcclxuXHJcbmZ1bmN0aW9uIGdldERhdGEoKXtcclxuXHJcbiAgICBhdXRvQ2xlYXIoKTtcclxuICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dFN0cmVldCcpLnZhbHVlO1xyXG4gICAgLy8gaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9cXHMvZywgJysnKTtcclxuXHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnYXV0b2NvbXBsZXRlZGl2Jyk7XHJcbiAgICBtYWluRGl2LmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgLy8gR0VUIFJFUVVFU1QuLi5cclxuICAgIGh0dHAuZ2V0KGBodHRwczovL2FwaS1hZHJlc3NlLmRhdGEuZ291di5mci9zZWFyY2gvP3E9JHtpbnB1dH0mbGltaXQ9NmApXHJcbiAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICBcclxuICAgICAgICBkYXRhLmZlYXR1cmVzLmZvckVhY2goYWRkID0+IHtcclxuICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnYXV0b2NvbXBsZXRlbGknKTtcclxuICAgICAgICAgICAgbGkuaW5uZXJUZXh0ID0gYWRkLnByb3BlcnRpZXMubGFiZWw7XHJcbiAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZHJlc3MudmFsdWUgPSBsaS5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgICAgICBhdXRvQ2xlYXIoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGxpKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKSAgICAgXHJcblxyXG4gICAgZnVuY3Rpb24gYXV0b0NsZWFyKCl7XHJcbiAgICAgICAgbGV0IGFsbExpc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXV0b2NvbXBsZXRlZGl2Jyk7XHJcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgYWxsTGlzdHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBhbGxMaXN0c1tpXS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gXHJcblxyXG5sZXQgYXV0aCA9IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKX1gO1xyXG5cclxuZnVuY3Rpb24gcG9zdERhdGEoKXtcclxuXHJcbiAgICBmZXRjaCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL2NoYXQucG9zdE1lc3NhZ2UnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMgKHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBhdXRoXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2NoYW5uZWw6XCJDMDFLSEJVNFVKVVwiLCB0ZXh0OmBOQU1FOiR7JyAnfSAkeyBub20udmFsdWV9XFxuIFRFTDokeycgJ30gJHt0ZWwudmFsdWV9XFxuIEVNQUlMOiR7JyAnfSAke2VtYWlsLnZhbHVlfVxcbiBBZGRyZXNzOiR7JyAnfSAke2FkZHJlc3MudmFsdWV9XFxuIE1lc3NhZ2U6JHsnICd9ICR7bWVzc2FnZS52YWx1ZX1gfSlcclxuICAgIH0pXHJcbiAgICBcclxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTdWNjZXNzOicsIGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIC8vICBQT1NUIFJFUVVFU1QuLi4uLlxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGh0dHAucG9zdCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL2NoYXQucG9zdE1lc3NhZ2UnLCBkYXRhKVxyXG4gICAgICAgIC8vICAgICAudGhlbihkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpKVxyXG4gICAgICAgIC8vICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG5cclxuICAgIC8vIC8vIGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcclxuXHQvLyBjaGVja0lucHV0cygpO1xyXG5cclxuICAgIC8vIGZ1bmN0aW9uIGNoZWNrSW5wdXRzKCkge1xyXG5cclxuICAgIC8vICAgICAvLyB0cmltIHRvIHJlbW92ZSB0aGUgd2hpdGVzcGFjZXNcclxuICAgIC8vICAgICBjb25zdCBub21WYWx1ZSA9IG5vbS52YWx1ZS50cmltKCk7XHJcbiAgICAvLyAgICAgY29uc3QgdGVsVmFsdWUgPSB0ZWwudmFsdWUudHJpbSgpO1xyXG4gICAgLy8gICAgIGNvbnN0IGVtYWlsVmFsdWUgPSBlbWFpbC52YWx1ZS50cmltKCk7XHJcbiAgICAvLyAgICAgY29uc3QgYWRkcmVzc1ZhbHVlID0gYWRkcmVzcy52YWx1ZS50cmltKCk7XHJcbiAgICAvLyAgICAgY29uc3QgbWVzc2FnZVZhbHVlID0gbWVzc2FnZU1haW4udmFsdWUudHJpbSgpO1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGlmKG5vbVZhbHVlID09PSAnJykge1xyXG4gICAgLy8gICAgICAgICBzZXRFcnJvckZvcihub20sICduYW1lIGNhbm5vdCBiZSBibGFuaycpO1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgIHNldFN1Y2Nlc3NGb3Iobm9tKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgaWYocGFzc3dvcmRWYWx1ZSA9PT0gJycpIHtcclxuICAgIC8vICAgICAgICAgc2V0RXJyb3JGb3IodGVsLCAnUGFzc3dvcmQgY2Fubm90IGJlIGJsYW5rJyk7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgc2V0U3VjY2Vzc0Zvcih0ZWwpO1xyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vICAgICBpZihlbWFpbFZhbHVlID09PSAnJykge1xyXG4gICAgLy8gICAgICAgICBzZXRFcnJvckZvcihlbWFpbCwgJ0VtYWlsIGNhbm5vdCBiZSBibGFuaycpO1xyXG4gICAgLy8gICAgIH0gZWxzZSBpZiAoIWlzRW1haWwoZW1haWxWYWx1ZSkpIHtcclxuICAgIC8vICAgICAgICAgc2V0RXJyb3JGb3IoZW1haWwsICdOb3QgYSB2YWxpZCBlbWFpbCcpO1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgIHNldFN1Y2Nlc3NGb3IoZW1haWwpO1xyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vICAgICBpZihhZGRyZXNzVmFsdWUgPT09ICcnKSB7XHJcbiAgICAvLyAgICAgICAgIHNldEVycm9yRm9yKGFkZHJlc3MsICdBZGRyZXNzIGNhbm5vdCBiZSBibGFuaycpO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICBzZXRTdWNjZXNzRm9yKGFkZHJlc3MpO1xyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vICAgICBpZihhZGRyZXNzVmFsdWUgPT09ICcnKSB7XHJcbiAgICAvLyAgICAgICAgIHNldEVycm9yRm9yKG1lc3NhZ2VNYWluLCAnTWVzc2FnZSBjYW5ub3QgYmUgYmxhbmsnKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgc2V0U3VjY2Vzc0ZvcihtZXNzYWdlTWFpbik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICAvLyBmdW5jdGlvbiBzZXRFcnJvckZvcihpbnB1dCwgbWVzc2FnZSkge1xyXG4gICAgLy8gICAgIGNvbnN0IGZvcm1Db250cm9sID0gaW5wdXQucGFyZW50RWxlbWVudDtcclxuICAgIC8vICAgICBjb25zdCBzbWFsbCA9IGZvcm1Db250cm9sLnF1ZXJ5U2VsZWN0b3IoJ3NtYWxsJyk7XHJcbiAgICAvLyAgICAgZm9ybUNvbnRyb2wuY2xhc3NOYW1lID0gJ2Zvcm0tY29udHJvbCBlcnJvcic7XHJcbiAgICAvLyAgICAgc21hbGwuaW5uZXJUZXh0ID0gbWVzc2FnZTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgLy8gZnVuY3Rpb24gc2V0U3VjY2Vzc0ZvcihpbnB1dCkge1xyXG4gICAgLy8gICAgIGNvbnN0IGZvcm1Db250cm9sID0gaW5wdXQucGFyZW50RWxlbWVudDtcclxuICAgIC8vICAgICBmb3JtQ29udHJvbC5jbGFzc05hbWUgPSAnZm9ybS1jb250cm9sIHN1Y2Nlc3MnO1xyXG4gICAgLy8gfVxyXG4gICAgICAgIFxyXG4gICAgLy8gZnVuY3Rpb24gaXNFbWFpbChlbWFpbCkge1xyXG4gICAgLy8gICAgIHJldHVybiAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLy50ZXN0KGVtYWlsKTtcclxuICAgIC8vIH1cclxufSAgICBcclxuXHJcblxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NjcmlwdHMvYWRkcmVzcy5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=