    import React, { useState } from "react";
    import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

    const Input = ({value, onChange, placeholder, label, type}) => {
        {/* Create variables for showing and hiding password and set to boolean condition false */}
        const [showPassword, setShowPassword] = useState(false);

        
        // Function to toggle the visibility of the password input
        const toggleShowPassword = () => {
            setShowPassword(!showPassword);
        };
        
        // Determine the input type: 
        // if it's a password field, switch between 'text' and 'password' based on showPassword state
        let inputType = type;
        if (type === 'password') {
            inputType = showPassword ? 'text' : 'password';
        }

        return (
            <div>
                <label className="text-[13px] text-slate-800">{label}</label>

                <div className="input-box">
                    <input
                        type={inputType}
                        placeholder={placeholder}
                        className="w-full bg-transparent outline-none"
                        value={value}
                        onChange={(e) => onChange(e)} // calls parent's onChange handler on input change
                    />

                    {/** Only render this block if the input type is password  */}
                    {type === "password" && (
                        <>
                        {showPassword ? (
                            // Show eye (visible) icon if password is visible if true
                            <FaRegEye
                                size={22}
                                className="text-primary cursor-pointer"
                                onClick={toggleShowPassword}
                                />
                        ) : ( 
                            // Show eye-slash (hidden) icon if password is hidden if false
                            <FaRegEyeSlash
                                size={22}
                                className="text-slate-400 cursor-pointer"
                                onClick={toggleShowPassword}
                            />
                        )}
                      </>
                    )}
                </div>
            </div>
        )
    }

    export default Input