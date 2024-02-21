import React from 'react';
import { GoogleLogin } from 'react-google-login';


function Login() {
 const responseGoogle = (response) => {
   console.log(response);
 };


 return (
   <div>
     <GoogleLogin
       clientId="879553115891-1omhk7b1rb3sglnt3b78uimvgr3ss0us.apps.googleusercontent.com"
       buttonText="Log In"
       onSuccess={responseGoogle}
       onFailure={responseGoogle}
       cookiePolicy={'single_host_origin'}
     />
   </div>
 );
}


export default Login;
