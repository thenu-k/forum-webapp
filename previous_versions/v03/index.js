// const { text } = require("body-parser")


const get_data_URL = 'http://127.0.0.1:8000/get/post_data'
const send_data_URL = 'http://127.0.0.1:8000/post/submit_post'
var json_data= ''

//Startup process

fetch(get_data_URL)
    .then( (response) =>{
        console.log('Connection established with server')
        return response.json()
    }).then( (data) => {
        json_data = data
        console.log('Post data received and parsed:')
        console.log(json_data['post_data'])

        //Counting the number of posts
        post_count = number_of_posts(json_data)

        //Adding posts to the page
        add_to_html(json_data)

    })
    .catch((error) =>{
        console.log('Catch error:')
        console.log(error)
    })

    //json_data is a 2d array



// Startup function 

function number_of_posts(some_data){
    // console.log(some_data.post_data)
    console.log('Number of posts:')
    var num_posts = some_data['post_data'].length
    console.log(num_posts)
    return num_posts
}


function add_to_html(posts_in_json){
    console.log('Attempting to add to site')
    posts_in_list = posts_in_json.post_data
    console.log(posts_in_list)

    var post_html = ''
    var initial_id_list = []
    var count = 0
    posts_in_list.forEach(element => {
        var username = element[1]
        var comment_body = element[2]

        initial_id_list[count] += parseInt(element[0] )
        count+=1

        new_post_element = '<div class="post"><span>'+username+'</span><p>'+comment_body+'</p></div>'
        post_html = post_html +new_post_element
    });

    document.getElementById('posts_section').innerHTML = post_html
    console.log('Added posts to site')
    console.log('ID list:')
    console.log(initial_id_list)

}



// When refreshing we can compare the current_id list to the new id_list created



//User functions

//1. Post function

//testing the post function first
// function post_data_test(){
//     var payload = {
//             comment_id: '4',
//             username: 'bar',
//             comment_body: 'this is bar'
//     };
    
//     var data = new FormData();
//     data.append( "json", JSON.stringify( payload ) );

//     fetch(send_data_URL, {
     
//     // Adding method type
//     method: "POST",
    
//     // Adding body or contents to send
//     body: data
    
//     })
//     // Converting to JSON
//     .then(response => response.json())
    
//     // Displaying results to console
//     .then(json => console.log(json));
//}
var payload = {
    "comment_body": "go to sleep",
	"comment_id" : 4,
	"username" : "yo mum"

};


// var data = new FormData();
// data.append( "json", JSON.stringify( payload ) );

function send_post_submission(){
    fetch('http://127.0.0.1:8000/post/submit_post',
    {
        method: "POST",
        body: JSON.stringify(payload),

        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Method' : 'POST',
            'Test': 'test'
        }
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ console.log( JSON.stringify( data ) ) })
}

send_post_submission()

// Checking the text box value
const submit_button = document.getElementById('submit_button')
const text_area = document.querySelector('textarea')

submit_button.addEventListener('click', () =>{

    var text_in_area = text_area.value
    console.log('Submission process starting')
    console.log(text_in_area)
    text_area.value = ''

})