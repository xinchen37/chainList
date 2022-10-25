
// import { computed } from 'vue'
import useWeb3 from '../hooks/useWeb3'

export default () => {
  const { connect } = useWeb3()
  
  const login = async () => {
    await connect()
  }

  return {
    login
  }
}