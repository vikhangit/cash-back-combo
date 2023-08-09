
import axios from 'axios'
const provinceApi = "https://vapi.vnappmob.com/api/province"

export const getProvinceData = async () => {
  let result = [];
   try{
    const res = await axios.get(
        `${provinceApi}/province`
    );
    if(res.status === 200){
      result = res.data.results;
    }else{
      result = [];
    }
   }catch(e){
    console.log(e)
   }
    return result
}