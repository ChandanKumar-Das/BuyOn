// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {doc, getFirestore, setDoc } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
// Add firebase key
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username:any , email:any , password:any) =>{
      try{
        const res = await createUserWithEmailAndPassword (auth,email,password);
        const user = res.user
        await setDoc(doc(db,"user", user.uid),{
            id: user.uid,
            username: username,
            email,
            name: '',
            avatar:'',
            bio: 'Hey,there i am using chat app',
            lastSeen : Date.now(),
            password: password
        })

        await setDoc(doc(db,'chats',user.uid),{
            chatData:[]
        })
        toast.success('user created succefully')
      }catch(error: any){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
      }
}

const logIn = async (email: any , password: any) =>{
    try{
     const res = await signInWithEmailAndPassword (auth,email,password);
    }catch(error : any){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
      }
}

const logOut = async() =>{
    try{
     await signOut(auth)
    }catch(error : any){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
      }
}

export {signup , logIn , logOut ,auth , db}
