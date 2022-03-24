//Adding posts
posts_URI = '/get/posts'
fetch(posts_URI)
.then((response) => { return response.json()})
.then((data)=>{
    console.log(data)
})
.catch((e) => {console.log(e)})

//Redirecting post clicks
const general_discussion = document.querySelector('.general.post')
