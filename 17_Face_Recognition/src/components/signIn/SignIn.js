import './style.css'

const SignIn = () => {
    return (
        <main className={'center col sign'}>
            <form>
                <fieldset className={'col'}>
                    <legend>Sign In</legend>
                    <div className={'col signData'}>
                        <label>E-mail</label>
                        <input type={'text'}/>
                        {/*</div>*/}
                        {/*<div className={'center col'}>*/}
                        <label>Password</label>
                        <input type={'password'}/>
                    </div>
                    {/*<div>*/}
                    {/*    <input type={'checkbox'}/>*/}
                    {/*    <label>Remember me</label>*/}
                    {/*</div>*/}
                </fieldset>
                <div className={'center col'}>
                    <input id={'signButton'} type={'submit'} value={'Sign In'}/>
                </div>
                <div className={'col center'}>
                    {/*<a>Forgot your password?</a>*/}
                    <p>Don't have an account? <a><u>Register</u></a></p>
                </div>

            </form>
        </main>

    )
}

export default SignIn;