
import { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';


export default function Hotels(props)
{
    useEffect(() => {
            window.scrollTo(0, 0);
    }, []);

    let indexSet = (i)=>{
        props.setIndex(i);
        localStorage.setItem("index", JSON.stringify(i));
    } 
    
    return(
        <>
            <div className="hotelsPage">

                {/* <div>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupLocation">
                            <Form.Label>Search By Location</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupRange">
                            <Form.Label>Range</Form.Label>
                            <Form.Range min="1000" max="9000" onChange={(i)=>console.log(i.target.value)}/>
                        </Form.Group>
                    </Form>
                </div> */}

                <div className="d-flex justify-content-center align-items-center flex-column">
                    <small>Luxury Experience</small>
                    <h1 className="fw-bold">Our Rooms</h1>
                </div>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    {props.hotels?.map((item,index)=>{
                        return(
                            <>
                                <div className="hotel justify-content-center position-relative">
                                    <div className="p-5">
                                        <img src={item.images[0]} alt="" />
                                    </div>
                                        <div className="hotelDetail d-flex justify-content-between align-items-start flex-column position-absolute">
                                            <small>FROM ₹{item.cost.single}/DAY</small>
                                            <h3 className="fw-bold">{item.hotelName}</h3>
                                            <h6 className="d-flex justify-content-center align-items-center gap-1"><CiLocationOn/>{item.hotelLoc}</h6>
                                            <p>Beautiful design with modern furnishings including a glamorous bay window with your own private view of Lucerne.</p>
                                            {props.loginedUser? <Link onClick={()=>indexSet(index)} to='/hotelDetails' className="book">Book Now</Link> : <Link to='/login' className="book">Book Now</Link>}
                                        </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}