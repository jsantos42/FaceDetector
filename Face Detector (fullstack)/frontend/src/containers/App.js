import {useEffect, useState} from "react";
import {loadFull} from "tsparticles";
import Clarifai from 'clarifai'
// For some reason, I cannot import styled-components the normal way (probably
// because of the Clarify API making me use ReactApp v4
// import styled from "styled-components";
import styled from "styled-components/dist/styled-components.js";

import myAPIKey from "../api";
import Nav from "../components/nav/Nav";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import Rank from "../components/rank/Rank";
import ParticlesBg from "../components/particlesBg/ParticlesBg";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import SignForm from "../components/signForm/SignForm";

//==============================================================================
// PARTICLES BACKGROUND
//==============================================================================
// This must be passed as a parameter to the component, otherwise it will
// rerender everytime we write a character in input.
const particlesInit = async (main) => await loadFull(main);


//==============================================================================
// API INITIALIZATION
//==============================================================================
const clarifai = new Clarifai.App({
	apiKey: myAPIKey,
})


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
	const [faceBox, setFaceBox] = useState({});
	const [route, setRoute] = useState('signForm');
	const [form, setForm] = useState('signIn');
	const [currentUser, setCurrentUser] = useState({});
	
	/*
	Note that use Effect might seem to be called twice, despite having no
	dependencies. That is because App is wrapped in React Strict Mode.
	(check https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
	 */
	// useEffect(() => {
	// 	console.log('fetching')
	// 	fetch('http://localhost:3000/')
	// 		.then(res => res.json())
	// 		.then(console.log)
	// }, [])
	
	const getFaceBox = (data) => {
		// for (let i in data.outputs[0].data.regions) {
		let faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
		// console.log("bounding box", faceBox);
		return {
			leftCol: faceBox.left_col * 100,
			topRow: faceBox.top_row * 100,
			rightCol: (1 - faceBox.right_col) * 100,
			bottomRow: (1 - faceBox.bottom_row) * 100,
		}
		// }
	}
	
	/*
	The header is paramount to be read as json. Note also the use of the spread
	operator to pass the rest of the object.
	 */
	const incrementUserEntries = () => {
		fetch('http://localhost:3000/image', {
			method: 'put',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({id: currentUser.id}),
		}).then(res => res.json())
			.then(count => setCurrentUser(user => ({
				...user,
				entries: count,
			})));
	}
	
	const onInputChange = (e) => setInput(e.target.value);
	
	const onFormChange = (form) => setForm(form);
	
	const onPictureSubmit = (e) => {
		setImageUrl(input);
		if (input) {
			clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, input)
				.then(response => {
					if (response)
						incrementUserEntries();
					setFaceBox(getFaceBox(response))
				})
				.catch(error => console.log(error));
		}
	}
	
	const onRouteChange = (route, user) => {
		if (route === 'signForm')
			setForm('signIn')
		setCurrentUser(user);
		setRoute(route);
	}
	
	return (
		<AppDiv>
			{/*<ParticlesBg init={particlesInit}/>*/}
			<Nav onRouteChange={onRouteChange} route={route}/>
			{route === 'signForm'
				? <SignForm form={form} onRouteChange={onRouteChange} onFormChange={onFormChange}/>
				: <>
					<Rank user={currentUser}/>
					<ImageLinkForm onChange={onInputChange} onSubmit={onPictureSubmit}/>
					<FaceRecognition imgUrl={imageUrl} box={faceBox}/>
				</>
			}
		</AppDiv>
	);
}

export default App;
