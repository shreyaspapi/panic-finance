from sanic import Sanic
from sanic.response import json
import os
import pymongo
import requests

app = Sanic()

client = pymongo.MongoClient("mongodb+srv://vercel:" + os.environ.get("MONGO_PASSWORD") + "@cluster0.1ygibls.mongodb.net/?retryWrites=true&w=majority")
db = client.networks

@app.route('/')
@app.route('/<path:path>')
async def index(request, path=""):
    return json({'hello': path})

@app.route('/uniswap-check-loss', methods=['POST'])
async def uniswap_check_impermanent_loss(request):

    graph_url = request.json.get('graph_url')
    response = requests.post(graph_url, json={
            'query': '''
                query {
                    userPositions(where: { check: true }) {
                        id
                        tokenId
                        token0
                        token1
                        check
                    }
                }
            '''
        })

    data = response.json()['data']['userPositions']
    
    return json({
        'success': True,
        'data': data
    })
