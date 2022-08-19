import {useEffect, useState} from "react";
import {loadFull} from "tsparticles";
import styled from "styled-components";
import Nav from "../components/nav/Nav";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import Rank from "../components/rank/Rank";
import ParticlesBg from "../components/particlesBg/ParticlesBg";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import SignForm from "../components/signForm/SignForm";

//==============================================================================
// SERVER URL
//==============================================================================
const serverURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';
// console.log(serverURL)

//==============================================================================
// PARTICLES BACKGROUND
//==============================================================================
// This must be passed as a parameter to the component, otherwise it will
// rerender everytime we write a character in input.
const particlesInit = async (main) => await loadFull(main);


//==============================================================================
// APP STYLING
//==============================================================================
const AppDiv = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: center;

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .col {
    display: flex;
    flex-direction: column;
  }

  a {
    cursor: pointer;
  }

  button {
    cursor: pointer;
  }
`;


//==============================================================================
// APP ITSELF
//==============================================================================
const App = () => {
	const [input, setInput] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [faceBoxes, setFaceBoxes] = useState([]);
	const [route, setRoute] = useState('signForm');
	const [form, setForm] = useState('signIn');
	const [currentUser, setCurrentUser] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	
	/*
	Note that use Effect might seem to be called twice, despite having no
	dependencies. That is because App is wrapped in React Strict Mode.
	(check https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
	 */
	// useEffect(() => {
	// 	console.log('fetching')
	// 	fetch(serverURL)
	// 		.then(res => res.json())
	// 		.then(console.log)
	// }, [])
	
	const getFaceBoxes = (data) => {
		if (data.outputs[0].data.regions)
			return data.outputs[0].data.regions.map(i => {
				let box = i.region_info.bounding_box;
				return {
					leftCol: box.left_col * 100,
					topRow: box.top_row * 100,
					rightCol: (1 - box.right_col) * 100,
					bottomRow: (1 - box.bottom_row) * 100,
				}
			})
		else
			return [];
	}
	
	/*
	The header is paramount to be read as json. Note also the use of the spread
	operator to pass the rest of the object.
	 */
	const incrementUserEntries = () => {
		fetch(`${serverURL}/entries`, {
			method: 'put',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({id: currentUser.id}),
		})
	 	.then(res => res.json())
	 	.then(count => setCurrentUser(user => ({
				...user,
				entries: count,
			})))
		.catch(err => console.log(err));
	}
	
	const onInputChange = (e) => setInput(e.target.value);
	
	const onFormChange = (form) => {
		setForm(form);
		setErrorMessage('');
	}
	
	const onError = (str) => setErrorMessage(str);
	
	const onPictureSubmit = (e) => {
		setImageUrl(input);
		if (input) {
			fetch(`${serverURL}/analyseImage`, {
				method: 'post',
				headers: {'content-type': 'application/json'},
				body: JSON.stringify({input}),
			})
		  	.then(response => response.json())
		  	.then(response => {
				if (response && typeof response === "object") {
					incrementUserEntries();
					setFaceBoxes(getFaceBoxes(response))
				}
			})
		  	.catch(error => console.log(error));
		}
	}
	
	const onRouteChange = (route, user) => {
		if (route === 'signForm') {
			setForm('signIn');
			setImageUrl('');
			setErrorMessage('');
		}
		setCurrentUser(user);
		setRoute(route);
	}
	
	return (
		<AppDiv>
			<ParticlesBg init={particlesInit}/>
			<Nav onRouteChange={onRouteChange} route={route}/>
			{route === 'signForm'
				? <SignForm serverURL={serverURL}
							form={form}
							errorMessage={errorMessage}
							onRouteChange={onRouteChange}
							onFormChange={onFormChange}
							onError={onError}/>
				: <>
					<Rank user={currentUser}/>
					<ImageLinkForm onChange={onInputChange} onSubmit={onPictureSubmit}/>
					<FaceRecognition imgUrl={imageUrl} box={faceBoxes}/>
				</>
			}
		</AppDiv>
	);
}

export default App;
