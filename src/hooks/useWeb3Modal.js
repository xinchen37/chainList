import { computed, ref } from 'vue'
import { getObjVal } from '../utils/object'
import Web3Modal from 'web3modal'
import { networkVersionHex } from '../utils/number'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useChainStore } from '../stores/chain'

export default () => {
  const configStore = useChainStore()
  const web3Modal = ref(null)

  const info = computed(() => configStore.chainInfo)

  // web3 Modal 配置参数
  const getProviderOptions = () => {
    const chainId = info.value.chainId
    const rpcUrls = info.value.rpcUrl
    const network = info.value.networkName
    return {
      injected: {
        package: null
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          network: network === 'null' ? null : network,
          rpc: {
            [chainId]: rpcUrls[0]
          }
        }
      }
    }
  }

  const initWeb3Modal = () => {
    const providerOptions = getProviderOptions()
    web3Modal.value = new Web3Modal({
      // disableInjectedProvider: false,
      cacheProvider: true,
      providerOptions
    })
  }


  // 连接钱包
  const connectWallet = async () => {
    if (!web3Modal.value) initWeb3Modal()
    const { connect } = web3Modal.value
    const provider = await connect() 
    return provider
  }

  /**
 * 切换添加网络
 * @param {*} providers 
 * @param {*} chainId 
 */

  const getCurrChainVal = (keyName) => {
    return getObjVal(info.value, [keyName])
  }

  const switchParams = computed(() => {
    return {
      chainId: networkVersionHex(info.value.chainId),
      chainName: info.value.chainName,
      rpcUrls: [info.value.rpcUrl],
      blockExplorerUrls: [info.value.explorerUrl],
      iconUrls: [],
      nativeCurrency: {
        name: info.value.chainName,
        symbol: info.value.symbol,
        decimals: info.value.decimals
      }
    }
  })

  const switchAddChain = async (providers) => {
    const chainID = getCurrChainVal('chainId')
    
    try {
      await providers.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkVersionHex(chainID) }]
      });
    } catch (error) {
      if (error.code === 4902) {
        await providers.request({
          method: 'wallet_addEthereumChain',
          params: [switchParams.value]
        });
      }
    }
  }

  const onDisconnect = async (provider) => {
    if (provider && provider.close) {
      await provider.close()
    }
    if (web3Modal.value && web3Modal.value.clearCachedProvider)  await web3Modal.value.clearCachedProvider()
  }

  const accountsChanged = (provider) => {
    provider.on('accountsChanged', (accounts) => {
      console.log(accounts);
    })
  }
  
  const chainChanged = (provider) => {
    provider.on('chainChanged', (chainId) => {
      console.log(chainId);
    })
  }
  
  const connect = (provider) => {
    provider.on('chainChanged', (info) => {
      console.log(info)
    })
  }
  
  const disconnect = (provider) => {
    provider.on('chainChanged', (error) => {
      console.log(error)
    })
  }
    
  return {
    connectWallet,
    switchAddChain,
    onDisconnect,
    accountsChanged,
    chainChanged,
    connect,
    disconnect
  }
}
