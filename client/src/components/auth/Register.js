import React,{Fragment, useState} from 'react'
// import axios from 'axios';
import {Link} from 'react-router-dom';
export default function Register() {
    const [formData, setFormData]= useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });
    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value});
    const{name,email,password,password2} = formData;
    const onSubmit = async e =>{
        e.preventDefault();
        if(password2 !==password){
            console.log('password do not match');
        }
        else{
            console.log('sucess');
            // const newUser ={
            //     name,
            //     email,
            //     password
            // }
            // try {
            //     const config ={
            //         headers:{
            //             'Content-Type':'application/json'
            //         }
            //     }
            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('/api/users',body,config);
            //     console.log(res.data); //generated token after registration
            // } catch (err) {
            //     console.error(err.response.data);
            // }

        }
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e=> onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=> onChange(e)} required />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} onChange={e=> onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2} onChange={e=> onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        </Fragment>
    )
}