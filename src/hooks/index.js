
// import { computed } from 'vue'
// import useWeb3 from '@/hooks/useWeb3'
import { useChainStore } from '@/stores/chain'
import { useWalletStore } from '@/stores/wallet'
import useLogin from './useLogin'
import useWeb3 from './useWeb3'
import useWeb3Modal from './useWeb3Modal'

export const DROP_CHAIN_ID = 'DROP_CHAIN_ID'

export default () => {
  const chainStore = useChainStore()
  /**
   *  options
   * 
   */
  class NewChainList {
    #chainList = [];
    #jsonUrl = ''
    constructor (options) {
      this.#chainList = options.chainList
      this.#jsonUrl = options.jsonUrl
      this.init()
    }

    async init() {
      let result = []
      if (this.#chainList.length && !this.#jsonUrl) {
        result = this.#updateChainList(this.#chainList)
      }
  
      if (this.#jsonUrl && !this.#chainList) {
        const data = await fetch(`${this.#jsonUrl}v=${Date.now()}`).then(res => res.json())
        result = this.#updateChainList(data)
      }
      chainStore.setChainList(result)
    }

    #updateChainList(chainList) {
      const dropChainId = localStorage.getItem(DROP_CHAIN_ID)
      const isExist = chainList.some(el => el.chainId === parseInt(dropChainId))
      if (dropChainId && isExist) {
        for (let i = 0; i < chainList.length; i++) {
          const chainId = chainList[i].chainId
          chainList[i].defaultFlag = false
          if (parseInt(dropChainId) === parseInt(chainId)) {
            chainList[i].defaultFlag = true
          }
        }
      } else {
        chainList[0].defaultFlag = true
      }
      return chainList
    }
  }


  return {
    NewChainList,
    useChainStore,
    useWalletStore,
    useLogin,
    useWeb3,
    useWeb3Modal
  }
}
