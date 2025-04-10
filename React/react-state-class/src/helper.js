//it contains helper functions used in Lottery.jsx file.

// yha functions na hi components, state, ya props ko use krne wale hai, isliye isko plain js file mein banaya hai jsx mein nhi. So these functions are normal functions jinko kahi bhi use kiya ja sakta hai, they are not React-specific.

function genTicket(n) { //generates n random numbers, yha apne Lottery ticket wale case mein n ki jagah 3 pass krenge.
    let arr = new Array(n);
    for(let i=0; i<n; i++){
        arr[i] = Math.floor(Math.random() * 10); //random no hona chahiye 0 se 9 tak isliye 10 se multiply kiya. Now it will generate random nos. from 0 to 9.
    }

    return arr;
}

function sum(arr) {
    return arr.reduce((sum, curr) => sum + curr, 0) //ye kya hai? -> array ka reduce function use kr rhe hai, ismein ek sum aur dusra current element hai as parameters, aur ye return kr dega sum + curr. Otherwise, it returns 0.
}

export {genTicket, sum};