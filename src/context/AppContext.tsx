import { doc, getDoc ,updateDoc} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";



export const AppContext = createContext<any>('');

const AppContextProvider = (props: any) =>{
    
    const navigate = useNavigate();
    const [userData , setUserData]= useState(null)
    const [chatData , setChatData]= useState(null)


    const loadUserData = async (uid:any) =>{
        try{
            const userRef = doc(db,'user',uid)
            const userSnap = await getDoc(userRef)
            const userData : any = userSnap.data()
            setUserData(userData);

            if(userData.avtar && userData.name){
                navigate('/chat')
            }else{
                navigate('/profile')
            }

            await updateDoc(userRef,{
               lastSeen:Date.now() 
            })
            setInterval(async ()=>{
                if(auth){
                    console.log(auth)
                    await updateDoc(userRef,{lastSeen:Date.now() })
                }
            },60000)
        }catch(error:any){
            console.log(error)
        }
    }

    useEffect(()=>{
        
    })

    const value ={
        userData,setUserData,
        chatData, setChatData,
        loadUserData
    }

    return(
        <AppContext.Provider value={value}>
           {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;