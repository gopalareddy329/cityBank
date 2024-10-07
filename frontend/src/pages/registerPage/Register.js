import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
    const {registerUser} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    income:0
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};


    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      registerUser(e);
    } else {
      console.log('Form has errors. Please fix them.');
    }
  };

  return (
    <section className="bg-gray-50 pt-5 w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  :h-fit lg:py-0">
        
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                      Create an account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                          <input type="email"   value={formData.email} onChange={handleChange}  name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     " placeholder="name@company.com" required={true}/>
                          {errors.email && <p>{errors.email}</p>}
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                          <input type="password"   value={formData.password} onChange={handleChange} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     " required={true}/>
                          {errors.password && <p>{errors.password}</p>}
                      </div>
                      <div>
                          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     " required={true}/>
                          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                      </div>
                      <div>
                          <label htmlFor="income" className="block mb-2 text-sm font-medium text-gray-900 ">Income</label>
                          <input type="number" name="income" value={formData.income} onChange={handleChange} id="confirm-password" placeholder="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     " required={true}/>
                      </div>
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  " required={true}/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-900">I accept the <span className="font-medium text-primary-600 hover:underline " href="#">Terms and Conditions</span></label>
                          </div>
                      </div>
                      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                      <p className="text-sm font-light text-gray-500 ">
                          Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline ">Login here</Link>
                      </p>
                      
                  </form>
              </div>
          </div>
      </div>
    </section>
   
  );
};

export default RegistrationForm;
