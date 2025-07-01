import React from "react";
import { Link } from "react-router-dom";
import '../styles/AuthTemplate.css'
export default function AuthTemplate(props) {
    return (
        <div className="auth-wrapper">
            <header className="auth-header">
                Student Companion Web App
                </header>

            <div className="auth-container">
                <div className="form-container">
                    {props.children}
                </div>
                <div className="form-image">
                    <img src='/books.jpeg' alt='Image'/>
                </div>
            </div>
        </div>
    );
}
