import I1 from './assets/images/1.jpg'
import I2 from './assets/images/2.jpg'
import I3 from './assets/images/3.jpg'
import Home1 from './assets/images/home_1.jpg';
import Home2 from './assets/images/home_2.jpg';
import Carousel from 'react-bootstrap/Carousel';
import { LuSquareParking } from "react-icons/lu";
import { FaAccessibleIcon } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import { FaWifi } from "react-icons/fa6";
import { useEffect } from 'react';


export default function Home()
{
    useEffect(() => {
            window.scrollTo(0, 0);
    }, []);
    return(
        <>
            <main>
                <Carousel className='home'>
                    <Carousel.Item>
                        <img src={I1} className="w-100" alt="1st slide" />
                        <Carousel.Caption className='home'>
                        <p>Luxury Hotel Experience</p>
                        <h2>The experience of unique holidays</h2>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={I2} className="w-100" alt="2nd slide" />
                        <Carousel.Caption className='home'>
                        <p>Luxury Hotel Experience</p>
                        <h2>A truly immersive relax place</h2>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={I3} className="w-100" alt="3rd slide" />
                        <Carousel.Caption className='home'>
                        <p>Luxury Hotel Experience</p>
                        <h2>A unique experience where to stay</h2>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className='row herocont justify-content-center align-items-center gx-0'>
                    <div className="col-md-6 gx-0">
                        <small>Bed & Beyond</small>
                        <h3>Makes your self at home and enjoy a unique experience</h3>
                        <h6>Vivamus volutpat eros pulvinar velit laoreet, sit amet egestas erat dignissim.</h6>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                        <h4>Maria...the Owner</h4>
                    </div>
                    <div className="col-md-6 gx-0 position-relative">
                        <img src={Home1} alt="h1" className='position-absolute'/>
                        <img src={Home2} alt="h2" />
                    </div>
                </div>
                <div className='access position-relative'>
                    <div className='row justify-content-between align-items-center gx-0 gap-3 text-center pt-5 pb-5 flex-wrap'>
                        <div className="accessShow">
                            <LuSquareParking className='mb-3'/>
                            <h3 className='mb-1'>Private Parking</h3>
                            <p className='mb-3'>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>
                        </div>
                        <div className="accessShow">
                            <FaAccessibleIcon className='mb-3'/>
                            <h3 className='mb-1'>Accessible</h3>
                            <p className='mb-3'>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</p>
                        </div>
                        <div className="accessShow">
                            <MdOutlinePets className='mb-3'/>
                            <h3 className='mb-1'>Pet Friendly</h3>
                            <p className='mb-3'>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                        </div>
                        <div className="accessShow">
                            <FaWifi className='mb-3'/>
                            <h3 className='mb-1'>High Speed Wifi</h3>
                            <p className='mb-3'>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</p>
                        </div>
                    </div>
                    <div className='accessCaro position-absolute d-flex justify-content-center align-items-center'>
                        <div> Relax Enjoy Luxury Holiday Travel Discover Experience</div>
                        <div> Relax Enjoy Luxury Holiday Travel Discover Experience</div>
                        <div> Relax Enjoy Luxury Holiday Travel Discover Experience</div>
                        <div> Relax Enjoy Luxury Holiday Travel Discover Experience</div>
                        <div> Relax Enjoy Luxury Holiday Travel Discover Experience</div>
                    </div>
                </div>
            </main>
        </>
    )
}