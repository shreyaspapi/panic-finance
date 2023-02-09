from sanic import Sanic
from sanic.response import json
import os
import pymongo
import requests

app = Sanic()

client = pymongo.MongoClient("mongodb+srv://vercel:" + os.environ.get("MONGO_PASSWORD") + "@cluster0.1ygibls.mongodb.net/?retryWrites=true&w=majority")
db = client.networks

from uniswap import Uniswap

address = None
private_key = None
version = 3                       # specify which version of Uniswap to use
provider = os.environ.get("POLYGON_PROVIDER")    # can also be set through the environment variable `PROVIDER`
uniswap = Uniswap(address=address, private_key=private_key, version=version, provider=provider)

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

    weth = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
    wmatic = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"

    # Get the token pair for token 1 and token 2
    pair = uniswap.get_pair(weth, wmatic)

    # Get the current price of token 1
    p1_current = pair.token0_price

    # Get the current price of token 2
    p2_current = pair.token1_price

    # Get the current supply of token 1
    s1_current = pair.token0_reserve

    # Get the current supply of token 2
    s2_current = pair.token1_reserve
    
    return json({
        'success': True,
        'data': data,
        'p1_current': p1_current,
        'p2_current': p2_current,
        's1_current': s1_current,
        's2_current': s2_current
    })

def impermanent_loss(p1_initial, p2_initial, p1_current, p2_current, q1, q2):
    """
        Calculate the impermanent loss for a Uniswap V3 liquidity position.
        :param p1_initial: initial price of token 1
        :param p2_initial: initial price of token 2
        :param p1_current: current price of token 1
        :param p2_current: current price of token 2
        :param q1: amount of token 1 contributed to the pool
        :param q2: amount of token 2 contributed to the pool
        :return: calculated impermanent loss
    """
    il = ((p1_initial * q1 + p2_initial * q2) - (p1_current * q1 + p2_current * q2)) / (p1_initial * q1 + p2_initial * q2)
    return il

def impermanent_loss_advance(p1_initial, p2_initial, p1_current, p2_current, s1_initial, s2_initial, s1_current, s2_current, q1, q2):
    """
        Calculate the impermanent loss for a Uniswap V3 liquidity position, taking into account changes in the overall supply of the tokens.
        :param p1_initial: initial price of token 1
        :param p2_initial: initial price of token 2
        :param p1_current: current price of token 1
        :param p2_current: current price of token 2
        :param s1_initial: initial supply of token 1
        :param s2_initial: initial supply of token 2
        :param s1_current: current supply of token 1
        :param s2_current: current supply of token 2
        :param q1: amount of token 1 contributed to the pool
        :param q2: amount of token 2 contributed to the pool
        :return: calculated impermanent loss
    """
    il = ((p1_initial * q1 + p2_initial * q2) * (s1_current + q1) * (s2_current + q2) - (p1_current * q1 + p2_current * q2) * s1_initial * s2_initial) / ((p1_initial * q1 + p2_initial * q2) * s1_initial * s2_initial)
    return il
