
import { create } from "zustand"
import axiosinst from "../lib/Axios"
 const  useAuthstore = create((set) => ({
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

        }
    
    }))
export default useAuthstore