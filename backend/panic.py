from service.panicService import PanicService

class Panic:

    def __init__(self):
        self.polygonService = PanicService(contract_address="0x8e870d67f660d95d5be530380d0ec0bd388289e1", abi="abi.json", web3_provider="http://")
    
    def startServices(self):
        self.polygonService.startService()
