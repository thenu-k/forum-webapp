console.log('Connection established')

//Getting posts
//posts in form of [{body:'', username:'', img_url:''}, ....]
let posts_URL = '/get/posts'
function refresh(){
    fetch(posts_URL)
    .then( (response)=>{
        response = response.json()
        return response
    })
    .then( data =>{
        // console.log(data)
        add_posts(data)
    })
    .catch(e=>{
        console.log(e)
    })
}
refresh()

//Adding posts to html
function add_posts(data){
    console.log('Refreshing HTML')
    document.querySelector('.post_container.inner').innerText = ''
    var post_section_html = ''
    for(let count = 0; count< data.length; count++){
        // console.log(data[count])
        post_section_html +=     '<div class="post dark theme two"><div class="profile_pic center"><div class=" center"><img src="'+data[count].img_url+'"></div></div> <div class="contents center"><p>'+data[count].body+'</p></div> <div class="username outer center"><span>'+data[count].username+'</span></div></div>'
    }
    document.querySelector('.post_container.inner').innerHTML = post_section_html
}


//New posts
const post_URL = '/post/new'
const post_button = document.querySelector('.user_input button')
const text_area = document.querySelector('textarea')
post_button.addEventListener('click', new_post)
function new_post(){
    let text = text_area.value
    console.log('Submitting Post')
    let payload = {
        body: text,
        username: 'guest',
        img_url: null,
    }
    fetch(post_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Method' : 'POST',
        }
    })
    .then(response=>{return response.json()}).then(data => console.log(data))
    text_area.value =''
    setTimeout(5000, refresh())
}

//Refreshing the page
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    for (let i = 0; i < 1000000; i++) {
        await sleep(5000);
        refresh()
    }
}

demo();