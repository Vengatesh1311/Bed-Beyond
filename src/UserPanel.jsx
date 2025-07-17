import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2';
import { ImCancelCircle } from "react-icons/im";

export default function UserPanel(props)
{
    let navigate = useNavigate();

    const [temp, setTemp] = useState(null);
    useEffect(()=>{setTimeout(()=>setTemp(props.loginedUser),100)},[])

    const [editPopup, setEditPopup] = useState(false);

    let logout = () =>{
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!",
            cancelButtonText: "No"
          }).then((result) => {
            if (result.isConfirmed) {
                handleLogout();
                Swal.fire({
                    title: "Successfully Logged Out...!",
                    icon: "success"
                });
                return navigate("/");
            }
          });
    };

    const handleLogout = () => {
        props.setLoginedUser(null);
        localStorage.removeItem("loginedUser");
    };

    const cancelRes = (i)=>{
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText:"No",
            confirmButtonText: "Yes, cancel it!"
          }).then((result) => {
            if (result.isConfirmed) {
                props.loginedUser.bookDetails.splice(i,1);
                fetch(`https://67dd5f90e00db03c406b5552.mockapi.io/details/users/${props.loginedUser.id}`, {
                    method: 'PUT',
                    headers: {'content-type':'application/json'},
                    body: JSON.stringify(props.loginedUser)
                }).then(res => {
                    if (res.ok) {
                        props.setBool1(!props.bool1);
                        handleLogin(props.loginedUser);
                        return res.json();
                    }
                })
              Swal.fire({
                title: "Cancelled!",
                text: "Your reservation has been cancelled.",
                icon: "success"
              });
            }
          });
        
    }

    let updateUser=()=>{
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
            if(props.users.filter((item)=>item.idproof===temp?.idproof && item.idnumber===temp?.idnumber).length>0 && (temp.idnumber!==props.loginedUser.idnumber || temp.idproof!==props.loginedUser.idproof))
            {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "ID Proof Already Registered...!"
                });
            }  
            else
            {
                fetch(`https://67dd5f90e00db03c406b5552.mockapi.io/details/users/${props.loginedUser.id}`, {
                    method: 'PUT',
                    headers: {'content-type':'application/json'},
                    body: JSON.stringify(temp)
                }).then(res => {
                    if (res.ok) {
                        props.setBool1(!props.bool1);
                        handleLogin(temp);
                        return res.json();
                    }
                }).then(task => {
                    setEditPopup(!editPopup);
                    Swal.fire({
                        title: "Data Updated Successfully...!",
                        icon: "success"
                    });
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }

    const handleLogin = (user) => {
        props.setLoginedUser(user);
        localStorage.setItem("loginedUser", JSON.stringify(user));
    };

    return(
        <>
            {props.loginedUser?
                <div className='userpanel d-flex justify-content-center align-items-top'>
                    <div className='p-md-4 p-2'>
                        <h1 className='text-center'>User Info</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>: {props.loginedUser.name}</td>
                                </tr>
                                <tr>
                                    <td>Age</td>
                                    <td>: {props.loginedUser.age}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>: {props.loginedUser.gender}</td>
                                </tr>
                                <tr>
                                    <td>Mobile Number</td>
                                    <td>: {props.loginedUser.number}</td>
                                </tr>
                                <tr>
                                    <td>Email Address</td>
                                    <td>: {props.loginedUser.email}</td>
                                </tr>
                                <tr>
                                    <td>ID Proof</td>
                                    <td>: {props.loginedUser.idproof}</td>
                                </tr>
                                <tr>
                                    <td>ID Number</td>
                                    <td>: {props.loginedUser.idnumber}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>: {props.loginedUser.address}</td>
                                </tr>
                                <tr>
                                    <td>Native City</td>
                                    <td>: {props.loginedUser.city}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-center align-items-center gap-4'>
                            <button className='user' onClick={()=>setEditPopup(!editPopup)}>Edit</button>
                            <button className='user' onClick={logout}>Logout</button>
                        </div>
                    </div>
                    <div className='bookedTable p-md-4 p-2'>
                        <h1>Booking Details</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Hotel Name</th>
                                    <th>Location</th>
                                    <th>Check In Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.loginedUser?.bookDetails.map((item,i)=>{
                                    return(
                                        <>
                                            <tr>
                                                <td>{i+1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.location}</td>
                                                <td>{item.checkInDate}</td>
                                                <td><button className='user' onClick={()=>cancelRes(i)}><span>Cancel</span><ImCancelCircle className='d-none'/></button></td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            :
                <h1>Loading</h1>
            }
            {editPopup?<>
                <div className="editPop position-fixed d-flex justify-content-center align-items-center">
                    <div className='editBox p-md-4 p-3'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h4 className='p-0 m-0'>Edit User Details</h4>
                            <IoCloseOutline onClick={()=>setEditPopup(!editPopup)}/>
                        </div>
                        <Form>
                            <Form.Group className="mb-3 ps-0 w-100" controlId="formGroupEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" defaultValue={props.loginedUser?.name} onChange={(i)=>setTemp({...temp, name:i.target.value})}/>
                            </Form.Group>
                            <Row className="mb-3 w-100">
                                <Form.Group as={Col} className='ps-0' controlId="formGridGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select defaultValue={props.loginedUser?.gender} onChange={(i)=>setTemp({...temp, gender:i.target.value})}>
                                    <option>Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </Form.Select>
                                </Form.Group>
        
                                <Form.Group as={Col} className='pe-0' controlId="formGridAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" defaultValue={props.loginedUser?.age} onChange={(i)=>setTemp({...temp, age:i.target.value})}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3 w-100">
                                <Form.Group as={Col} className='ps-0' controlId="formGridID">
                                <Form.Label>ID Proof</Form.Label>
                                <Form.Select defaultValue={props.loginedUser?.idproof} onChange={(i)=>setTemp({...temp, idproof:i.target.value})}>
                                    <option>Select</option>
                                    <option>Aadhar Card</option>
                                    <option>Voder ID</option>
                                    <option>Driving License</option>
                                </Form.Select>
                                </Form.Group>
        
                                <Form.Group as={Col} className='pe-0' controlId="formGridIDNum">
                                <Form.Label>ID Proof No.</Form.Label>
                                <Form.Control type="text" defaultValue={props.loginedUser?.idnumber} onChange={(i)=>setTemp({...temp, idnumber:i.target.value})}/>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3 w-100" controlId="formGroupAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control as="textarea" defaultValue={props.loginedUser?.address} onChange={(i)=>setTemp({...temp, address:i.target.value})}/>
                            </Form.Group>
                            <Row className="w-100">
                                <Form.Group as={Col} className='ps-0' controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type='text' defaultValue={props.loginedUser?.city} onChange={(i)=>setTemp({...temp, city:i.target.value})}/>
                                </Form.Group>
                                <Form.Group as={Col} className='pe-0' controlId="formGridZip">
                                    <Form.Label>Pin Code</Form.Label>
                                    <Form.Control type='number' defaultValue={props.loginedUser?.pincode} onChange={(i)=>setTemp({...temp, pincode:i.target.value})}/>
                                </Form.Group>
                            </Row>
                            <Button className='mt-4' onClick={updateUser}>Save</Button>
                        </Form>
                    </div>
                </div>
            </>:<></>}
        </>
    )
}