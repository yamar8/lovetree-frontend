import { GoogleLogin } from '@react-oauth/google';


const Glogin = (props) => {

return(

    <GoogleLogin
    onSuccess={credentialResponse => {
        console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
}}
/>

)
}

export default Glogin;

