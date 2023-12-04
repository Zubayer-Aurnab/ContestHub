import { createContext, useEffect, useState } from "react";
import auth from '../config/firebase.config'
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import useAxiosPublic from "./useAxiosPublic";





export const AuthContext = createContext(null)
const GoogleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()



    // google 
    const GoogleAuth = () => {
        setLoading(true);
        return signInWithPopup(auth, GoogleProvider)
    }
    // create User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //login
    const LogInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    //Update user
    const UpdateUser = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    // logOUT
    const logOutUser = () => {
        setLoading(true);
        signOut(auth)
            .then(res => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Log Out Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    }


    // Auth State change
    useEffect(() => {
        onAuthStateChanged(auth, (storedUser) => {
            setUser(storedUser)
            if (storedUser) {
                //jwt
                const userInfo = { email: storedUser.email }
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })
            } else {
                //remove token
                localStorage.removeItem('access-token')
            }
            setLoading(false);

        })
    }, [])



    const authInfo = {
        GoogleAuth,
        createUser,
        user,
        LogInUser,
        logOutUser,
        UpdateUser,
        loading,


    }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;