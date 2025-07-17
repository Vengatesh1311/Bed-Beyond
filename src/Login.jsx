import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Login(props)
{
    const [temp, setTemp] = useState(null);

    let navigate = useNavigate();
    
    let login=()=>{
        if(document.querySelectorAll("input")[0].value.trim()==="" || document.querySelectorAll("input")[1].value.trim()==="")
        {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Fields are Empty...!"
              });
        }
        else
        {
            let c = 0, u = 0;
            props.users.map((data)=> {
            if(data.email===temp.email && data.password===temp.password)
            {
                handleLogin(data);
                c++;
                Swal.fire({
                    title: "Successfully Logged In...!",
                    icon: "success"
                });
                return navigate("/");
            }
            else if(data.email===temp.email) u++;
        })
        if(u===0 && c===0)
        {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User Not Found"
            });
        }
        else if(c===0)
        {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Passowrd is wrong"
            });
        } 
        }
    };

    let show=(a)=>{
        if("eye"===a)
        {
            document.getElementById("password").type = "text";
            document.getElementById("eyeslash").style.transform = "scale(1)";
            document.getElementById("eye").style.transform = "scale(0)";
        }
        else
        {
            document.getElementById("password").type = "password";
            document.getElementById("eye").style.transform = "scale(1)";
            document.getElementById("eyeslash").style.transform = "scale(0)";
        }
    }

    const handleLogin = (user) => {
        props.setLoginedUser(user);
        localStorage.setItem("loginedUser", JSON.stringify(user));
    };

    return(
        <>
            <div className='loginpage'>
                {props.loginedUser?<><h1 className='text-center'>You have been successfully logged in.</h1></>:<>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(i)=>setTemp({...temp, email:i.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3 position-relative" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" id="password" onChange={(i)=>setTemp({...temp, password:i.target.value})}/>
                            <i className="fa-solid fa-eye" id="eye" onClick={()=>show("eye")}></i>
                            <i className="fa-solid fa-eye-slash" id="eyeslash" onClick={()=>show("eyeslash")}></i>
                        </Form.Group>
                        <Link  className="mb-3" to='/forgetPassword'>Forget Password</Link>
                        <Link  className="mb-3" to='/register'>If you don't hane account, then create now.</Link>
                        <Button onClick={login}>Login</Button>
                    </Form>
                </>}
            </div>
        </>
    )
}