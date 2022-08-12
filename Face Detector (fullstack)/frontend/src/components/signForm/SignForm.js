import './style.css'

/* Note that in JSX, the html attribute for (present in the labels) should be
 renamed to htmlFor, since 'for' is a JS keyword */
const SignForm = ({form, onRouteChange, onFormChange}) => {
    const formName = (form === 'signIn') ? 'Sign In' : 'Register';
    const name = (form === 'signIn')
        ? null
        : <>
            <label htmlFor={'name'}>Name</label>
            <input type={'text'} id={'name'} name={'name'} required/>
        </>;
    const formSwitcher = (form === 'signIn')
        ? <p>Don't have an account? <a onClick={() => onFormChange('register')}><u>Register</u></a></p>
        : <p>Already have an account? <a onClick={() => onFormChange('signIn')}><u>Sign In</u></a></p>
	
	
	/*
	(1) FormData is obtained in a more automated way than just getting
	event.target.{property}.value, where property would be 'email', 'password',
	and 'name'.
	(2) To send a json to the server we need to stringify it
	(3) The preventDefault() avoids the warning "Form submission canceled
	because the form is not connected"
	*/
	const onSubmitFormData = (event) => {
		const formData = Object.fromEntries(
			Object.values(event.target)
				.filter(element => ['name', 'email', 'password'].includes(element.name))
				.map(element => [element.name, element.value]))			// (1)
		
		fetch(`http://localhost:3000/${form}`, {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(formData)								// (2)
		}).then(promiseResult => promiseResult.json())
		  .then(res => {
			  if (typeof res === "object")
				  onRouteChange('home', res);
			})
		event.preventDefault();											// (3)
	}
	
	return (
        <main className={'center col sign'}>
            <form onSubmit={onSubmitFormData}>
                <fieldset className={'col'}>
                    <legend>{formName}</legend>
                    <div className={'col signData'}>
                        {name}
                        <label htmlFor={'email'}>E-mail</label>
                        <input type={'email'} id={'email'} name={'email'} required/>
                        <label htmlFor={'password'}>Password</label>
                        <input type={'password'} id={'password'} name={'password'} required/>
                    </div>
                </fieldset>
                <div className={'center col'}>
                    <input id={'signButton'}
						   type={'submit'}
						   value={formName}/>
                </div>
                <div className={'col center'}>
                    {formSwitcher}
                </div>
            </form>
        </main>

    )
}

// <main className={'center col sign'}>
// 	<form>
// 		<fieldset className={'col'}>
// 			<legend>{formName}</legend>
// 			<div className={'col signData'}>
// 				{name}
// 				<label htmlFor={'email'}>E-mail</label>
// 				<input type={'text'} name={'email'}/>
// 				<label htmlFor={'password'}>Password</label>
// 				<input type={'password'} name={'password'}/>
// 			</div>
// 			<div>
// 			    <input type={'checkbox'} name={'remember'} />
// 			    <label for={'remember'}>Remember me</label>
// 			</div>
// 		</fieldset>
// 		<div className={'center col'}>
// 			<input id={'signButton'}
// 				   type={'submit'}
// 				   value={formName}
// 				   onClick={(e) => onRouteChange(e, 'home')}/>
// 		</div>
// 		<div className={'col center'}>
// 			<a>Forgot your password?</a>
// 			{formSwitcher}
// 		</div>
// 	</form>
// </main>



export default SignForm;