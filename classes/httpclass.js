

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

// class EasyHTTP {

//     //  Make an HTTP Request
//     get(url) {
//         return new Promise((resolve, reject) => {
//             fetch(url)
//                 .then(res => res.json())
//                 .then(data => resolve(data))
//                 .catch = err => reject(err);
//         });

//     }


//     //  Make an HTTP POST Request
//     post(url, data) {
//         return new Promise((resolve, reject) => {
//             fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             })
//                 .then(res => res.json())
//                 .then(data => resolve(data))
//                 .catch = err => reject(err);
//         });

//     }


//     //  Make an HTTP PUT Request
//     put(url, data) {
//         return new Promise((resolve, reject) => {
//             fetch(url, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             })
//                 .then(res => res.json())
//                 .then(data => resolve(data))
//                 .catch = err => reject(err);
//         });

//     }


//     //  Make an HTTP DELETE Request
//     delete(url) {
//         return new Promise((resolve, reject) => {
//             fetch(url, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-type': 'application/json'
//                 }
//             })
//                 .then(res => res.json())
//                 .then(() => resolve('Resource deleted'))
//                 .catch = err => reject(err);
//         });

//     }
// }


