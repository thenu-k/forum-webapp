// const { json } = require("body-parser")


const do_stuff = document.querySelector('.form span')

URL_get = 'http://127.0.0.1:9000/get/refresh'
URL_post = ''



//CHECK OUT V0.1 JS FOR A BETTER EXPLANATION


let data
do_stuff.addEventListener('click', () =>{
    console.log('Process starting...')
     let response = fetch(URL_get)
    fetch(URL_get)                                //fetch returns a promise
        .then(response => response.json())      //response json also returns a promise
            .then(json => {
                // console.log(json); 
                var data = json;      // This looks like a list but is actually a string
                console.log(data);

                // Converting string list to list. THIS IS NOT NECESSARY IF THE DATA IS ACTUAL JSON
                var post_list =JSON.parse(data.split(','))

                var count = 0;

                // Changing the html of the post 
                post_list.forEach(post => {
                    console.log(count)
                    console.log("<div class=\"post\">"+post_list [count]+"</div>")
                    document.getElementById('posts_section').innerHTML =document.getElementById('posts_section').innerHTML+ "<div class=\"post\">"+post_list [count]+"</div>"
                    count += 1
                });

                // DONE! Now we need to compare the current posts to the refreshed list of posts to add the neccessary ones.
                
            
            
            })  
                
        .catch(err =>console.log(err));

        
})



// Alternate way to do it
// async function refresh(){

    // do_stuff.addEventListener('click', ()=>{

    //     //Response is a promise
    //     const response = await fetch(URL_get);

    //     var data = response.json();
    //     console.log(data);
    //     // show(data);

    // })


// refresh()
