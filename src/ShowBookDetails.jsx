import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function ShowBookDetails(props)
{

    let navigate = useNavigate();
    
    useEffect(() => {
                window.scrollTo(0, 0);
    }, []);

    return(
        <>
            {props.hotels?
            <>
                <div className="reservDetail d-flex justify-content-center align-items-center flex-column gap-4">
                {props.loginedUser?.bookDetails.length>0?
                    <>
                        <h1 className="text-center">🎊Hotel Successfully Booked🎉</h1>
                        <div className="bookBox d-flex justify-content-center align-items-center flex-wrap">
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>HotelName</td>
                                            <td>: {props.loginedUser.bookDetails[props.loginedUser.bookDetails.length-1].name}</td>
                                        </tr>
                                        <tr>
                                            <td>Location</td>
                                            <td>: {props.loginedUser.bookDetails[props.loginedUser.bookDetails.length-1].location}</td>
                                        </tr>
                                        <tr>
                                            <td>Check-in Date</td>
                                            <td>: {props.loginedUser.bookDetails[props.loginedUser.bookDetails.length-1].checkInDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Check-out Date</td>
                                            <td>: {props.loginedUser.bookDetails[props.loginedUser.bookDetails.length-1].checkOutDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Room Type</td>
                                            <td>: {props.loginedUser.bookDetails[props.loginedUser.bookDetails.length-1].roomType.toUpperCase()}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Amount</td>
                                            <td>: {props.loginedUser.bookDetails[props.loginedUser.bookDetails.length-1].totalAmount}</td>
                                        </tr>
                                        <tr>
                                            <td>Payment Method</td>
                                            <td>: {props.loginedUser.bookDetails[props.loginedUser.bookDetails.length-1].paymentMethod}</td>
                                        </tr>
                                        <tr>
                                            <td>Contact</td>
                                            <td>: {props.loginedUser.bookDetails[props.loginedUser.bookDetails.length-1].contact}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <img src={props.hotels[props.index].images[0]} alt="" />
                        </div>
                    </>:<h1>Not Found</h1>
                }
                <button className="user" onClick={()=> navigate("/")}>Back To Home</button>
            </div>
            </>:
            <>
                <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
                        <h1>Loading</h1>
                </div>
            </>}
            
        </>
    )
}