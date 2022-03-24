'''
IMPORTANT
I've already created a database called test in psql and have added a table called cheese_kottu_database_v01

Postgres also acts as a server, so we can make requests.
IT IS POSSIBLE TO RUN FASTAPI AND POSTGRES COMMANDS AT THE SAME TIME

To save an insertion to a database, you must COMMIT THE DATA
'''

#PSQL SIDE =================================================================================================

#Importing the package to connect
import psycopg2

#Establishing a connection
connection = psycopg2.connect(
    database='test', user='postgres', password='admin', host='localhost'
)

#Creating a cursor object
cursor = connection.cursor()

#Showing that there is a connection to postgres. Inside the parentheses you can use normal pqsl syntax
def test_database():
    try:
        cursor.execute('select version()')
        test_data = cursor.fetchone()
        print('Connection established to:' + str(test_data))
        return test_data
    except:
        return 'Cannot connect to Postgres'
test_database()


#General functions----

#1. Getting data from the posts table
def get_table_data():
    command = '''TABLE cheese_kottu_database_v01'''
    print('Attempting to retrieve data========================')
    try:
        cursor.execute(command)
        connection.commit()
        data = cursor.fetchall()                                      #THIS WILL GIVE THE RESULTS IN LIST FORM
        print('Data sent======================')
        return data
    except:
        print('Error in retrieving data========================')
        return "Error in retrieving data"

#2. Adding data to the posts table
def add_table_data(comment_id, username, comment_body):
    print("Attempting to add data========================")
    string_to_add = str(comment_id) + ',\''+username+ ',\''+',\''+ comment_body+'\''
    print(string_to_add)
    command_2 = '''INSERT INTO cheese_kottu_database_v01(comment_id, username, comment_body) VALUES('''+ string_to_add+''');'''
    try:
        cursor.execute(command_2)
        connection.commit()
        print('Success. Data submitted========================')
        return 'Success. Data submitted.'
    except:
        print('Error in adding data========================')
        return 'Error in adding data.'

#FASTAPI SIDE =================================================================================================
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#Whitelisting the sites able to connect
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

#Tests-----

#Creating a test command for this server
@app.get('/test/get')
async def test_get():
    return {
        'test': 'get'
    }

#Test connection to the postgres server
@app.get('/test/database')
async def test_database_connection():
    test = test_database()
    return {
        'database': test
    }


#General Functions -----

#1. Get the database post data
@app.get('/get/post_data')
async def get_post_data():
    post_data = get_table_data()
    return {
        'post_data' : post_data
    }

#2. Posting data received to postgres                                         //Post requests here!!!
from pydantic import BaseModel
from typing import Optional


class data_format(BaseModel):                                                             #This is the format that is required by the api
    comment_body : Optional[str] = None
    comment_id : int
    username : str


@app.post('/post/submit_post/')
async def sumbit_post(somename_3: data_format):
    comment_id = somename_3.comment_id
    username = somename_3.username
    comment_body = somename_3.comment_body
    # add_table_data(comment_id, username, comment_body)
    return {
        'Response': 'Submission received',
        'Data' : somename_3
    }


