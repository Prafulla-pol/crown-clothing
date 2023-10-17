import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.component.styles.scss';
import { useState } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

const defaultFormInputs = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formInputs, setFormInputs] = useState(defaultFormInputs);
  const { email, password } = formInputs;

  const handleChange = event => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSignIn = async event => {
    event.preventDefault();
    try {
        await signInAuthUserWithEmailAndPassword(email, password)
        setFormInputs({...defaultFormInputs})
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className='sign-up-container'>
                    <h2>Sign in page</h2>
      <FormInput lable="Email" required type="email" onChange={handleChange} name="email" value={email} />

      <FormInput lable="Password" required type="password" onChange={handleChange} name="password" value={password} />

      <div className="buttons-container">
        <Button onClick={handleSignIn}>Sign In</Button>
        <Button buttonType="google" onClick={logGoogleUser}>
          Sing in with Google
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;
