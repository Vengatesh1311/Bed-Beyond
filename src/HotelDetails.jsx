import { CiLocationOn } from "react-icons/ci";
import { MdOutlineStarPurple500 } from "react-icons/md";
import EmblaCarousel from "./EmblaCarousel";
import "./assets/css/empla.css";
import { IoBedOutline } from "react-icons/io5";
import { BsSafe } from "react-icons/bs";
import { TbAirConditioning } from "react-icons/tb";
import { IoWifiOutline } from "react-icons/io5";
import { PiBowlFoodLight } from "react-icons/pi";
import { RiDrinks2Line } from "react-icons/ri";
import { LiaSwimmerSolid } from "react-icons/lia";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import Box from './assets/images/comment box.png'
import { useEffect, useState } from "react";
import H4 from './assets/images/4.jpg';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';



export default function HotelDetails(props)
{
    const today = new Date().toISOString().split("T")[0];
    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState(today);
    const [room, setRoom] = useState(null);
    let navigate = useNavigate();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCheckInChange = (e) => {
        const newCheckInDate = e.target.value;
        setCheckIn(newCheckInDate);
        if (newCheckInDate > checkOut) {
        setCheckOut(newCheckInDate);
        }
    };

    const handleCheckOutChange = (e) => {
        const newCheckOutDate = e.target.value;
        if (newCheckOutDate >= checkIn) {
        setCheckOut(newCheckOutDate);
        }
    };

    const calculateDays = (checkInDate, checkOutDate) => {
        const checkInTime = new Date(checkInDate).getTime();
        const checkOutTime = new Date(checkOutDate).getTime();
        return Math.max((checkOutTime - checkInTime) / (1000 * 60 * 60 * 24), 1); // Ensure at least 1 day
    };

    const update=()=>{
        if(room==='single' || room==='double')
        {
            const upUser = {...props.loginedUser,bookDetails:[...props.loginedUser.bookDetails,{
                                name:props.hotels[props.index].hotelName,
                                location:props.hotels[props.index].hotelLoc,
                                checkInDate:checkIn,
                                checkOutDate:checkOut,
                                roomType:room,
                                totalAmount:props.hotels[props.index].cost[room]*calculateDays(checkIn, checkOut),
                                paymentMethod:"Cash",
                                contact:9874563210
                                }]};
            fetch(`https://67dd5f90e00db03c406b5552.mockapi.io/details/users/${props.loginedUser.id}`, {
                method: 'PUT',
                headers: {'content-type':'application/json'},
                body: JSON.stringify(upUser)
            }).then(res => {
                if (res.ok) {
                    props.setBool1(!props.bool1);
                    handleLogin(upUser);
                    return res.json();
                }
            }).then(task => {
                return navigate("/reservationDetail");
            }).catch(error => {
                console.log(error)
            })
        }
        else
        {
             Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Select An Option...!"
            });
        }
    }

    const handleLogin = (user) => {
        props.setLoginedUser(user);
        localStorage.setItem("loginedUser", JSON.stringify(user));
    };

    return(
        <>
            <div className="detailPage">
                {props.hotels?
                    <>
                        <div className="row">
                            <div className="col-md-6 d-flex align-items-start justify-content-start flex-column gap-2 content">
                                <small>Luxury Experience</small>
                                <h1 className="fw-bold">{props.hotels[props.index].hotelName}</h1>
                                <h4 className="d-flex justify-content-center align-items-center gap-1"><CiLocationOn/>{props.hotels[props.index].hotelLoc}</h4>
                                <h5 className="d-flex justify-content-center align-items-center"><MdOutlineStarPurple500/><MdOutlineStarPurple500/><MdOutlineStarPurple500/><MdOutlineStarPurple500/><MdOutlineStarPurple500 className="me-3"/>{props.hotels[props.index].rating} Reviews</h5>
                                <h6>{props.hotels[props.index].description}</h6>
                            </div>
                            <div className="col-md-6 d-flex justify-content-center align-items-center">
                                <EmblaCarousel slides={props.hotels[props.index].images} options={{ loop: true }}/>
                            </div>
                            <div className="col-12 content">
                                <h1>Our Services</h1>
                                <div className="row services">
                                    <div className="col-md-3 d-flex align-items-center gap-2">
                                        <IoBedOutline/> King Size Bed
                                    </div>
                                    <div className="col-md-3 d-flex align-items-center gap-2">
                                        <BsSafe/> Safety Box
                                    </div>
                                    <div className="col-md-3 d-flex align-items-center gap-2">
                                        <TbAirConditioning/> Air Condition
                                    </div>
                                    {
                                        props.hotels[props.index].services.wifi? 
                                        <div className="col-md-3 d-flex align-items-center gap-2">
                                            <IoWifiOutline/> Free Wifi
                                        </div>:
                                        <></>
                                    }
                                    {
                                        props.hotels[props.index].services.food? 
                                        <div className="col-md-3 d-flex align-items-center gap-2">
                                        <PiBowlFoodLight/> Food
                                        </div>:
                                        <></>
                                    }
                                    {
                                        props.hotels[props.index].services.drinks? 
                                        <div className="col-md-3 d-flex align-items-center gap-2">
                                        <RiDrinks2Line/> Drinks
                                        </div>:
                                        <></>
                                    }
                                    {
                                        props.hotels[props.index].services.swimming? 
                                        <div className="col-md-3 d-flex align-items-center gap-2">
                                        <LiaSwimmerSolid/> Swimming Pool
                                        </div>:
                                        <></>
                                    }
                                    {
                                        props.hotels[props.index].services.laundry? 
                                        <div className="col-md-3 d-flex align-items-center gap-2">
                                        <MdOutlineLocalLaundryService/> Loundry Service
                                        </div>:
                                        <></>
                                    }
                                    {
                                        props.hotels[props.index].services.gym? 
                                        <div className="col-md-3 d-flex align-items-center gap-2">
                                        <CgGym/> Gym
                                        </div>:
                                        <></>
                                    }
                                </div>
                            </div>
                            <div className="row justify-content-center align-items-center gap-3 content">
                                <h1>Echoes from Our Guests</h1>
                                <div className='caroList'>
                                    <section>
                                        <div>
                                            <div>
                                                {props.hotels[props.index].reviews.map((review)=>{
                                                    return(
                                                        <>
                                                            <div className="col-md-5 reviewBox position-relative">
                                                                <img src={Box} alt="" />
                                                                <div className="position-absolute">
                                                                    <h3>{review.name}</h3>
                                                                    <p>{review.comment}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                            <div>
                                                {props.hotels[props.index].reviews.map((review)=>{
                                                    return(
                                                        <>
                                                            <div className="col-md-5 reviewBox position-relative">
                                                                <img src={Box} alt="" />
                                                                <div className="position-absolute">
                                                                    <h3>{review.name}</h3>
                                                                    <p>{review.comment}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                            <div>
                                                {props.hotels[props.index].reviews.map((review)=>{
                                                    return(
                                                        <>
                                                            <div className="col-md-5 reviewBox position-relative">
                                                                <img src={Box} alt="" />
                                                                <div className="position-absolute">
                                                                    <h3>{review.name}</h3>
                                                                    <p>{review.comment}</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                
                            </div>
                            <div className="content bookNow position-relative">
                                <img src={H4} alt="" className="position-absolute"/>
                                <div className="gradi position-absolute"></div>
                                <h1>Pack Your Bags – We’re Waiting!</h1>
                                <form className="d-flex gap-3 flex-row align-items-center justify-content-start flex-wrap">
                                    <div className="d-flex flex-column gap-2">
                                        <label>Check-in Date:</label>
                                        <input type="date" value={checkIn} min={today} onChange={handleCheckInChange}/>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                        <label>Check-out Date:</label>
                                        <input type="date" value={checkOut} min={checkIn} onChange={handleCheckOutChange}/>
                                    </div>
                                    <div className="d-flex flex-column gap-2">
                                        <label>Select Room Type</label>
                                        <select class="form-select" onChange={(i)=>setRoom(i.target.value.toLowerCase())}>
                                            <option>Select an Option</option>
                                            <option>Single</option>
                                            <option>Double</option>
                                        </select>
                                    </div>
                                </form>
                                <button className="user" onClick={update}>Book Now</button>
                            </div>
                        </div>

                    </>:
                    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
                        <h1>Loading</h1>
                    </div>
                }
            </div>
        </>
    )
}