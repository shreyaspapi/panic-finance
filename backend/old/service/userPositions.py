import requests

from positionData import Position

class UserPositions:
    def __init__(self, graph_url):
        self.graph_url = graph_url
        self.positions = []
        self.fetch_positions()

    def fetch_positions(self):
        # Make a request to the graph to get the user positions
        response = requests.post(self.graph_url, json={
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

        # Parse the response and create a Position instance for each position
        data = response.json()['data']['userPositions']
        self.positions = [
            Position(position['id'], position['tokenId'], position['token0'], position['token1'], position['check'])
            for position in data if position['check']
        ]
