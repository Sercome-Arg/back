import React, { forwardRef } from 'react'
import { Layout } from 'react-admin';
import { AppBar, UserMenu, MenuItemLink, getResources } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';
import { createElement } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Label';

import { Sidebar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const Menu = ({ onMenuClick }) => {
  const open = useSelector(state => state.admin.ui.sidebarOpen);
  const resources = useSelector(getResources);
  return (
		<div>
			{resources.map(resource => (
				<MenuItemLink
					key={resource.name}
					to={`/${resource.name}`}
					primaryText={resource.options && resource.options.label || resource.name}
					leftIcon={createElement(resource.icon)}
					onClick={onMenuClick}
					sidebarIsOpen={open}
				/>
			))}
			<MenuItemLink
				to="/custom-route"
				primaryText="Miscellaneous"
				leftIcon={<LabelIcon />}
				onClick={onMenuClick}
				sidebarIsOpen={open}
			/>
		</div>
  );
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
      backgroundColor: '#402217w',
  },
});

const MySidebar = props => {
  const classes = useSidebarStyles();
  return (
		<Sidebar classes={classes} {...props} />
  );
};


const MyAppBar = props => <AppBar {...props} userMenu={<MyUserMenu />} />;

export const MyLayout = props => <Layout {...props} appBar={MyAppBar} sidebar={MySidebar} />;
