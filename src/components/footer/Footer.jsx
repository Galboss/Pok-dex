import React from 'react';
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className='jc-space-around align-center'>
      <div className="column-container ">
        <span>Develop by:</span>
        <a className='footer-link' href="https://www.linkedin.com/in/bryan-j-chac%C3%B3n-reyes-aa118b228/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} /> Bryan J. Chacón Reyes
        </a>
        <a className='footer-link' href="https://github.com/Galboss" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} /> Galboss
        </a>
      </div>
      <div className="column-container ">
        <h3 className='txt-center'>{`Bryan Chacón™`}</h3>
        <h3 className='txt-center'>2023</h3>
      </div>
      <div className="column-container">
        <span>I do not own any right of the images utilized in the project. All of the image rights are owned by their respective owners.</span>
      </div>
    </footer>
  );
}

export default Footer;