import web3

class SmartContract:
    def __init__(self, contract_address, abi, private_key, web3_provider):
        self.contract_address = contract_address
        self.abi = abi
        self.private_key = private_key
        self.web3 = web3.Web3(web3.Web3.HTTPProvider(web3_provider))

        # Create a contract instance
        self.contract = self.web3.eth.contract(
            address=self.contract_address,
            abi=self.abi
        )

    def call_contract_function(self, function_name, *args):
        # Call the function of the contract with the specified arguments
        return getattr(self.contract.functions, function_name)(*args).call()

    def send_transaction(self, function_name, *args):
        # Get the transaction object
        txn = getattr(self.contract.functions, function_name)(*args).buildTransaction({
            'from': self.web3.eth.accounts.privateKeyToAccount(self.private_key).address,
            'gas': 500000
        })

        # Sign the transaction with the private key
        signed_txn = self.web3.eth.account.signTransaction(txn, self.private_key)

        # Send the signed transaction
        txn_hash = self.web3.eth.sendRawTransaction(signed_txn.rawTransaction)
        return self.web3.eth.waitForTransactionReceipt(txn_hash)
