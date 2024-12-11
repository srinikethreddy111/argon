import {Link} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"
import {Component} from "react";
import { BiFridge } from "react-icons/bi";
import { TbAirConditioning } from "react-icons/tb";
import { IoTvOutline } from "react-icons/io5";
import { GiGasStove } from "react-icons/gi";
import { CiLinkedin, CiFacebook, CiTwitter} from "react-icons/ci";
import LocationDropdown from '../LocationDropdown';
import SearchBar from '../SearchBar';
import TechnicianCarousel from '../TechnicianCarousel';
import logo from "../../logo.svg"
import threeOfFive from "../../3of5star.png";
import reviewer from "../../reviewer.svg";
import inputsImage from "../../inputs.svg"
import step1 from "../../step1.svg"
import step2 from "../../step2.svg"
import step3 from "../../step3.svg"
import './index.css';

const services =  [
  {
    id: "FRIDGE",
    title: "Fridge",
    description: "We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand.",
    icon: <BiFridge className="icon" />
  },
  {
    id: "AC",
    title: "Air Conditioner",
    description: "Don't get your heart broken by people we love, even that we give them all we have. Then we lose family over time. As we live, our hearts turn colder.",
    icon: <TbAirConditioning className="icon" />
  },
  {
    id: "TV",
    title: "Television",
    description: "What else could rust the heart more over time? Blackgold. The time is now for it to be okay to be great. or being a bright color. For standing out.",
    icon: <IoTvOutline className="icon" />
  },
  {
    id: "GASSTOVE",
    title: "Gas Stove",
    description: "We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand.",
    icon: <GiGasStove className="icon" />
  },
  {
    id: "AC1",
    title: "Air Conditioner",
    description: "Don't get your heart broken by people we love, even that we give them all we have. Then we lose family over time. As we live, our hearts turn colder.",
    icon: <TbAirConditioning className="icon" />
  },
  {
    id: "TV1",
    title: "Television",
    description: "What else could rust the heart more over time? Blackgold. The time is now for it to be okay to be great. or being a bright color. For standing out.",
    icon: <IoTvOutline className="icon" />
  },
];

const steps = [
  {
    id: 1,
    imageURL: step1,
    title: "Provide your appliance details",
    description: "Let us know your appliance details and your issue."
  },
  {
    id: 2,
    imageURL: step2,
    title: "Choose your technician",
    description: "Choose from a wide variety of technicians and vendors."
  },{
    id: 3,
    imageURL: step3,
    title: "Get it fixed!",
    description: "The technician will arrive at your doorstep shortly to fix it!"
  }
];

export default class Home extends Component {
  state = {
    locations: [],
    currentLocation: "",
    searchInput: "",
    appliances: [],
  }

  componentDidMount() {
    this.getLocations();
    this.getAppliances();
  }

  getAppliances =  async () => {
    const response = await axios.get("http://localhost:3001/appliances/")
    this.setState({appliances: response.data.appliances})
  }

  getLocations = async () => {
    const response = await axios.get("http://localhost:3001/locations/")
    this.setState({locations: response.data.locations, currentLocation: response.data.locations[0].id})
  }

  search = () => {
    console.log(`Searching for ${this.state.searchInput} in ${this.state.currentLocation}`);
  }
  render(){
    const {appliances,currentLocation,searchInput,locations} = this.state;
    return(
      <div className="main-container">
        <ul className='header'>
          <li className="logo-list-item">
            <img src={logo} alt="logo" />
          </li>
          <li>
            <Link className="link" to="/"><button type="button" className="biz-login">Biz Login</button></Link>
          </li>
          <li>
            {Cookies.get("jwt_token")!==undefined?
              <button className="nav-login-btn" onClick={()=>{Cookies.remove("jwt_token");this.setState({})}} type="button">Logout</button>:
              <Link id="login" className="link" to="/login"><button className="nav-login-btn" type="button">Login</button></Link>
            }
          </li>
        </ul>
        <div className="user-inputs-container">
          <div className="user-inputs">
            <h1>Take care of your home needs now!</h1>
            <p>ServicePro is your one-stop solution to troubleshoot, choose a vendor and book a technician.</p>
            <LocationDropdown locations={locations} value={currentLocation} onChangeLocation={(id) => this.setState({currentLocation: id})}/><br/>
            <SearchBar value={searchInput} onChangeSearchInput={val=>this.setState({searchInput: val})} appliances={appliances.filter(a=>a.type_name.toLowerCase().startsWith(searchInput))}/>
            <button type="button" className="search-button" onClick={this.search}>Search</button>
          </div>
          <img src={inputsImage} alt="inputs" />
        </div>
        <div className="all-services-container">
          <h1>All Services</h1>
          <p>The time is now for it to be okay to be great. For being a bright color. For standing out.</p>
          <ul className="services-list">
            {services.map(s=><li className="service" key={s.id}>
              {s.icon}
              <h2>{s.title}</h2>
              <p>{s.description}</p>
            </li>)}
          </ul>
        </div>
        <div className="steps-container">
          <h1>Book a request in 3 simple steps</h1>
          <ul className="steps-list">
            {steps.map(s=>
            <li className="step" key={s.id}>
              <img src={s.imageURL} className="steps-img" alt={`step${s.id}`}/>
              <h2>{s.title}</h2>
              <p>{s.description}</p>
            </li>)}
          </ul>
        </div>
        <div className="featured-vendors">
          <h1>Featured Vendors</h1>
          {Cookies.get("jwt_token")!==undefined?<TechnicianCarousel />:<a className="login-link" href="/login">Click Here to Login</a>}
        </div>
        <div className="reviews-container">
            <h1>See what our happy customers have to say about us</h1>
            <ul className="reviews-list">
              <li className="review">
                <img src={reviewer} className="reviewers-img" alt="review"/>
                <div className="review-description">
                  <strong className="review-name">
                    <p>Peter Breis</p>
                    <img className="stars" src={threeOfFive} alt="3of5" />
                  </strong>
                  <p style={{color: "grey"}} className="m-0">3 days ago</p>
                  <p>Knowledgeable and easy to work with. They make Instagram easy for those of us who aren’t that savvy. Growth has been great and the followers have been quality.<br/>Couldn’t be happier.</p>
                </div>
              </li>
              <li className="review">
                <img className="reviewers-img" src={reviewer} alt="review"/>
                <div className="review-description">
                  <strong className="review-name">
                    <p>Peter Breis</p>
                    <img src={threeOfFive} className="stars" alt="3of5" />
                  </strong>
                  <p style={{color: "grey"}} className="m-0">3 days ago</p>
                  <p>Knowledgeable and easy to work with. They make Instagram easy for those of us who aren’t that savvy. Growth has been great and the followers have been quality.<br/>Couldn’t be happier.</p>
                </div>
              </li>
              <li className="review">
                <img className="reviewers-img" src={reviewer} alt="review"/>
                <div className="review-description">
                  <strong className="review-name">
                    <p>Peter Breis</p>
                    <img src={threeOfFive} alt="3of5" className="stars" />
                  </strong>
                  <p style={{color: "grey"}} className="m-0">3 days ago</p>
                  <p>Knowledgeable and easy to work with. They make Instagram easy for those of us who aren’t that savvy. Growth has been great and the followers have been quality.<br/>Couldn’t be happier.</p>
                </div>
              </li>
            </ul>
        </div>
        <div className="footer">
          <div className="footer-inner">
            <div className="footer-above-hr">
              <div className="get-in-touch">
                <div>
                  <h2>Get in touch with us</h2>
                  <input type="text" placeholder="Email address"/>
                </div>
                <p>Hello, we are Lift Media. Our goal is to translate the positive effects from revolutionizing how companies engage with their clients & their team.</p>
              </div>
              <button className="book-service-button">Book a Service</button>
              <div style={{fontSize: "12px"}}>
                <p className="m-0 italic">Terms</p>
                <p className="m-0 italic">Privacy</p>
                <p className="m-0 italic">Cookies</p>
                <p className="m-0 italic">Business Login</p>
              </div>
            </div>
            <hr className="hr"/>
            <div className="footer-below-hr">
              <div className="footer-logo">
                <img  src={logo} alt="logo"/>
              </div>
              <CiLinkedin />
              <CiFacebook />
              <CiTwitter />
            </div>
          </div>
        </div>
      </div>
    )      
  }
}


