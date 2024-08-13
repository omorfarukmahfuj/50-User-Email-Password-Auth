import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase/firebase.config';
import { IoEye, IoEyeOff } from "react-icons/io5";

const Home = () => {
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const termsAccepted = e.target.terms.checked;
    console.log(email, password, termsAccepted);

    // Reset Error
    setSignUpSuccess('');
    setSignUpError('');

    // Input Field Validation
    if (password.length < 6) {
      setSignUpError('Password should be at least 6 characters or longer');
      return;
    }
    else if (!/[A-Z]/.test(password)) {
      setSignUpError('Password should have at least 1 uppercase character');
      return;
    }
    else if (!termsAccepted) {
      setSignUpError('Please accepted the terms & conditions');
      return;
    }

    // Create User
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);
        setSignUpSuccess('User Created Successfully.')

      })
      .catch(error => {
        console.error(error);
        setSignUpError(error.message);
      })

  }
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse gap-52">
          {/* Login Info */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, qui provident. Esse libero alias, eligendi sint, nisi voluptates sunt nam labore, exercitationem fugiat eveniet! Velit ex voluptas consequatur quaerat eius mollitia ratione expedita deserunt dicta modi vero saepe cupiditate veniam amet, aspernatur natus ut assumenda, ducimus architecto iste obcaecati possimus.
            </p>
          </div>

          {/* Login Form */}
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>

                <input
                  type="email"
                  name='email'
                  placeholder="email"
                  className="input input-bordered"
                  required />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <div className='relative'>
                  <input
                    type={showPassword ? "text" : "password"}
                    name='password'
                    placeholder="password"
                    className="input input-bordered w-full"
                    required />
                  <span className='absolute top-1/4 right-5 mt-1' onClick={() => setShowPassword(!showPassword)}>
                    {
                      showPassword ? <IoEyeOff /> : <IoEye />
                    }
                  </span>
                </div>
                <div className='flex  gap-3 mt-3'>
                  <input type="checkbox" name="terms" id="terms" />
                  <label htmlFor="terms">Accept our
                    <a className='text-primary' href=""> Terms & Conditions</a>
                  </label>
                </div>
              </div>

              {/* Sign Up Error Message */}
              {
                signUpError && <div
                  role="alert"
                  className="flex items-center gap-2 text-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{signUpError}</span>
                </div>
              }

              {/* Sign Up Success Message */}
              {
                signUpSuccess && <div
                  role="alert"
                  className="flex items-center gap-2 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{signUpSuccess}</span>
                </div>
              }
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;