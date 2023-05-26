import React, { useState } from 'react'
import styles from '../styles/Contact.module.css'

export default function Contact() {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [desc, setDesc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {name, email, phone, desc};

    fetch("http://localhost:3000/api/postcontact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then (response => response.text())
    .then (data => {
      console.log('Success:', data);
      alert("Thanks for submitting the form");
      setName('')
      setEmail('')
      setPhone('')
      setDesc('')
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  const handleChange = (e) => {
    if(e.target.name == 'name') {
      setName(e.target.value)
    }
    else if(e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if(e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if(e.target.name == 'desc') {
      setDesc(e.target.value)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formlabel}>Name</label>
          <input type="text" value={name} onChange={handleChange} className="form-control" id="name" aria-describedby="emailHelp" name='name' />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="exampleInputEmail1" className={styles.formlabel}>Email address</label>
          <input type="email" value={email} onChange={handleChange} className="form-control" id="email" aria-describedby="emailHelp" name='email' />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formlabel}>Phone</label>
          <input type="phone" value={phone} onChange={handleChange} className="form-control" id="phone" name='phone' />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="desc">Comments</label>
          <textarea name='desc' onChange={handleChange} className="form-control" value={desc} placeholder="Write your concern here" id="desc" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
