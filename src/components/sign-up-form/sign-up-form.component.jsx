import { useState } from 'react';
import { createAuthUserWithEmailAndPassword , createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = event => {
    console.log(event.value)
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(password !== confirmPassword) {
        alert('password does not match')
        return
    }
    try {
        const { user } = await createAuthUserWithEmailAndPassword(email, password)
        await createUserDocumentFromAuth(user, { displayName }) 
        setFormFields(defaultFormFields)
    } catch (error) {
        console.error('User Creation encountered an error', error)
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Dont have an account ?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput lable='Display Name' required type="text" onChange={handleChange} name="displayName" value={displayName} />

        <FormInput lable='Email' required type="email" onChange={handleChange} name="email" value={email} />

        <FormInput lable='Password' required type="password" onChange={handleChange} name="password" value={password} />

        <FormInput lable='Confirm Password' required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} />

        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
