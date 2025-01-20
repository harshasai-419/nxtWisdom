import './homeIndex.css'
import {Component} from 'react'
import { MdHome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";  
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import {BounceLoader } from 'react-spinners';
import {Link} from 'react-router-dom'
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import SelectContext from '../../context/SelectContext';

class Home extends Component{
    state={list:[],search:'',choice:"inProgress"}
    componentDidMount(){
        this.getUserDetails()
    }
    getUserDetails=async ()=>{
        const url="https://jsonplaceholder.typicode.com/users"
        const response = await fetch(url)
        console.log(response)
        if(response.ok===true){
            const data=await response.json()
            const sortedData = data.sort((a, b) => a.name.localeCompare(b.name))
            this.setState({list:sortedData,choice:"sucess"})
        }
        else{
            this.setState({choice:"failure"})
        }
        
    }
    changeSearchInput=(event)=>{
        this.setState({search:event.target.value.toLowerCase()})
    }

    
    renderDetails=()=>{
        const {list,search}=this.state
        const filteredList=list.filter(each=>{
            if(each.name.toLowerCase().includes(search)){
                return each 
            }
            return null 
        })
        return(
            <SelectContext.Consumer>
            {value=>{
                const {isDark,toggleTheme}=value
                const bgCon=isDark?"dark-container":"light-container"
                const card=isDark?"dark-card":"light-card"
                const inputCon=isDark?"dark-input-con":"light-input-con"
                const inputEle=isDark?"dark-input-ele":"light-input-ele"
                return(
                    <div className={bgCon}>
                    <div className="top-con">
                        <img src="https://tse3.mm.bing.net/th?id=OIP.D9Nire5soiCmPtWvBIMazwAAAA&pid=Api&P=0&h=180" alt="wisdom-logo" className="wisdom-image"/>
                        <div className='top-theme'>
                            <div className="top-right-con">
                                <h2 className="home-icon"><MdHome /></h2>
                                <h2 className="top-head">Home</h2>
                            </div>
                            {isDark?<h2 className="home-icon" onClick={toggleTheme}><MdOutlineLightMode /></h2>:<h2 className="home-icon" onClick={toggleTheme}><MdDarkMode /></h2>}
                        </div>
                    </div>
                    <div className='total-input-con'>
                        <div className={inputCon}>
                            <FaSearch className='search-icon'/>
                            <input className={inputEle} value={search} placeholder="search user by name..." onChange={this.changeSearchInput}/>
                        </div>
                    </div>
                    {filteredList.length===0?(
                        <div className='not-con'>
                            <img src="https://www.shutterstock.com/image-vector/user-cross-mark-red-icon-260nw-2160397931.jpg" alt="unexistance-user" className='not-img'/>
                            <h1 className='not-found-head'>No such user exists with this name</h1>
                        </div>):
                    (<ul className='unordered-list'>
                        {filteredList.map(each=>{
                            return(           
                                <li className={card}>
                                    
                                    <div className='card-item-con'>
                                        <h2 className='card-icon1'><IoPersonCircleSharp /></h2>
                                        <h2 className='card-head'>{each.name}</h2>
                                    </div>
                                    <div className='card-item-con'>
                                        <h2 className='card-icon2'><IoMdMail /></h2>
                                        <h2 className='card-head'>{each.email}</h2>
                                    </div>
                                    <div className='card-item-con'>
                                        <h2 className='card-icon3'><FaLocationDot /></h2>
                                        <h2 className='card-head'>{each.address.city}</h2>
                                    </div>
                                    <div className='but-con'>
                                        <Link to={`/userdetails/${each.id}`} className='link-item'><button className='view-button'>View More..</button></Link>
                                    </div>
                                    
                                </li>
                            )
                        })}
                    </ul>)}
                    </div>
                )}}
            </SelectContext.Consumer>
        )
    }
    
    renderLoader=()=>{
        return(
            <div className='loader-con'>
               <BounceLoader color="#36d7b7" loading={true} size={40} />
            </div>
        )
    }

    renderFailure=()=>{
        return(
            <div className='loader-con'>
                <h1 className='not-found-head'>404 Error</h1>
            </div>
        )
    }

    render(){
        const {choice}=this.state
        switch(choice){
            case "sucess":
                return this.renderDetails()
            case "inProgress":
                return this.renderLoader()
            case "failure":
                return this.renderFailure()
            default :
            return null
        }
    }
}

export default Home