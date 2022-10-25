import { computed } from 'vue'
import { Contract, providers } from 'ethers'
import { useWalletStore } from '../stores/wallet'

import useWeb3Modal from '../hooks/useWeb3Modal'

import { useChainStore } from '../stores/chain'

export default () => {
  const walletStore = useWalletStore()
  const {
    connectWallet,
    switchAddChain,
    onDisconnect
  } = useWeb3Modal()

  const chainId = computed(() => configStore.chainId)
  const configStore = useChainStore()

  const chainInfo = computed(() => configStore.chainInfo)

  const rpcUrl = computed(() => chainInfo.value.rpcUrl)

  const provider = computed(() => walletStore.provider) 
  const userAddr = computed(() => walletStore.userAddr) 
 
  const ethersProvider = computed(() => {
    return new providers.JsonRpcProvider(rpcUrl.value)
  })

  const web3Contract = (address, abi, instance) => {
    let ethersSigner = ethersProvider.value
    if (instance) {
      ethersSigner = instance
    } else {
      
      if (provider.value) {
        const web3Provider = new providers.Web3Provider(provider.value)
        ethersSigner = web3Provider.getSigner()
      }
    }

    const contract = new Contract(address, abi, ethersSigner);
    return contract
  } 

  /**
    * 连接钱包
    */
  const connect = async () => {
    let accounts = []
    const instance = await connectWallet()
    await switchAddChain(instance, chainId.value)
    if (instance.enable) accounts = await instance.enable()
    else accounts = await instance.send({ method: 'eth_requestAccounts' })
    const walletChainId = await instance.request({ method: 'eth_chainId' })
    const walletUserAddr = accounts[0]

    walletStore.setWalletState({
      provider: instance,
      userAddr: walletUserAddr,
      chainId: walletChainId
    })
    walletEvent()
  }

  // 退出钱包
  const disconnect = async () => {
    await onDisconnect()
    walletStore.setWalletState({ userAddr: null })
  }

  // 监听 事件变化
  const walletEvent = () => {
    provider.value.on('accountsChanged', (accounts) => {
      const account = accounts[0]
      walletStore.setWalletState({ userAddr: account })
    })

    provider.value.on('chainChanged', (id) => {
      walletStore.setWalletState({ chainId: id })
    })
    provider.value.on('connect', (info) => {
      console.log(info)
    })
  }

  return {
    chainId,
    provider,
    userAddr,
    disconnect,
    connect,
    web3Contract
  }
}