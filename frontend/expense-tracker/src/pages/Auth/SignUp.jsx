    import React, {useContext, useState} from 'react'
    import AuthLayout from '../../compononets/layouts/AuthLayout';
    import { Link, useNavigate } from 'react-router-dom';
    import Input from '../../compononets/Inputs/Input';
    import { validateEmail } from '../../utils/helper';
    import ProfilePhotoSelector from '../../compononets/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

    const SignUp  = () => {
        // useState to store and manage user-entered Data
        const [profilePic, setProfilePic] = useState(null);
        const [fullName, setFullName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        
        const [error, setError] = useState(null);

        const { updateUser } = useContext(UserContext);
        const navigate = useNavigate();

        // Handle Sign Up Form Submit 
        const handleSignUp = async (e) => {
            {/* Don't allow login if no email and no password */}
            e.preventDefault();
            
            let profileImageUrl = "";
            
            if (!fullName) {
                setError("Please enter your name");
                return;
            }

            if (!validateEmail(email)) {
                setError("Please enter a valid email address.");
                return;
            }
            
            if (!password) {
                setError("Please enter the password");
                return;
            }
            
            setError("");

            // SignUp API Call
            try {

                // Upload image if present
                if (profilePic) {
                    const imgUploadRes = await uploadImage(profilePic);
                    profileImageUrl = imgUploadRes.imageUrl || "";
                }

                // Send POST request to the registration API endpoint with user details
                const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                    fullName,
                    email,
                    password,
                    profileImageUrl,
                });
            
                const { token, user } = response.data; // Destructure the response to extract token and user data

                // If a token is received, the signup was successful
                if (token) {
                    localStorage.setItem("token", token); 
                    updateUser(user); 
                    navigate("/dashboard"); // redirect user to dash
                }
            } catch (error) {
                // If there's a specific error message from the server, display it
                if (error.response && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError("Something went wrong. Please try again.");
                }
            }

        }

        return (
            <AuthLayout>
                <div className='lg:w-[100%] h-auto md:h-full md:mt-0 flex flex-col justify-center'>
                    <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
                    <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                        Join us today by entering your details below.
                    </p>
                
                    <form onSubmit={handleSignUp}>

                        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} /> 

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <Input
                                value={fullName}
                                onChange={({ target }) => setFullName(target.value)}
                                label='Full Name'
                                placeholder='John'
                                type='text'
                            />

                            <Input 
                                value={email} 
                                onChange={({ target }) => setEmail(target.value)}
                                label='Email Address'
                                placeholder='john@exmaple.com'
                                type='text'
                            />
                            <div className='col-span-2'>
                                <Input 
                                    value={password} 
                                    onChange={({ target }) => setPassword(target.value)}
                                    label='Password'
                                    placeholder='Min 8 Characters'
                                    type='password'
                                />
                            </div>
                        </div>
                        {/* If there is an error (truthy), display it in red text */}
                        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                        
                            {/* Redirect user to login if already owns an account */}
                            <button type='submit' className='btn-primary'>SIGN UP</button>
                            <p className='text-[13px] text-slate-800 mt-3'>
                                Already have an account?{" "}
                                <Link className='font-medium text-primary underline' to='/login'>
                                     Login
                                </Link>
                            </p>
                    </form>

                </div>

            </AuthLayout>
        )
    }

    export default SignUp