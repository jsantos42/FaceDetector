import './style.css'

// Note that in JSX, the html attribute for (present in the labels) should be
// renamed to htmlFor, since 'for' is a JS keyword
const SignForm = ({form, onRouteChange, onFormChange}) => {
    const formName = (form === 'signIn') ? 'Sign In' : 'Register';
    const name = (form === 'signIn')
        ? null
        : <>
            <label htmlFor={'name'}>Name</label>
            <input type={'text'} name={'name'}/>
        </>;
    const formSwitcher = (form === 'signIn')
        ? <p>Don't have an account? <a onClick={() => onFormChange('register')}><u>Register</u></a></p>
        : <p>Already have an account? <a onClick={() => onFormChange('signIn')}><u>Sign In</u></a></p>

    return (
        <main className={'center col sign'}>
            <form>
                <fieldset className={'col'}>
                    <legend>{formName}</legend>
                    <div className={'col signData'}>
                        {name}
                        <label htmlFor={'email'}>E-mail</label>
                        <input type={'text'} name={'email'}/>
                        <label htmlFor={'password'}>Password</label>
                        <input type={'password'} name={'password'}/>
                    </div>
                    {/*<div>*/}
                    {/*    <input type={'checkbox'} name={'remember'} />*/}
                    {/*    <label for={'remember'}>Remember me</label>*/}
                    {/*</div>*/}
                </fieldset>
                <div className={'center col'}>
                    <input id={'signButton'} type={'submit'} value={formName} onClick={(e) => onRouteChange(e, 'home')}/>
                </div>
                <div className={'col center'}>
                    {/*<a>Forgot your password?</a>*/}
                    {formSwitcher}
                </div>
            </form>
        </main>

    )
}

export default SignForm;