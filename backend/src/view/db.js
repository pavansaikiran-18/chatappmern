import moongose from "mongoose"
export const connectdb = async () => {

    try {
        const conn = await moongose.connect(process.env.mogobdurl)
        console.log("db connected")
    }
    catch (error) {
           console.log(error)
    }
}
