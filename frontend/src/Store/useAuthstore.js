
import { create } from "zustand"
import axiosinst from "../lib/Axios"
import toast from "react-hot-toast"
 const useAuthStore = create((set) => ({
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
                const res=await axiosinst.post("/auth/signup",data)
                set({checkAuth:res.data})
                toast.success("Account Created Successfully")

                
            } catch (error) {
                toast.error(error.response.data.message)
            }
            finally{
                set({isSignUp:false})
            }

        }
    
    }))
export default useAuthStore;