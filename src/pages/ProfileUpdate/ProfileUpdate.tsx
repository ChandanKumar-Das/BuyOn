import React, { useContext, useEffect, useState } from 'react';
import sideImg from '../../assets/profile-img.webp';
import avtarImg from '../../assets/avtar.png';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../../lib/upload';
import { AppContext } from '../../context/AppContext';


const ProfileUpdate = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [uid, setUid] = useState('')
  const [prevImage, setPrevImage] = useState('')

  const {setUserData} = useContext(AppContext)

  const imageUrl = image ? URL.createObjectURL(image) : prevImage ? prevImage: avtarImg;

  const navigate = useNavigate()


  const profileUpdate = async (e: any) => {
    e.preventDefault();
    
    
    try {
      if (!prevImage && !image) {
        toast.error('upload profile photo')
      }

      const url= doc(db,'user',uid);
      if(image){
        const imgUrl:any = upload(image);
        setPrevImage(imgUrl);
        await updateDoc(url,{avatar:imageUrl,bio:bio,name:name})
      }else{
        await updateDoc(url,{abio:bio,name:name})
      }

      const snap = await getDoc(url)
      setUserData(snap.data());
      navigate('/chat')

    } catch (error:any) {
      console.log(error)
      toast.error(error)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        setUid(user.uid)
        const userRef = doc(db, 'user', user.uid)
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log('userdata is :-', userData)
          if (userData?.name) {
            setName(userData.name);
          }
          if (userData?.bio) {
            setBio(userData.bio);
          }
          if (userData?.avatar) {
            setPrevImage(userData.avatar);
          }

        }
      } else {
        navigate('/')
      }
    })
  }, [])

  return (
    <>
   <div className="flex max-w-5xl mx-auto mt-10">
  {/* Left Side - Profile Edit Form */}
  <form onSubmit={profileUpdate} className="w-1/2 p-8 flex flex-col bg-gray-100">
    <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

    <div className="flex items-center mb-6">
      <label
        htmlFor="profileImage"
        className="flex flex-col items-center cursor-pointer"
        aria-label="Upload profile image"
      >
        <img
          src={imageUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300 mb-2"
        />
        <span className="text-blue-500">Upload profile image</span>
        <input
          onChange={(e: any) => setImage(e.target.files?.[0] || null)}
          type="file"
          id="profileImage"
          accept=".png, .jpg, .jpeg"
          className="hidden"
        />
      </label>
    </div>

    <label htmlFor="name" className="mb-2 text-gray-700">Name:</label>
    <input
      onChange={(e: any) => setName(e.target.value)}
      value={name}
      type="text"
      id="name"
      className="p-2 mb-4 border border-gray-300 rounded w-full"
      placeholder="Enter your name"
    />

    <label htmlFor="bio" className="mb-2 text-gray-700">Bio:</label>
    <textarea
      onChange={(e: any) => setBio(e.target.value)}
      value={bio}
      id="bio"
      className="p-2 mb-4 border border-gray-300 rounded w-full"
      rows={4}
      placeholder="Write something about yourself"
    />

    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
    >
      Save
    </button>
  </form>

  {/* Right Side - Beautiful Image */}
  <div className="w-1/2">
    <img
      className="w-full h-full object-cover"
      src={sideImg}
      alt="Background"
    />
  </div>
</div>

    </>
  );
};

export default ProfileUpdate;
