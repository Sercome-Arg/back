import * as React from "react";
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import {
	Title,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	Toolbar,
	SaveButton,
} from 'react-admin';

export default (props) => {

	const [name, setName] = React.useState('');
	const [disabledInputFile, setDisabledInputFile] = React.useState(false);
	const [disabledBulk, setDisabledBulk] = React.useState(true);
	const [rol, setRol] = React.useState('');

	const getPicture = async (e) => {

		let file = e.target.files[0]
		let formData = new FormData();

		formData.append('image', file)
		let payload = await axios.post( process.env.REACT_APP_BASE_URL + '/image', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'	
			}
		})
	
		if(payload.data.status === 200) {
			setName(payload.data.result)
			setDisabledInputFile(true)
			setDisabledBulk(false)
		}
	
	}

	const sendFile = async (e) => {

		setDisabledInputFile(true)
		setDisabledBulk(true)

		let payload = await axios.get(process.env.REACT_APP_BASE_URL + '/user/bulk/' + name + '/' + rol, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('session_token'),
				'session': localStorage.getItem('session_id')
			}
		})
	
	}

	const PostCreateToolbar = props => (
    <Toolbar {...props} >
			<SaveButton
				label="Guardar"
				redirect={ '/' }
				submitOnEnter={ false }
				disabled={ disabledBulk }
				onClick={ sendFile }
			/>
    </Toolbar>
	);

	const getRol = (e) => {

		setRol(e.target.value)

	}

	return (
		<Card>
			<Title title="Carga masiva de Usuarios" />
			<CardHeader title="Carga masiva de Usuarios" />
			<CardContent>
			<SimpleForm toolbar={<PostCreateToolbar />}>
				<Button
					variant="contained"
					component="label"
					disabled={ disabledInputFile }
				>
					Enviar Archivo
					<input
						type="file"
						hidden
						onChange={ getPicture }
						multiple={ false }
					/>
				</Button>
				<ReferenceInput source="rol" reference="rol" onChange={ (e) => getRol(e) }>
					<SelectInput optionText="name"  />
				</ReferenceInput>
			</SimpleForm>
			{/* <Button
				variant="contained"
				component="label"
				disabled={ disabledInputFile }
			>
				Enviar Archivo
				<input
					type="file"
					hidden
					onChange={ getPicture }
					multiple={ false }
				/>
			</Button> */}
			{/* Archivo enviado: { name }
			<Button
				variant="contained"
				component="label"
				disabled={ disabledBulk }
				onClick={ sendFile }
			>
				Realizar carga
			</Button> */}
			</CardContent>
		</Card>
	)
};