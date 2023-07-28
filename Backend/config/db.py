from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri= "mongodb+srv://DbAgromatica:DbAgromatica123@dbagromatica.j7jfsko.mongodb.net/?retryWrites=true&w=majority"

# uri="mongodb://localhost:27017/"
client = MongoClient(uri, server_api=ServerApi('1'))
