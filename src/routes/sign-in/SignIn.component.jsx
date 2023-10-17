import SignUpForm from "../../components/sign-up-form/sign-up-form.component"
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        const userSnapshot = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>Sing in with Google</button>

            <SignUpForm />
        </div>
    )
}

export default SignIn