import { defineStore } from 'pinia'

export const useWalletStore = defineStore({
  id: 'wallet',
  state: () => ({
    provider: null,
    userAddr: null,
    chainId: null
  }),
  actions: {
    setWalletState (data = {}) {
      this.$patch((state) => {
        const { provider, userAddr, chainId } = Object.assign({
          provider: state.provider,
          userAddr: state.userAddr,
          chainId: state.chainId
        }, data)
        state.provider = provider
        state.userAddr = userAddr
        state.chainId = chainId
      })
    }
  }
})
