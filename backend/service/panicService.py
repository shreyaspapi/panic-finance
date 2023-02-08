import time

from smartContract import SmartContract
from userPositions import UserPositions


class PanicService:
    def __init__(self, contract_address, abi, web3_provider):
        # Create a smart contract instance
        self.contract = SmartContract(contract_address, abi, web3_provider)
        self.user_positions = UserPositions("") # Add Subgraph polygon url
    

    def run(self):
        while True:
            # check if any user is in danger
            for data in self.user_positions.positions:
                print(data)
                # TODO: if user is in danger (imperant loss)

            # sleep for 10 seconds
            time.sleep(10)
        

    
