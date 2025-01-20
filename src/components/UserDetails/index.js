import './userIndex.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5"; 
import { IoMailSharp } from "react-icons/io5";
import { ImMobile } from "react-icons/im";
import { MdWeb } from "react-icons/md";
import { MdViewCompactAlt } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import {BounceLoader } from 'react-spinners';
import {Link} from 'react-router-dom'

const UserDetails = () => {
    const { id } = useParams(); // Extract `id` from the URL
    const [data, setData] = useState(null); // State to hold user data

    useEffect(() => {
        const getDetails = async () => {
            const url = `https://jsonplaceholder.typicode.com/users/${id}`;
            const response = await fetch(url);
            const result = await response.json();
            setData(result); // Update state with fetched data
        };

        getDetails();
    }, [id]); // Run effect whenever `id` changes

    if (!data) {
        return (
            <div className='loader-con'>
               <BounceLoader color="#36d7b7" loading={true} size={40} />
            </div>
        )
    }

    const { name,email,phone,website,company,address} = data;
    console.log(data)
    return (
        <div className='total-user-con'>
            <h1 className='det-head'>User Details</h1>
            <div className="user-details-card">
                <div className='user-det-con'>
                    <h1 className='user-card-head'><IoPerson className='user-icon'/></h1>
                    <h1 className='user-card-head'>{name}</h1>
                </div>
                <div className='user-det-con'>
                    <h1 className='user-card-head'><IoMailSharp className='user-icon'/></h1>
                    <h1 className='user-card-head'>{email}</h1>
                </div>
                <div className='user-det-con'>
                    <h1 className='user-card-head'><ImMobile className='user-icon'/></h1>
                    <h1 className='user-card-head'>{phone}</h1>
                </div>
                <div className='user-det-con'>
                    <h1 className='user-card-head'><MdWeb className='user-icon'/></h1>
                    <h1 className='user-card-head'>{website}</h1>
                </div>
                <div className='user-det-con'>
                    <h1 className='user-card-head'><MdViewCompactAlt className='user-icon'/></h1>
                    <h1 className='user-card-head'>{company.name}</h1>
                </div>
                <div className='user-det-con'>
                    <h1 className='user-card-head'><FaLocationDot className='user-icon'/></h1>
                    <h1 className='user-card-head'>{address.city}</h1>
                </div>

            
            </div>
            <Link to="/" className='link-item'><button className='back-button'>Go back..</button></Link>
        </div>
    );
};

export default UserDetails;
