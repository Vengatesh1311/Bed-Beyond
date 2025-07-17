import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2';
import { Check, X } from 'lucide-react';


export default function Register(props)
{
    const [data, setData] = useState(null);
    const [pass, setPass] = useState("");
    
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


    let createUser=()=>{
        for(let x of document.querySelectorAll("input"))
        {
            if(x.value.trim()==="")
            {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Fields are Empty...!"
                });
                return;
            }
        }
        if(document.getElementsByTagName("select")[0].value==="Select" || document.getElementsByTagName("select")[1].value==="Select")
        {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Select An Option...!"
            });
        }
        else if(document.getElementsByTagName("textarea")[0].value.trim()==="") 
        {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Fields are Empty...!"
            });
        }
        else
        {
            if(props.users.filter((item)=>item.email===data.email).length>0)
            {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Mail Id Already Registered...!"
                });
            }
            else if(props.users.filter((item)=>item.number===data.number).length>0)
                {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Mobile Number Already Registered...!"
                    });
                }
            else if(props.users.filter((item)=>item.idproof===data.idproof && item.idnumber===data.idnumber).length>0)
            {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "ID Proof Already Registered...!"
                });
            }
            else if(data.password!==pass)
            {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Password Must be Same...!"
                });
            }
            else if(!regex.test(data.password)){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Password Weak...!"
                });
            }
            else
            {
                Swal.fire({
                    title: "Just a Moment",
                    icon: "info",
                    showConfirmButton:false
                });
                fetch('https://67dd5f90e00db03c406b5552.mockapi.io/details/users', {
                    method: 'POST',
                    headers: {'content-type':'application/json'},
                    body: JSON.stringify(data)
                }).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(task => {
                    Swal.fire({
                        title: "Registered Successfully...!",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href="/login";
                        } 
                    });
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }

    let clear=()=>{
        let arr = document.getElementsByTagName("input");
        for(let i = 0; i<arr.length; i++)
        {
            arr[i].value="";
        }
        document.getElementsByTagName("textarea")[0].value="";
        document.getElementsByTagName("select")[0].value="Select";
        document.getElementsByTagName("select")[1].value="Select";
    }

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
            <div className='registerpage'>
                <Form className='mb-5 mt-5'>
                    <Row className="mb-3 w-100">
                        <Form.Group as={Col} className='ps-0' controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={(i)=>setData({...data, name:i.target.value})}/>
                        </Form.Group>

                        <Form.Group as={Col} className='pe-0' controlId="formGridAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" onChange={(i)=>setData({...data, age:i.target.value})}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3 w-100">
                        <Form.Group as={Col} className='ps-0' controlId="formGridGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select onChange={(i)=>setData({...data, gender:i.target.value})}>
                            <option>Select</option>
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} className='pe-0' controlId="formGridNum">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="tel" onChange={(i)=>setData({...data, number:i.target.value})}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3 w-100">
                        <Form.Group as={Col} className='ps-0' controlId="formGridID">
                        <Form.Label>ID Proof</Form.Label>
                        <Form.Select onChange={(i)=>setData({...data, idproof:i.target.value})}>
                            <option>Select</option>
                            <option>Aadhar Card</option>
                            <option>Voder ID</option>
                            <option>Driving License</option>
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} className='pe-0' controlId="formGridIDNum">
                        <Form.Label>ID Proof No.</Form.Label>
                        <Form.Control type="text" onChange={(i)=>setData({...data, idnumber:i.target.value})}/>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3 w-100" controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' onChange={(i)=>setData({...data, email:i.target.value})}/>
                    </Form.Group>

                    <Row className="mb-3 w-100">
                        <Form.Group as={Col} className='ps-0 position-relative' controlId="formGridPassword1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id="pass1" onChange={(i)=>setPass(i.target.value)}/>
                        <i className="fa-solid fa-eye e1" id="eye1" onClick={()=>show1("eye1")}></i>
                        <i className="fa-solid fa-eye-slash e1" id="eyeslash1" onClick={()=>show1("eyeslash1")}></i>
                        </Form.Group>

                        <Form.Group as={Col} className='pe-0 position-relative' controlId="formGridPassword2">
                        <Form.Label>Re-Enter Password</Form.Label>
                        <Form.Control type="password" id="pass2" onChange={(i)=>setData({...data, password:i.target.value})}/>
                        <i className="fa-solid fa-eye" id="eye2" onClick={()=>show2("eye2")}></i>
                        <i className="fa-solid fa-eye-slash" id="eyeslash2" onClick={()=>show2("eyeslash2")}></i>
                        </Form.Group>
                        <div className='mt-3'>
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
                    </Row>

                    <Form.Group className="mb-3 w-100" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea"  onChange={(i)=>setData({...data, address:i.target.value})}/>
                    </Form.Group>
                    <Row className="mb-3 w-100">
                        <Form.Group as={Col} className='ps-0' controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text' onChange={(i)=>setData({...data, city:i.target.value})}/>
                        </Form.Group>

                        <Form.Group as={Col} className='pe-0' controlId="formGridZip">
                        <Form.Label>Pin Code</Form.Label>
                        <Form.Control type='number' onChange={(i)=>setData({...data, pincode:i.target.value})}/>
                        </Form.Group>
                    </Row>

                    <div className='d-flex justify-content-center align-items-center gap-3'>
                        <Button asvariant="primary" onClick={createUser} >
                            Submit
                        </Button>
                        <Button variant='primary' onClick={clear}>
                            Clear All
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}