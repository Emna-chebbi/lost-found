import React from "react";
import { Link } from "react-router-dom"; 
import "./Home.css";
import homeImage from "../assets/home.webp";
import searchingImage from "../assets/searching.png"; 

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">Have you lost something? 🔍</h1>
          <h2 className="hero-subtitle">Our lost and found service will help you!</h2>
        </div>
        <div className="hero-image">
          <img src={homeImage} alt="Lost and Found" />
        </div>
      </div>

      <div className="button-container">
        <div className="button-widget">
          <p>Browse through the list of lost items</p>
          <Link to="/browse">
            <button className="action-button">Lost Items</button>
          </Link>
        </div>
        <div className="button-widget">
          <p>Search for your lost item using filters</p>
          <Link to="/search">
            <button className="action-button">Search Items</button>
          </Link>
        </div>
        <div className="button-widget">
          <p>Report an item that you've lost</p>
          <Link to="/create-item">
            <button className="action-button">Report Item</button>
          </Link>
        </div>
        <div className="button-widget">
          <p>Claim an item that matches your description</p>
          <Link to="/claim">
            <button className="action-button">Claim Item</button>
          </Link>
        </div>
      </div>

      
      <div className="procedure-container">
        <div className="procedure-section">
          <div className="procedure-image-container">
            <img src={searchingImage} alt="Searching" />
          </div>
          <div className="procedure-text">
            <h2>How it works 📝</h2>
            <p>1. Report a lost item through our platform.</p>
            <p>2. Browse the database of found items.</p>
            <p>3. If your item is found, submit a claim to verify ownership.</p>
          </div>
        </div>
      </div>

      
      <div className="footer">
        <div className="footer-left">
          <h2>Lost&Found</h2>
          <p>We assist people in reuniting with their lost belongings through our easy-to-use platform. Simply report your lost item, search through the database of found items, and claim any matching items once verified. Our goal is to make the process seamless and stress-free.</p>
          <p>Contact Information:</p>
          <p>Email: contact@lostfound.com</p>
          <p>Phone: +216 90821932</p>
        </div>
        <div className="footer-left">
          <div className="station">Tunis Station 1</div>
          <div className="station">Tunis Station 2</div>
          <div className="station">Tunis Station 3</div>
          <div className="station">Tunis Station 4</div>
          <div className="station">Tunis Station 5</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
