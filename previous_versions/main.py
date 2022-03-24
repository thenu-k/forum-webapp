import json

from fastapi import FastAPI, Response
from fastapi import Body
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Access-Control-Allow-Origin: allowing access from all wesbsites:
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Adding a header to indicate what websites can access this api
def get_header(response: Response):
    response.headers["Hello"] = "there"

# post_array = []

#Creating a test operation
@app.get('/test/get')
async def test_get():
    return {
        "post": "Hello World"
    }




# Refresh function
@app.get('/get/refresh')
async def refresh():
    post_list = []
    with open('text_files/posts', 'r') as post_file:
        post_list = post_file.read().split('<end>')
        post_file.close()

        json_file = {
            'posts' : post_list
        }
        pass
    # jsonified_list = json.dumps(post_list)
    return json_file




#Importing the package to connect
import psycopg2



#Deleted code
