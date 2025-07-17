import Sunset from './assets/images/sunset.mp4'
import Home1 from './assets/images/home_1.jpg';
import About1 from './assets/images/about_1.jpg'
import { BsBookmarkStar } from "react-icons/bs";
import L1 from './assets/images/local_amenities_1.jpg';
import L2 from './assets/images/local_amenities_2.jpg';
import L3 from './assets/images/local_amenities_3.jpg';
import Room1 from './assets/images/R1.jpg';
import Room2 from './assets/images/R2.jpg';
import Room3 from './assets/images/R3.jpg';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About()
{
    useEffect(() => {
            window.scrollTo(0, 0);
    }, []);
    return(
        <>
            <div>
                <div className='sunsetDiv position-relative'>
                    <video src={Sunset} autoPlay loop muted></video>
                    <div className='position-absolute videoCont'>
                        <small>Luxury Hotel Experience</small>
                        <h1>Enjoy in a very Immersive Relax</h1>
                    </div>
                </div>
                <div className='row herocont justify-content-center align-items-center flex-row-reverse aboutCont gx-0'>
                    <div className="col-md-6 gx-0">
                        <small>About us</small>
                        <h3>Our History</h3>
                        <h6>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab.</h6>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                        <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo.</p>
                        <h4>Maria...the Owner</h4>
                    </div>
                    <div className="col-md-6 gx-0 position-relative">
                        <img src={Home1} alt="h1" className='position-absolute'/>
                        <img src={About1} alt="a2" />
                    </div>
                </div>
                <div className='localAmen'>
                    <div>
                        <aside className="col amenCont">
                            <div>
                                <div>
                                    <small>Bed & Beyond</small>
                                    <h2>Local Amenities</h2>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
                                </div>
                                <div>
                                    <ul>
                                        <li>
                                                <BsBookmarkStar/>
                                            <h4 className='fw-bold'>Local Restaurants</h4>
                                            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.</p>
                                        </li>
                                        <li>
                                                <BsBookmarkStar/>
                                            <h4 className='fw-bold'>Nature</h4>
                                            <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
                                        </li>
                                        <li>
                                                <BsBookmarkStar/>
                                            <h4 className='fw-bold'>Art and Culture</h4>
                                            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </aside>
                        <div className="col amenImg">
                            <img src={L1} alt="" />
                            <img src={L2} alt="" />
                            <img src={L3} alt="" />
                        </div>
                    </div>
                </div>
                <div className="ourRooms">
                    <div>
                        <small>Bed & Beyond</small>
                        <h2>Rooms & Suites</h2>
                    </div>
                    
                    <div className="row justify-content-between">
                        
                        <div className="roomBox r1">
                            <img src={Room1} alt="" className='w-100'/>
                            <div className='position-absolute w-100'>
                                <h3 className='fw-bold mb-1'>Junior Suite</h3>
                                <Link to='/hotels'>Read More</Link>
                            </div>
                        </div>
                        <div className='w-50'>
                            <div className="row justify-content-between">
                                <div className="r2 roomBox">
                                    <img src={Room2} alt="" className='w-100'/>
                                    <div className='position-absolute w-100'>
                                        <h3 className='fw-bold mb-1'>Deluxe Room</h3>
                                        <Link to='/hotels'>Read More</Link>
                                    </div>
                                </div>
                                <div className="r3 roomBox">
                                    <img src={Room3} alt="" className='w-100'/>
                                    <div className='position-absolute w-100'>
                                        <h3 className='fw-bold mb-1'>Superior Room</h3>
                                        <Link to='/hotels'>Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}