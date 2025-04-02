
import { create } from "zustand"
import axiosinst from "../lib/Axios"
import toast from "react-hot-toast"
export const useAuthStore = create((set) => ({
        authUser: null,
        isSignUp : false,
        isLogging: false,
        isUpdatingProfile: false,
        isCheckingAuth: true,
        checkAuth: async () => {
            try {
                const res = await axiosinst.get("/auth/check")
                set({ authUser: res.data })

            } catch (error) {
                set({ authUser: null })
                console.log(error)

            }
            finally {
                set({ isCheckingAuth: false })
            }

        },
        signup: async (data)=>{
            set({isSignUp:true})
            try {
                const res=await axiosinst.post("/auth/signup",data);
                set({authUser:res.data})
                toast.success("Account Created Successfully")

                
            } catch (error) {
                toast.error(error.message)
            }
            finally{
                set({isSignUp:false})
            }

        },
        logout: async()=>{
            try {
                
                axiosinst.post("/auth/signout")
                set({authUser:null})
                toast.success("Loggedout Successfully...")

            } catch (error) {
                toast.error(error)
            }
            

        }
    
    }))
