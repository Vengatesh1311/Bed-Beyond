import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Check, X } from 'lucide-react';


export default function ForgetPassword(props)
{
    const [pass, setPass] = useState("");
    const [temp, setTemp] = useState(null);

    let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const validations = [
        {
          label: 'At least 8 characters',
          test: (pw) => pw.length >= 8,
        },
        {
          label: 'At least one uppercase letter',
          test: (pw) => /[A-Z]/.test(pw),
        },
        {
          label: 'At least one lowercase letter',
          test: (pw) => /[a-z]/.test(pw),
        },
        {
          label: 'At least one number',
          test: (pw) => /[0-9]/.test(pw),
        },
        {
          label: 'At least one special character (!@#$%^&*)',
          test: (pw) => /[!@#$%^&*]/.test(pw),
        },
    ];

    let navigate = useNavigate();
    
    let changePassword=()=>{
        if(document.querySelectorAll("input")[0].value.trim()==="" || document.querySelectorAll("input")[1].value.trim()==="" || document.querySelectorAll("input")[2].value.trim()==="" || document.querySelectorAll("input")[3].value.trim()==="")
        {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Fields are Empty...!"
              });
        }
        else if(temp.password!==pass)
        {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Password Must be Same...!"
            });
        }
        else if(!regex.test(temp.password)){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password Weak...!"
            });
        }
        else
        {
            let user = null, u = 0;
            props.users.map((data)=> {
            if(data.email===temp.email)
            {
                u++;
                user = data;
            }
            });
            if(u>0)
            {
                if(user.email===temp.email && user.idnumber!==temp.idnumber)
                {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "ID Proof Number Mismatched"
                    });
                }
                else if(user.email===temp.email && user.idnumber===temp.idnumber)
                {
                    let update = {...user, password:temp.password};
                    fetch(`https://67dd5f90e00db03c406b5552.mockapi.io/details/users/${user.id}`, {
                        method: 'PUT',
                        headers: {'content-type':'application/json'},
                        body: JSON.stringify(update)
                    }).then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                    }).then(task => {
                        Swal.fire({
                            title: "Password Changed Successfully...!",
                            icon: "success"
                        });
                        return navigate("/login");
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
            else
            {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "User Not Found...!"
                });
            }
        }
    };

    let show1=(a)=>{
        if("eye1"===a)
        {
            document.getElementById("pass1").type = "text";
            document.getElementById("eyeslash1").style.transform = "scale(1)";
            document.getElementById("eye1").style.transform = "scale(0)";
        }
        else
        {
            document.getElementById("pass1").type = "password";
            document.getElementById("eye1").style.transform = "scale(1)";
            document.getElementById("eyeslash1").style.transform = "scale(0)";
        }
    }
    let show2=(a)=>{
        if("eye2"===a)
        {
            document.getElementById("pass2").type = "text";
            document.getElementById("eyeslash2").style.transform = "scale(1)";
            document.getElementById("eye2").style.transform = "scale(0)";
        }
        else
        {
            document.getElementById("pass2").type = "password";
            document.getElementById("eye2").style.transform = "scale(1)";
            document.getElementById("eyeslash2").style.transform = "scale(0)";
        }
    }

    return(
        <>
            <div className='forgetPass'>
            {props.loginedUser?<><h1 className='text-center'>You have been successfully logged in.</h1></>:<>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(i)=>setTemp({...temp,email:i.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupId">
                            <Form.Label>ID Proof No.</Form.Label>
                            <Form.Control type="number" placeholder="Enter ID Number" onChange={(i)=>setTemp({...temp, idnumber:i.target.value})}/>
                        </Form.Group>
                        <Form.Group className='mb-3 position-relative' controlId="formGridPassword1">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" id="pass1" onChange={(i)=>setPass(i.target.value)}/>
                        <i className="fa-solid fa-eye" id="eye1" onClick={()=>show1("eye1")}></i>
                        <i className="fa-solid fa-eye-slash" id="eyeslash1" onClick={()=>show1("eyeslash1")}></i>
                        </Form.Group>

                        <Form.Group className='mb-3 position-relative' controlId="formGridPassword2">
                        <Form.Label>Re-Enter Password</Form.Label>
                        <Form.Control type="password" id="pass2" onChange={(i)=>setTemp({...temp, password:i.target.value})}/>
                        <i className="fa-solid fa-eye" id="eye2" onClick={()=>show2("eye2")}></i>
                        <i className="fa-solid fa-eye-slash" id="eyeslash2" onClick={()=>show2("eyeslash2")}></i>
                        </Form.Group>
                        <div className='mb-3'>
                        {
                            validations.map((rule, idx) => {
                            const passed = rule.test(pass);
                            return (
                                <div key={idx} className={`flex items-center gap-2 ${passed ? 'text-green-600' : 'text-red-500'}`}>
                                {passed ? <Check size={24} className='me-2 text-success' /> : <X size={24} className='me-2 text-danger'/>}
                                <span>{rule.label}</span>
                                </div>
                            );
                        })}
                        </div>
                        <Button onClick={changePassword}>Change Password</Button>
                    </Form>
                    </>}
            </div>
        </>
    )
}