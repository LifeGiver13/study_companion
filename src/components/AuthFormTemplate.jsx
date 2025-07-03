import React from "react";
import { Link } from "react-router-dom";
import '../styles/AuthTemplate.css'
export default function AuthTemplate({children, imgUrl='/books.jpeg'}) {
    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <div className="form-container">
                    {children}

                </div>
                <div className="form-image">
                    <img src={imgUrl} alt='Image'/>
                </div>
            </div>
        </div>
    );
}
