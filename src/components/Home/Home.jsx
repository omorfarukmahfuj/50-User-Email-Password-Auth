import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import auth from '../../firebase/firebase.config';

const Home = () => {
  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // Create User
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);

      })
      .catch(error => {
        console.error(error);
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
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

export default Home;