import React, { useRef, useState } from 'react';
import auth from '../../firebase/firebase.config';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // Reset Error
    setLoginSuccess('');
    setLoginError('');

    // Logged In User
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);
        if (result.user.emailVerified) {
          setLoginSuccess('User Logged In Successfully')
        } else {
          setLoginError('Please verify your email address')
        }
      })
      .catch(error => {
        console.error(error);
        setLoginError(error.message);
      })

  }

  const handleForgetPassword = e => {
    const email = emailRef.current.value;
    // Reset Error
    setLoginSuccess('');
    setLoginError('');
    if (!email) {
      setLoginError("Please enter your email");
      return;
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLoginError("Please enter a valid email");
      return;
    }
    console.log(email);

    // Send Validation Email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoginSuccess("Please check your email");
      })
      .catch(error => {
        setLoginError(error);
      })
  }

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse gap-52">
          {/* Login Info */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
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
                  ref={emailRef}
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

                <label className="label">
                  <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              {/* Login Error Message */}
              {
                loginError && <div
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
                  <span>{loginError}</span>
                </div>
              }

              {/* Login Success Message */}
              {
                loginSuccess && <div
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
                  <span>{loginSuccess}</span>
                </div>
              }
              <p>New to this website? Please <Link to="/" className='text-primary'>Sign Up</Link></p>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;