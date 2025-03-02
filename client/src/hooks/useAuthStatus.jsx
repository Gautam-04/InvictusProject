import {useEffect,useState} from "react";

function useAuthStatus() {
    const [getData,setData] = useState(null);

    useEffect(()=>{
        setData(localStorage.setItem("token",true));
    },[setData,getData])
  return{getData}
}

export default useAuthStatus