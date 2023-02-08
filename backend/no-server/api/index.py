from sanic import Sanic
from sanic.response import json
import os
import pymongo

app = Sanic()


client = pymongo.MongoClient("mongodb+srv://vercel:" + os.environ.get("MONGO_PASSWORD") + "@cluster0.1ygibls.mongodb.net/?retryWrites=true&w=majority")
db = client.test

@app.route('/')
@app.route('/<path:path>')
async def index(request, path=""):
    return json({'hello': path})

@app.route('/aave-add-user', methods=['PUT'])
async def aave_add_user(request):
    # Get the address and network from the request
    address = request.json.get('address')
    network = request.json.get('network')

    # check db copnnection
    if db is not None:
        # Insert the user into the database
        db.networks.insert_one({
            'address': address,
            'network': network
        })

        # Return the success response
        return json({
            'success': True
        })
    else:
        return json({
            'success': False
        })
