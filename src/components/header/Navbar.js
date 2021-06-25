import React, { Component } from 'react';
import LeftMenu_Items from './LeftMenu_Items'
import { Drawer, Button } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';
import firebase, { db, auth } from "../../firebase";
import LogInORSignUp from "../header/LogIn_OR_SignUp";


class Navbar extends Component {
	state = {
		current: 'mail',
		visible: false
	}
	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};
	render() {
		return (
			<nav className="menuBar">
				<div className="logo">
					<a href="/" style={{
					fontSize:'27px', 
					fontFamily:'sans-serif',
					
					}}>vendorsbrand</a>
				</div>
				<div className="menuCon">
					<div className="leftMenu">
                  
                    
                {firebase.auth().currentUser !== null && (
                    <div>
                    <LeftMenu_Items />  
                    </div>
                )}

                {firebase.auth().currentUser == null && (
                    <div>
                     <LogInORSignUp />   
                    </div>
                )}

						
					</div>
                
					<Button className="barsMenu" type="primary" onClick={this.showDrawer}>
						<span className="barsBtn"></span>
					</Button>
      
					<Drawer
						title="Menu"
						placement="right"
						closable={false}
						onClose={this.onClose}
						visible={this.state.visible}
					>
						 {firebase.auth().currentUser !== null && (
                            <div>
                            <LeftMenu_Items />  
                            </div>
                         )}

                        {firebase.auth().currentUser == null && (
                            <div>
                            <LogInORSignUp />   
                            </div>
                        )}
                     
                        <CloseCircleTwoTone
                        onClick={this.onClose}
                        style={{
                        fontSize:'35px',
                        fontFamily:'sans-serif',
                        position:'relative',
                        left:'19px',
                        bottom:'20px',
                        }} />
					</Drawer>
				</div>
			</nav>
		);
	}
}

export default Navbar;
