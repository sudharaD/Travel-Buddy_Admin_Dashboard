import { httpRequest } from 'http/Http'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './style.css'
import {auth, provider} from '../../firebase'
const LoginComponent = () => {

  const [user, setUser] = useState()
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/admin/main");
      }
    });
  }, [user]);

  const handleAuth = () => {
    if (!user) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (user) {
      auth
        .signOut()
        .then(() => {
          history.push("/login");
        })
        .catch((err) => alert(err.message));
    }
  };

  

  const login = async()=>{
    history.push('/admin/main')
    return;

    // add default login
    localStorage.setItem("car-admin-user", "default_login")
    history.push('/admin/user')
    return;

    setIsLoading(true)
    const request = await httpRequest({url:'admin/login', method:'post', data : {email,password}})
    setIsLoading(false)

    if(request.success){
      localStorage.setItem("car-admin-user", request.data)
      history.push('/admin/user')
    }
  }
  return (
    <div className='bgC'>
    <div style={{height:'200px'}}></div>

    <div className="box-form" >
    <div className="left">
		<div className="overlay">
		<h1>Travel Admin App</h1>
		
		
		</div>
        </div>
        <div className='right'>
		<p>Travel App System. System for change the future in the travel management Sri Lanka</p>
		
        <div className="inputs">
			<input type="text" placeholder="user name" value={email} onChange={(e)=>setemail(e.target.value)} />
			<br />
			<input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
		</div>

        <div className="remember-me--forget-password">
	
		</div>

        <div style={{height:'50px'}}></div>

        <button onClick={handleAuth} style={{width:'100%'}}>{isLoading ? "Please wait ..." : "Login"}</button>
        </div>
	</div> 
    </div>


  )
}

export default LoginComponent