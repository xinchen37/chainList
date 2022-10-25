<script setup>
import walletList from 'wallet-chian-list/src/hooks/index.js'
const {
  NewChainList,
  useChainStore,
  useWeb3
} = walletList()

const chainStore = useChainStore()

const {
  chainId,
  provider,
  userAddr,
  connect
} = useWeb3()

new NewChainList(
  {
    chainList: [
      {
        'chainId': 14000,
        'rpcUrl': 'http://54.196.198.84:14001/',
        'explorerUrl': 'http://54.196.198.84:14002/',
        'symbol': 'DEV',
        'chainName': 'Dev - Testnet-1',
        'networkName': null,
        'decimals': 18,
        'defaultFlag': true,
        'contract': {
          'factoryAddress': '0x0A0dCcEA355828e7d3f1858c478fE08B62546a98',
          'multiCallAddress': ''
        }
      },
      {
        'chainId': 100,
        'rpcUrl': 'http://10.89.65.53:10002/',
        'explorerUrl': 'http://10.89.65.53:4000/',
        'symbol': 'DEV',
        'chainName': 'Dev - Testnet-2',
        'networkName': null,
        'decimals': 18,
        'defaultFlag': false,
        'contract': {
          'factoryAddress': '0x979C206F1277Fb2C940Cb277bF0Fb00d55560DfE',
          'multiCallAddress': ''
        }
      }
    ]
  }
)

console.log(chainStore)
const onConnect = async () => {
  await connect()
  console.log(chainId)
  console.log(provider)
  console.log(userAddr)
}

</script>

<template>
  <main>
    <button @click="onConnect()"> connect </button>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
