import { defineStore } from 'pinia'

export const useChainStore = defineStore({
  id: 'chainInfo',
  state: () => ({
    list: []
  }),
  actions: {
    setChainList (list = []) {
      this.$patch((state) => {
        state.list = list
      })
    }
  },
  getters: {
    chainList: (state) => {
      let result = []
      result = state.list
      return result
    },
    chainInfo: (state) => {
      let result = state.list[0]
      result = state.list.find(el => !!el.defaultFlag)
      return result
    },
    chainId: (state) => {
      let result = state.chainList[0].chainId
      if (state.chainInfo) result = state.chainInfo.chainId
      return parseInt(result)
    },
    chainRpc: (state) => {
      let result = state.chainList[0].rpcUrl
      if (state.chainInfo) result = state.chainInfo.rpcUrl
      return result
    },
    chainExplorerUrl: (state) => {
      let result = state.chainList[0].explorerUrl
      if (state.chainInfo) result = state.chainInfo.explorerUrl
      return result
    }
  }
})
