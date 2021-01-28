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

    fetch('api-slack-token.herokuapp.com')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rcHJvamVjdC8uL2NsYXNzZXMvaHR0cGNsYXNzLmpzIiwid2VicGFjazovL2twcm9qZWN0Ly4vc2NyaXB0cy9hZGRyZXNzLmpzIiwid2VicGFjazovL2twcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2twcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2twcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va3Byb2plY3Qvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUVlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWE7O0FBRWIsa0NBQWtDLCtCQUErQixjQUFjLEtBQUssVUFBVSxFQUFFO0FBQ2hHLFNBQVM7QUFDVDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0hBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQix1REFBUTs7QUFFekI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJEQUEyRCxNQUFNO0FBQ2pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBLFNBQVM7O0FBRVQsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLEM7O0FBRUEscUJBQXFCLDhCQUE4Qjs7QUFFbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw4QkFBOEIsb0NBQW9DLElBQUksR0FBRyxXQUFXLFNBQVMsSUFBSSxHQUFHLFVBQVUsV0FBVyxJQUFJLEdBQUcsWUFBWSxhQUFhLElBQUksR0FBRyxjQUFjLGFBQWEsSUFBSSxHQUFHLGNBQWMsRUFBRTtBQUNsTixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUzs7O0FBR1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLHlCQUF5Qiw2QkFBNkIsSUFBSSxRQUFRLElBQUksUUFBUSxJQUFJLFFBQVEsSUFBSSxnQ0FBZ0MsR0FBRztBQUN0SztBQUNBLEM7Ozs7Ozs7OztVQzVKQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyBORVcgQXN5bmMgTWV0aG9kIC4uLi5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVhc3lIVFRQIHtcclxuXHJcbiAgICAvLyAgTWFrZSBhbiBIVFRQIFJlcXVlc3RcclxuICAgIGFzeW5jIGdldCh1cmwpIHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XHJcbiAgICAgICAgY29uc3QgcmVzRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gcmVzRGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gIE1ha2UgYW4gSFRUUCBQT1NUIFJlcXVlc3RcclxuICAgIGFzeW5jIHBvc3QodXJsLCBkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6ICh7XHJcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgeG94Yi0xNjM2NDU5ODQyNDA1LTE2Mzk4NTE0NTcyMDMtVnJnVjRXUkc3aXRqT2wxZDJBekthRVVQJyxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtjaGFubmVsOlwiQzAxS0hCVTRVSlVcIiwgdGV4dDpgJHt0aGlzLnBvc3Rjb2RlfVxcbiAke3RoaXMuY2l0eX1gfSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCByZXNEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIHJldHVybiByZXNEYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyAgTWFrZSBhbiBIVFRQIFBVVCBSZXF1ZXN0XHJcbiAgICBhc3luYyBwdXQodXJsLCBkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHJlc0RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc0RhdGE7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vICBNYWtlIGFuIEhUVFAgREVMRVRFIFJlcXVlc3RcclxuICAgIGFzeW5jIGRlbGV0ZSh1cmwpIHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCByZXNEYXRhID0gYXdhaXQgJ1Jlc291cmNlIERlbGV0ZWQuLi4nO1xyXG4gICAgICAgIHJldHVybiByZXNEYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLy8gRmV0Y2ggQVBJIE1ldGhvZC4uLi5cclxuXHJcbmNsYXNzIEVhc3lIVFRQRmV0Y2gge1xyXG5cclxuICAgIC8vICBNYWtlIGFuIEhUVFAgUmVxdWVzdFxyXG4gICAgZ2V0KHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGZldGNoKHVybClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiByZXNvbHZlKGRhdGEpKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoID0gZXJyID0+IHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gIE1ha2UgYW4gSFRUUCBQT1NUIFJlcXVlc3RcclxuICAgIHBvc3QodXJsLCBkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiByZXNvbHZlKGRhdGEpKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoID0gZXJyID0+IHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gIE1ha2UgYW4gSFRUUCBQVVQgUmVxdWVzdFxyXG4gICAgcHV0KHVybCwgZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiByZXNvbHZlKGRhdGEpKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoID0gZXJyID0+IHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gIE1ha2UgYW4gSFRUUCBERUxFVEUgUmVxdWVzdFxyXG4gICAgZGVsZXRlKHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHJlc29sdmUoJ1Jlc291cmNlIGRlbGV0ZWQnKSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCA9IGVyciA9PiByZWplY3QoZXJyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJcclxuaWYoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpKSB7XHJcblxyXG4gICAgZmV0Y2goJ2FwaS1zbGFjay10b2tlbi5oZXJva3VhcHAuY29tJylcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIGRhdGEudG9rZW4pO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbmltcG9ydCBFYXN5SFRUUCBmcm9tICcuLi9jbGFzc2VzL2h0dHBjbGFzcyc7ICBcclxuXHJcbi8vIERlY2xhcmluZyBWYXJpYWJsZXNcclxubGV0IG5vbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub20nKTtcclxubGV0IHRlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0ZWwnKTtcclxubGV0IGVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VtYWlsJyk7XHJcbmxldCBhZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2F1dG9jb21wbGV0ZScpO1xyXG5sZXQgbWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlJyk7XHJcbmxldCBtYWluRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGEnKTtcclxubGV0IHNlbmREZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbmREZXRhaWxzJyk7XHJcblxyXG4vLyBsb2FkaW5nIGFsbCBldmVudCBsaXN0ZW5lcnMuLi5cclxuYWRkcmVzcy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGdldERhdGEpO1xyXG5zZW5kRGV0YWlscy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBvc3REYXRhKTtcclxuXHJcbi8vIGluc3RhbnRpYXRpbmcgbmV3IE9iamVjdCBmb3IgaHR0cCBjbGFzcy4uLlxyXG5jb25zdCBodHRwID0gbmV3IEVhc3lIVFRQO1xyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YSgpe1xyXG5cclxuICAgIGF1dG9DbGVhcigpO1xyXG4gICAgbGV0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0U3RyZWV0JykudmFsdWU7XHJcbiAgICAvLyBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1xccy9nLCAnKycpO1xyXG5cclxuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdhdXRvY29tcGxldGVkaXYnKTtcclxuICAgIG1haW5EaXYuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgICAvLyBHRVQgUkVRVUVTVC4uLlxyXG4gICAgaHR0cC5nZXQoYGh0dHBzOi8vYXBpLWFkcmVzc2UuZGF0YS5nb3V2LmZyL3NlYXJjaC8/cT0ke2lucHV0fSZsaW1pdD02YClcclxuICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRhdGEuZmVhdHVyZXMuZm9yRWFjaChhZGQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdhdXRvY29tcGxldGVsaScpO1xyXG4gICAgICAgICAgICBsaS5pbm5lclRleHQgPSBhZGQucHJvcGVydGllcy5sYWJlbDtcclxuICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkcmVzcy52YWx1ZSA9IGxpLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgICAgIGF1dG9DbGVhcigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobGkpO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpICAgICBcclxuXHJcbiAgICBmdW5jdGlvbiBhdXRvQ2xlYXIoKXtcclxuICAgICAgICBsZXQgYWxsTGlzdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhdXRvY29tcGxldGVkaXYnKTtcclxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBhbGxMaXN0cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGFsbExpc3RzW2ldLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSBcclxuXHJcbmxldCBhdXRoID0gYEJlYXJlciAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpfWA7XHJcblxyXG5mdW5jdGlvbiBwb3N0RGF0YSgpe1xyXG5cclxuICAgIGZldGNoKCdodHRwczovL3NsYWNrLmNvbS9hcGkvY2hhdC5wb3N0TWVzc2FnZScsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyAoe1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGF1dGhcclxuICAgICAgICB9KSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7Y2hhbm5lbDpcIkMwMUtIQlU0VUpVXCIsIHRleHQ6YE5BTUU6JHsnICd9ICR7IG5vbS52YWx1ZX1cXG4gVEVMOiR7JyAnfSAke3RlbC52YWx1ZX1cXG4gRU1BSUw6JHsnICd9ICR7ZW1haWwudmFsdWV9XFxuIEFkZHJlc3M6JHsnICd9ICR7YWRkcmVzcy52YWx1ZX1cXG4gTWVzc2FnZTokeycgJ30gJHttZXNzYWdlLnZhbHVlfWB9KVxyXG4gICAgfSlcclxuICAgIFxyXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1N1Y2Nlc3M6JywgZGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gLy8gIFBPU1QgUkVRVUVTVC4uLi4uXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaHR0cC5wb3N0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvY2hhdC5wb3N0TWVzc2FnZScsIGRhdGEpXHJcbiAgICAgICAgLy8gICAgIC50aGVuKGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSkpXHJcbiAgICAgICAgLy8gICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcblxyXG4gICAgLy8gLy8gZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFxyXG5cdC8vIGNoZWNrSW5wdXRzKCk7XHJcblxyXG4gICAgLy8gZnVuY3Rpb24gY2hlY2tJbnB1dHMoKSB7XHJcblxyXG4gICAgLy8gICAgIC8vIHRyaW0gdG8gcmVtb3ZlIHRoZSB3aGl0ZXNwYWNlc1xyXG4gICAgLy8gICAgIGNvbnN0IG5vbVZhbHVlID0gbm9tLnZhbHVlLnRyaW0oKTtcclxuICAgIC8vICAgICBjb25zdCB0ZWxWYWx1ZSA9IHRlbC52YWx1ZS50cmltKCk7XHJcbiAgICAvLyAgICAgY29uc3QgZW1haWxWYWx1ZSA9IGVtYWlsLnZhbHVlLnRyaW0oKTtcclxuICAgIC8vICAgICBjb25zdCBhZGRyZXNzVmFsdWUgPSBhZGRyZXNzLnZhbHVlLnRyaW0oKTtcclxuICAgIC8vICAgICBjb25zdCBtZXNzYWdlVmFsdWUgPSBtZXNzYWdlTWFpbi52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgaWYobm9tVmFsdWUgPT09ICcnKSB7XHJcbiAgICAvLyAgICAgICAgIHNldEVycm9yRm9yKG5vbSwgJ25hbWUgY2Fubm90IGJlIGJsYW5rJyk7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgc2V0U3VjY2Vzc0Zvcihub20pO1xyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vICAgICBpZihwYXNzd29yZFZhbHVlID09PSAnJykge1xyXG4gICAgLy8gICAgICAgICBzZXRFcnJvckZvcih0ZWwsICdQYXNzd29yZCBjYW5ub3QgYmUgYmxhbmsnKTtcclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICBzZXRTdWNjZXNzRm9yKHRlbCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGlmKGVtYWlsVmFsdWUgPT09ICcnKSB7XHJcbiAgICAvLyAgICAgICAgIHNldEVycm9yRm9yKGVtYWlsLCAnRW1haWwgY2Fubm90IGJlIGJsYW5rJyk7XHJcbiAgICAvLyAgICAgfSBlbHNlIGlmICghaXNFbWFpbChlbWFpbFZhbHVlKSkge1xyXG4gICAgLy8gICAgICAgICBzZXRFcnJvckZvcihlbWFpbCwgJ05vdCBhIHZhbGlkIGVtYWlsJyk7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgc2V0U3VjY2Vzc0ZvcihlbWFpbCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGlmKGFkZHJlc3NWYWx1ZSA9PT0gJycpIHtcclxuICAgIC8vICAgICAgICAgc2V0RXJyb3JGb3IoYWRkcmVzcywgJ0FkZHJlc3MgY2Fubm90IGJlIGJsYW5rJyk7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHNldFN1Y2Nlc3NGb3IoYWRkcmVzcyk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGlmKGFkZHJlc3NWYWx1ZSA9PT0gJycpIHtcclxuICAgIC8vICAgICAgICAgc2V0RXJyb3JGb3IobWVzc2FnZU1haW4sICdNZXNzYWdlIGNhbm5vdCBiZSBibGFuaycpO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICBzZXRTdWNjZXNzRm9yKG1lc3NhZ2VNYWluKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vIGZ1bmN0aW9uIHNldEVycm9yRm9yKGlucHV0LCBtZXNzYWdlKSB7XHJcbiAgICAvLyAgICAgY29uc3QgZm9ybUNvbnRyb2wgPSBpbnB1dC5wYXJlbnRFbGVtZW50O1xyXG4gICAgLy8gICAgIGNvbnN0IHNtYWxsID0gZm9ybUNvbnRyb2wucXVlcnlTZWxlY3Rvcignc21hbGwnKTtcclxuICAgIC8vICAgICBmb3JtQ29udHJvbC5jbGFzc05hbWUgPSAnZm9ybS1jb250cm9sIGVycm9yJztcclxuICAgIC8vICAgICBzbWFsbC5pbm5lclRleHQgPSBtZXNzYWdlO1xyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICAvLyBmdW5jdGlvbiBzZXRTdWNjZXNzRm9yKGlucHV0KSB7XHJcbiAgICAvLyAgICAgY29uc3QgZm9ybUNvbnRyb2wgPSBpbnB1dC5wYXJlbnRFbGVtZW50O1xyXG4gICAgLy8gICAgIGZvcm1Db250cm9sLmNsYXNzTmFtZSA9ICdmb3JtLWNvbnRyb2wgc3VjY2Vzcyc7XHJcbiAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAvLyBmdW5jdGlvbiBpc0VtYWlsKGVtYWlsKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLnRlc3QoZW1haWwpO1xyXG4gICAgLy8gfVxyXG59ICAgIFxyXG5cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc2NyaXB0cy9hZGRyZXNzLmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==