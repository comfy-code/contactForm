import React, { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithubSquare, faInstagramSquare} from "@fortawesome/free-brands-svg-icons";

import axios from "axios";

import './App.css';

function App() {

  // State to control form inputs
  const [formData, setFormData] = useState({
  name:"",
  email:"",
  subject: "",
  message:""
  })

  // function to change input values 
  const handleChange = (e) => {
    if (e.target.id === "name") {
      setFormData({...formData, name: e.target.value})
    } else if( e.target.id === "email"){
      setFormData({...formData, email: e.target.value})
    } else if(e.target.id === "message") {
      setFormData({...formData, message: e.target.value})
    } else if(e.target.id === "subject") {
      setFormData({...formData, subject: e.target.value})
    }
  }

  // function to empty values out of form
  const resetForm = () => {
    setFormData({...formData, name: "", email: "",subject: "", message: ""});
  }

  // function to send formdata to backend to send email 
  const submit = (e) => {
    e.preventDefault()

    const {name, email, subject, message} = formData

    console.log(formData);

  axios.post("http://localhost:4000/", {
      name: name,
      email: email,
      subject: subject,
      message: message
    })
    .then(function (response) {
      console.log(response);
      if (response.status === 200){
        alert("Message Sent");
      }else  {
        alert("Message Failed. Try again!");
      }
      })
      .catch(function (error, response) {
      console.log(error);
      })

    resetForm();

  }

  return (
    <div >
      {/* // Contact Form */}
      <div className="center">
     <h1> Mail Form </h1>
     <form onSubmit={submit}> 
       <label className="l-position"> Name</label> 
       <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your name..." required></input>

       <label className="l-position">Email</label>
       <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email..." required></input>

       <label className="l-position"> Subject</label>
       <input type="text" id="subject" value={formData.subject} onChange={handleChange} placeholder="Enter a Subject for your message.." required></input>

       <label className="l-position2" >Message</label>
       <textarea type="text" id="message"  value={formData.message} onChange={handleChange} placeholder="Enter your message" style={{height: "100px"}} required></textarea>

       <input type="submit" value="Send Message" ></input>
     </form>

      {/* Icon Links  */}
     <h2> Stay connected  </h2>
    <FontAwesomeIcon className="pics" icon={faLinkedin}  size="6x"/>
    <FontAwesomeIcon className="pics" icon={faGithubSquare} size="6x"/>
    <FontAwesomeIcon className="pics" icon={faInstagramSquare} size="6x"/>
     </div>
    </div>
  );
}

export default App;
