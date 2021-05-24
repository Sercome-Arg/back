import React, { forwardRef } from 'react'
import { Admin, Resource } from 'react-admin';
import { MyLayout } from './MyLayout';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import customRoutes from './customRoutes';

import Dashboard from './Entities/Home';
import NotFound from './Entities/NotFoundPage';

import { UserList, UserCreate, UserEdit } from './Entities/User'
import { PermissionList } from './Entities/Permission'
import { RolList, RolCreate, RolEdit } from './Entities/Rol'
import { MagnitudeList, MagnitudeCreate, MagnitudeEdit } from './Entities/Magnitude'
import { InstrumentList, InstrumentCreate, InstrumentEdit } from './Entities/Instrument'
import { BusinessList, BusinessCreate, BusinessEdit } from './Entities/Business'
import { CertificateList, CertificateCreate, CertificateEdit } from './Entities/Certificate'
import { CalibrationList, CalibrationCreate, CalibrationEdit } from './Entities/Calibration'
import { AreaList, AreaCreate, AreaEdit } from './Entities/Area'
import { UnitList, UnitCreate, UnitEdit } from './Entities/Unit'
import { AlertList, AlertCreate, AlertEdit } from './Entities/Alert'
import { ConfigurationList, ConfigurationCreate, ConfigurationEdit } from './Entities/Configuration'
// entity
import PeopleIcon from '@material-ui/icons/People';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AlarmIcon from '@material-ui/icons/Alarm';
import BusinessIcon from '@material-ui/icons/Business';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DescriptionIcon from '@material-ui/icons/Description';
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';
import ExploreIcon from '@material-ui/icons/Explore';
import SquareFootIcon from '@material-ui/icons/SquareFoot';
import ExposureIcon from '@material-ui/icons/Exposure';


const resourceF = (entity, Entity, props, permissionList, base) => {
	let propsReturn = { ...props };
	propsReturn.permissions = permissionList;
	propsReturn.update = base['update' + entity]
	propsReturn.create = base['create' + entity]
	propsReturn.list = base['list' + entity]
	propsReturn.delete = base['delete' + entity]
	return <Entity {...propsReturn} />
}

const App = () => (
	<Admin
		dashboard={Dashboard}
		authProvider={authProvider}
		dataProvider={dataProvider}
		catchAll={NotFound}
		customRoutes={customRoutes}
		layout={MyLayout}
	>
		{
			(permissions) => {

				let resources = []
				let permissionList = []
				let base = []

				if (
					permissions !== undefined &&
					permissions.permissionList !== undefined &&
					Array.isArray(permissions.permissionList) &&
					permissions.permissionList.length > 0
				) permissionList = permissions.permissionList

				if (
					permissions !== undefined &&
					permissions.base !== undefined
				) base = permissions.base

				resources.push(<Resource name='user'
					list={(props) => { return resourceF('User', UserList, props, permissionList, base) }}
					edit={(props) => { return resourceF('User', UserEdit, props, permissionList, base) }}
					create={(props) => { return resourceF('User', UserCreate, props, permissionList, base) }}
					icon={PeopleIcon}
					options={{
						label: 'Usuarios'
					}}
				/>)

				resources.push(
					<Resource
						name='permission'
						list={(props) => { return resourceF('Permission', PermissionList, props, permissionList, base) }}
						icon={ListAltIcon}
						options={{
							label: 'Permisos'
						}}
					/>
				)

				resources.push(<Resource name='rol' list={(props) => { return resourceF('Rol', RolList, props, permissionList, base) }} edit={(props) => { return resourceF('Rol', RolEdit, props, permissionList, base) }}	create={(props) => { return resourceF('Rol', RolCreate, props, permissionList, base) }} options={{ label: 'Roles' }} />)
				resources.push(<Resource name='magnitude' list={(props) => { return resourceF('Magnitude', MagnitudeList, props, permissionList, base) }} edit={(props) => { return resourceF('Magnitude', MagnitudeEdit, props, permissionList, base) }} create={(props) => { return resourceF('Magnitude', MagnitudeCreate, props, permissionList, base) }} icon={SquareFootIcon} options={{ label: 'Magnitudes' }} />)
				resources.push(<Resource name='instrument' list={(props) => { return resourceF('Instrument', InstrumentList, props, permissionList, base) }} edit={(props) => { return resourceF('Instrument', InstrumentEdit, props, permissionList, base) }} create={(props) => { return resourceF('Instrument', InstrumentCreate, props, permissionList, base) }} icon={ExploreIcon} options={{ label: 'Instrumentos' }} />)
				resources.push(<Resource name='business' list={(props) => { return resourceF('Business', BusinessList, props, permissionList, base) }} edit={(props) => { return resourceF('Business', BusinessEdit, props, permissionList, base) }} create={(props) => { return resourceF('Business', BusinessCreate, props, permissionList, base) }} icon={BusinessIcon} options={{ label: 'Empresas' }} />)
				resources.push(<Resource name='certificate' list={(props) => { return resourceF('Certificate', CertificateList, props, permissionList, base) }} edit={(props) => { return resourceF('Certificate', CertificateEdit, props, permissionList, base) }} create={(props) => { return resourceF('Certificate', CertificateCreate, props, permissionList, base) }} icon={DescriptionIcon} options={{ label: 'Certificados' }} />)
				resources.push(<Resource name='calibration' list={(props) => { return resourceF('Calibration', CalibrationList, props, permissionList, base) }} edit={(props) => { return resourceF('Calibration', CalibrationEdit, props, permissionList, base) }} create={(props) => { return resourceF('Calibration', CalibrationCreate, props, permissionList, base) }} icon={BuildIcon} options={{ label: 'Calibraciones' }} />)
				resources.push(<Resource name='area' list={(props) => { return resourceF('Area', AreaList, props, permissionList, base) }} edit={(props) => { return resourceF('Area', AreaEdit, props, permissionList, base) }} create={(props) => { return resourceF('Area', AreaCreate, props, permissionList, base) }} icon={AssignmentIcon} options={{ label: 'Rubros' }} />)
				resources.push(<Resource name='unit' list={(props) => { return resourceF('Unit', UnitList, props, permissionList, base) }} edit={(props) => { return resourceF('Unit', UnitEdit, props, permissionList, base) }} create={(props) => { return resourceF('Unit', UnitCreate, props, permissionList, base) }} icon={ExposureIcon} options={{ label: 'Unidades' }} />)
				resources.push(<Resource name='alert' list={(props) => { return resourceF('Alert', AlertList, props, permissionList, base) }} edit={(props) => { return resourceF('Alert', AlertEdit, props, permissionList, base) }} create={(props) => { return resourceF('Alert', AlertCreate, props, permissionList, base) }} icon={AlarmIcon} options={{ label: 'Alertas' }} />)
        resources.push(<Resource name='configuration' list={(props) => { return resourceF('Configuration', ConfigurationList, props, permissionList, base) }} edit={(props) => { return resourceF('Configuration', ConfigurationEdit, props, permissionList, base) }} create={(props) => { return resourceF('Configuration', ConfigurationCreate, props, permissionList, base) }} icon={SettingsIcon} options={{ label: 'Configuraciones' }} />)
				// push

				return resources
			}
		}
	</Admin>
);

export default App;
