import "./NavBar.css"
import logo from '../../assets/catjam.png'
import SignUp from '../SignUp/SignUp'
import Login from '../Login/Login'
import React, { Component } from 'react';
import { Button, AppBar, Toolbar, Modal} from '@material-ui/core'

function NavBar() {

    const [openSignUp, setOpenSignUp] = React.useState(false);
    const handleSignUpOpen = () => setOpenSignUp(true);
    const handleSignUpClose = () => setOpenSignUp(false);
    const [openLogin, setOpenLogin] = React.useState(false);
    const handleLoginOpen = () => setOpenLogin(true);
    const handleLoginClose = (e) => setOpenLogin(false);

    return (
        <div>
            <AppBar style={{backgroundColor: '#313131'}}>
                <Toolbar>
                <div className="logo">
                    <img className="logo-picture" src={logo}/>
                    <span className="logo-text">catJAM</span>
                </div>
                <div className="navbar-option-container">
                    <Button onClick={handleLoginOpen} className="navbar-option" style={{ color: "white"}}> Sign In</Button>
                    <div id="loginModal" className="modal" style={{display: openSignUp ? 'block' : 'none'}}>
                        <div id="modalContent" className="modal-content">
                            <Login/>
                        </div>
                    </div>
                    <Button onClick={handleSignUpOpen} className="navbar-option" style={{ color: "white"}}>Sign Up</Button>
                    <div id="signUpModal" className="modal">
                        <div id="modalContent" className="modal-content">
                            <SignUp/>
                        </div>
                    </div>
                </div>
                
                </Toolbar>
            </AppBar>
            
        </div>
    )
}

export default NavBar