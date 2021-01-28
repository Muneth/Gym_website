/******/ (() => { // webpackBootstrap
/*!****************************!*\
  !*** ./scripts/appform.js ***!
  \****************************/
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rcHJvamVjdC8uL3NjcmlwdHMvYXBwZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQix5QkFBeUIsNkJBQTZCLElBQUksUUFBUSxJQUFJLFFBQVEsSUFBSSxRQUFRLElBQUksZ0NBQWdDLEdBQUc7QUFDNUosQyIsImZpbGUiOiJmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtJyk7XHJcbmNvbnN0IHVzZXJuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJyk7XHJcbmNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtYWlsJyk7XHJcbmNvbnN0IHBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkJyk7XHJcbmNvbnN0IHBhc3N3b3JkMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXNzd29yZDInKTtcclxuXHJcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZSA9PiB7XHJcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFxyXG5cdGNoZWNrSW5wdXRzKCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY2hlY2tJbnB1dHMoKSB7XHJcblx0XHJcblx0Ly8gdHJpbSB0byByZW1vdmUgdGhlIHdoaXRlc3BhY2VzXHJcblx0Y29uc3QgdXNlcm5hbWVWYWx1ZSA9IHVzZXJuYW1lLnZhbHVlLnRyaW0oKTtcclxuXHRjb25zdCBlbWFpbFZhbHVlID0gZW1haWwudmFsdWUudHJpbSgpO1xyXG5cdGNvbnN0IHBhc3N3b3JkVmFsdWUgPSBwYXNzd29yZC52YWx1ZS50cmltKCk7XHJcblx0Y29uc3QgcGFzc3dvcmQyVmFsdWUgPSBwYXNzd29yZDIudmFsdWUudHJpbSgpO1xyXG5cdFxyXG5cdGlmKHVzZXJuYW1lVmFsdWUgPT09ICcnKSB7XHJcblx0XHRzZXRFcnJvckZvcih1c2VybmFtZSwgJ1VzZXJuYW1lIGNhbm5vdCBiZSBibGFuaycpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzZXRTdWNjZXNzRm9yKHVzZXJuYW1lKTtcclxuXHR9XHJcblx0XHJcblx0aWYoZW1haWxWYWx1ZSA9PT0gJycpIHtcclxuXHRcdHNldEVycm9yRm9yKGVtYWlsLCAnRW1haWwgY2Fubm90IGJlIGJsYW5rJyk7XHJcblx0fSBlbHNlIGlmICghaXNFbWFpbChlbWFpbFZhbHVlKSkge1xyXG5cdFx0c2V0RXJyb3JGb3IoZW1haWwsICdOb3QgYSB2YWxpZCBlbWFpbCcpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzZXRTdWNjZXNzRm9yKGVtYWlsKTtcclxuXHR9XHJcblx0XHJcblx0aWYocGFzc3dvcmRWYWx1ZSA9PT0gJycpIHtcclxuXHRcdHNldEVycm9yRm9yKHBhc3N3b3JkLCAnUGFzc3dvcmQgY2Fubm90IGJlIGJsYW5rJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHNldFN1Y2Nlc3NGb3IocGFzc3dvcmQpO1xyXG5cdH1cclxuXHRcclxuXHRpZihwYXNzd29yZDJWYWx1ZSA9PT0gJycpIHtcclxuXHRcdHNldEVycm9yRm9yKHBhc3N3b3JkMiwgJ1Bhc3N3b3JkIGNhbm5vdCBiZSBibGFuaycpO1xyXG5cdH0gZWxzZSBpZihwYXNzd29yZFZhbHVlICE9PSBwYXNzd29yZDJWYWx1ZSkge1xyXG5cdFx0c2V0RXJyb3JGb3IocGFzc3dvcmQyLCAnUGFzc3dvcmRzIGRvZXMgbm90IG1hdGNoJyk7XHJcblx0fSBlbHNle1xyXG5cdFx0c2V0U3VjY2Vzc0ZvcihwYXNzd29yZDIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0RXJyb3JGb3IoaW5wdXQsIG1lc3NhZ2UpIHtcclxuXHRjb25zdCBmb3JtQ29udHJvbCA9IGlucHV0LnBhcmVudEVsZW1lbnQ7XHJcblx0Y29uc3Qgc21hbGwgPSBmb3JtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCdzbWFsbCcpO1xyXG5cdGZvcm1Db250cm9sLmNsYXNzTmFtZSA9ICdmb3JtLWNvbnRyb2wgZXJyb3InO1xyXG5cdHNtYWxsLmlubmVyVGV4dCA9IG1lc3NhZ2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFN1Y2Nlc3NGb3IoaW5wdXQpIHtcclxuXHRjb25zdCBmb3JtQ29udHJvbCA9IGlucHV0LnBhcmVudEVsZW1lbnQ7XHJcblx0Zm9ybUNvbnRyb2wuY2xhc3NOYW1lID0gJ2Zvcm0tY29udHJvbCBzdWNjZXNzJztcclxufVxyXG5cdFxyXG5mdW5jdGlvbiBpc0VtYWlsKGVtYWlsKSB7XHJcblx0cmV0dXJuIC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLnRlc3QoZW1haWwpO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==