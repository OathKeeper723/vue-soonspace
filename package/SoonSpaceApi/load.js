import { typeOf } from '../../assets/js/utils'

export default function (SDK) {
  return {
    loadSBM(sbminfo) {

      return new Promise(resolve => {

        let sbms  = null

        if( typeOf(sbminfo) === 'object' ) {
          sbms = [sbminfo]
        } else if( typeOf(sbminfo) === 'array' ) {
          sbms = sbminfo
        }
 
        // 加载sbm
        SDK.importSBM("sbminfo", sbms, param => {

          resolve(param)

        });

      })

    }
  }
}