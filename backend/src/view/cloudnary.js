import v2 from "cloudinary"
import config, { configDotenv } from "dotenv"
configDotenv()
v2.config({
    cloud_name:process.env.cloudnary,
    api_key:process.env.apikey,
    api_secret:process.env.apisecret

})
export default v2;
