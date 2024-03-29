import React, { useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import { AiOutlineSend } from 'react-icons/ai';
import './Footer.scss';

const Footer = () => {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    setLoading(true);

     const contact = {
       _type: 'contact',
       name: name,
       email: email,
       message: message
     }

     client.create(contact).then(() => {
       setLoading(false);
       setIsFormSubmited(true);
     })
  }

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:adrien.pauchet@live.fr" className="p-text">grandchefdotkong@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.location} alt="location" />
          <div className="p-text">Shinjuku, Tokyo JAPAN</div>
        </div>
      </div>
      { !isFormSubmited ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex inputs">
            <input type="text" placeholder="Your Name" name="name" value={name} onChange={handleChangeInput}  className="p-text" />
            <input type="text" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput}  className="p-text" />
          </div>
          <div>
            <textarea placeholder="Your Message" name="message" value={message} onChange={handleChangeInput} id="" cols="30" rows="10" className="p-text"></textarea>
          </div>
          <button type="button" onClick={handleSubmit} className="p-text">{ loading ? "Sending": "Send Message "}<AiOutlineSend /></button>
        </div>
      ) : 
        <div>
          <h3 className="head-text">Thank you for getting in touch</h3>
        </div>
      }
      <p className="footer__copy">&#169; AdrienPauchet. All right reserved <br />
        Icons made by 
        <a className="footer__copy-link" href="https://www.freepik.com">
        &nbsp;Freepik
        </a> from 
        <a className="footer__copy-link" href="https://www.flaticon.com/">
        &nbsp;www.flaticon.com
        </a>
      </p>
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg'
  );