// const { response } = require("express");

//EMplty strings
var data = '';


// Connection test
console.log('Connection to JS established.');


// Connecting to the backend
const get_URL = 'http://127.0.0.1:8000/get/refresh';

//Event listeners
const refresh_button = document.querySelector('#refresh')
refresh_button.addEventListener('click', () =>{
    refresh()
})







async function refresh(){

    console.log('Refreshing..');
    fetch(get_URL)
        .then((response) => {

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            console.log('Data received')
            return response.json()                                   //this returns a promise called 'data'
        }).then((data)=>{

                console.log('Data:')
                // var post_list = response['posts']
                
                console.log(data['posts'])

                var post_list = data['posts']                 // It has to be in this format, including the apostrophes
                // var data_holder =  '["hello", "world"]'           
                update_website = new update_website(post_list)
                // update_website.convert_to_list(data_holder)
                update_website.add_posts()

                // if(added == true){
                //     const classes_to_change = document.querySelectorAll('.no_posts')
                //     classes_to_change.forEach(element =>{
                //         element.className = 'has_posts'
                //     }

                
            })  
        .catch( (error) => {
            console.log('Catch error:')
            console.log(error)
        });

};


//The functions


class update_website{
    constructor(post_list){
        this.post_list = post_list
        this.current_posts = document.querySelectorAll('.post')
        this.post_section_html = document.querySelector('#middle_column').innerHTML
        this.total_post_num = 0
        this.current_post_num = 0
        this.num_posts_to_add = 0
        // this.count  = 0
    }


    // convert_to_list(somename){            //this function is no longer neccessary
        // console.log("Entered class: update_website - convert_to_list")
        // this.post_list = ''
        // this.post_list = JSON.parse(this.data_holder.split(','))         //!IMPORTANT. THIS WILL NO LONGER BE NECCESSARY AS I FOUND A WAY TO MAKE IT A JSON FILE
        // console.log('Post list:')
        // console.log(this.post_list)


    // }

    add_posts(){
        console.log("Entered class: update_website - add_posts")
        // Checking current posts on the page
        // var current_posts = document.querySelectorAll('.post')
        console.log('Current posts:')
        console.log(this.current_posts)
        // var post_section_html = document.querySelector('#middle_column').innerHTML
        var count = 0

        //If there are no posts
        if (this.current_posts.length == 0){
            this.post_list.forEach(post => {
                this.post_section_html += '<div class="post" id=post_' +(count+1)+' >'+this.post_list[count]+"</div>"
                count += 1
                console.log('Added post')
            })
            document.querySelector('#middle_column').innerHTML = this.post_section_html
            
        }
        else{
            this.total_post_num = this.post_list.length
            this.current_post_num = document.querySelectorAll('.post').length
            this.num_posts_to_add = this.total_post_num - this.current_post_num

            console.log('Current number of posts:')
            console.log(this.current_post_num)
            console.log('Number of posts to add:')
            console.log(this.num_posts_to_add)

            // Adding the remaining posts
            var i = this.current_post_num
            while(i<this.total_post_num) {
                console.log('Adding post:' + i)
                console.log('Post being added:')
                console.log(this.post_list[i])
                this.post_section_html += '<div class="post" id=post_' +(i)+' >'+this.post_list[i]+"</div>"
                i += 1
            }
            document.querySelector('#middle_column').innerHTML = this.post_section_html


        }
        //If there are posts
        added = true

    }
}