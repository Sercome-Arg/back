import React, { forwardRef } from 'react'
import { Layout } from 'react-admin';
import { AppBar, UserMenu, MenuItemLink, getResources } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';
import Logo from './img/logo.png';
import { Component } from 'react';
import { createElement } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Label';


import { Sidebar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

// const whiteLogo = require('./white.png')
// src={'http://drive.google.com/uc?export=view&id=1z4_b0jdysIIYm1cFiigSMtPNXuMYqyRG'}

const MyAppBar = props => {
	const classes = useStyles();
	return <AppBar className={classes.appBar} {...props} userMenu={<MyUserMenu />} >
		<span className={classes.spacer} />
		<img height='25px'  src={Logo} />
		<span className={classes.spacer} />
	</AppBar>
}

const ConfigurationMenu = forwardRef(({ onClick }, ref) => (
	<MenuItemLink
		ref={ref}
		to="/configuration"
		primaryText="Configuration"
		leftIcon={<SettingsIcon />}
		onClick={onClick} // close the menu on click
	/>
));

const MyUserMenu = props => (
	<UserMenu {...props}>
		<ConfigurationMenu />
	</UserMenu>
);

const useSidebarStyles = makeStyles({
	drawerPaper: {
		// backgroundColor: '#2B3E4E',
	},
});


const MySidebar = props => {
	const classes = useSidebarStyles();
	return (
		<Sidebar classes={classes} {...props} />
	);
};
const useStyles = makeStyles({
	appBar: {
		background: '#2B3E4E',
		// backgroundImage: whiteLogo
	},
	spacer: {
		flex: 1,
	},
});


const useAppbarStyles = makeStyles({
	colorPrimary: 'red'
});



export const MyLayout = props => {
	const classes = useAppbarStyles();
	return <Layout {...props} appBar={MyAppBar} sidebar={MySidebar} />
	
};
