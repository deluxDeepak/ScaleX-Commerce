import React, { useState } from 'react'
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../../components/ErrorMessage';
import { useAuthAction } from '../auth.hook';
import LoginBanner from '../components/LoginBanner';


const CreateUser = ({
  user,
  handleChange,
  onSubmit,
  setIsCreatingAccount,
  loading,
  error,
}) => {

  const fields = [
    { name: "name", type: "text", placeholder: "Enter name" },
    { name: "email", type: "email", placeholder: "Enter email" },
    { name: "password", type: "password", placeholder: "Enter password" },
  ];

  return (
    <div className='w-full max-w-md mx-auto bg-[#111] border border-gray-800 shadow-xl rounded-xl p-6 text-white'>

      <h2 className="text-xl font-semibold text-center mb-4">
        Create Account
      </h2>

      <form onSubmit={onSubmit} className='flex flex-col gap-3'>
        <ErrorMessage message={error} />

        {fields.map((field) => (
          <Input
            key={field.name}
            type={field.type}
            name={field.name}
            value={user[field.name]}
            placeholder={field.placeholder}
            onChange={handleChange}
            className='bg-black border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none'
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-green-500 hover:bg-green-600 text-black font-medium p-2"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

      </form>

      <div className='text-sm text-center mt-4'>
        Have account ?
        <button
          className='text-blue-500 ml-1 hover:text-blue-700'
          onClick={() => setIsCreatingAccount(false)}
        >
          Login here
        </button>
      </div>

    </div>
  );
};


const ForgetPassword = ({
  onSubmit, user, handleChange, SetIsForgetPassword
}) => (
  <div className='w-full max-w-md mx-auto bg-[#111] border border-gray-800 shadow-xl rounded-xl p-6 text-white'>

    <h2 className="text-xl font-semibold text-center mb-4">
      Send OTP to verify password
    </h2>

    <form action="" onSubmit={onSubmit} className='flex flex-col gap-3'>

      <input
        type="email"
        name="email"
        value={user.email}
        placeholder='Enter email'
        onChange={handleChange}
        className='p-2 bg-black border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none'
      />

      <button
        type='submit'
        className="rounded-md bg-green-500 hover:bg-green-600 text-black font-medium p-2"
      >
        Send OTP
      </button>

    </form>

    <p className='text-center mt-4 text-sm'>
      <button
        className='text-blue-500 hover:text-blue-700'
        onClick={() => SetIsForgetPassword(false)}
      >
        Back to login
      </button>
    </p>

  </div>
)


const LoginComp = ({
  user,
  setIsCreatingAccount,
  handleChange,
  onSubmit,
  SetIsForgetPassword,
  loading,
  error,
}) => (

  <div className='w-full max-w-md mx-auto bg-[#111] border border-gray-800 shadow-xl rounded-xl p-6 text-white'>
    <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

    <form action="" onSubmit={onSubmit} className='flex flex-col gap-3'>
      <ErrorMessage message={error} />

      <input
        type="email"
        name="email"
        value={user.email}
        placeholder='Enter email'
        onChange={handleChange}
        className='p-2 bg-black border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none'
      />

      <input
        type="password"
        name="password"
        value={user.password}
        placeholder='Enter password'
        onChange={handleChange}
        className='p-2 bg-black border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none'
      />

      <p
        className='text-right text-sm text-blue-500 cursor-pointer hover:text-blue-700'
        onClick={() => SetIsForgetPassword(true)}
      >
        Forgot Password?
      </p>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-green-500 hover:bg-green-600 text-black font-medium p-2"
      >
        {loading ? "Loading..." : "Login"}
      </button>

    </form>

    <p className='text-center text-sm mt-4'>
      Don't have account?
      <button
        className='text-blue-500 ml-1 hover:text-blue-700'
        onClick={() => setIsCreatingAccount(true)}
      >
        Create account
      </button>
    </p>

  </div>
)


const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",

  });

  // const {  } = useAuth();
  // -user,
  // -loading,
  // -logout,
  // -setUser

  const { login, register, loginError, registerError, loading } = useAuthAction();
  // console.log("Login error is ", loginError);  //Every key press calling 

  // Context loading = button ke liye nahi
  // Hook loading = global ke liye nahi
  // Context loading → app
  // Hook loading → action

  // State change karna hai to hook

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isForgetPassword, SetIsForgetPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // only login 
  // ->name/email
  // ->password
  async function onLogin(e) {
    e.preventDefault();

    // Role based login ----------
    const res = await login(form);  //api call ke await lagana parega 
    setForm({
      password: "",
      email: ""
    });
    console.log("response of loggedin user", res);
    if (res.role === "seller") {
      navigate("/seller/dashboard");
    }
    else {
      navigate("/");
    }

    if (!res) return;   //Error happen 

  }

  // Create Account
  // ->name
  // ->email
  // ->password
  async function onCreate(e) {
    e.preventDefault();

    // Clear flied 
    const ok = await register(form);  //api call ke await lagana parega 
    setForm({
      name: "",
      password: "",
      email: ""
    });
    if (!ok) return;
    navigate("/");
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("Send Otp to the backend")
    setForm({
      email: ""
    });

  }

  // Yehan do ui state render kar rehe hai 
  // ->Three Ui states hai 
  // ->CreateUser
  // ->LoginUser
  // ->ForgetPassword

  return (
    <div className="min-h-screen flex bg-black text-white">

      {/* LEFT: Banner */}
      <div className="hidden lg:block w-1/2 border-r border-gray-800">
        <LoginBanner />
      </div>

      {/* RIGHT: Auth Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">

        {/* Forms */}
        <div className="w-full">
          {
            isForgetPassword ? (
              <ForgetPassword
                onSubmit={onSubmit}
                user={form}
                handleChange={handleChange}
                SetIsForgetPassword={SetIsForgetPassword}
              />
            ) : isCreatingAccount ? (
              <CreateUser
                user={form}
                setIsCreatingAccount={setIsCreatingAccount}
                onSubmit={onCreate}
                handleChange={handleChange}
                error={registerError}
              />
            ) : (
              <LoginComp
                user={form}
                setIsCreatingAccount={setIsCreatingAccount}
                onSubmit={onLogin}
                handleChange={handleChange}
                SetIsForgetPassword={SetIsForgetPassword}
                loading={loading}
                error={loginError}
              />
            )
          }
        </div>


      </div>

    </div>
  );
}

export default Login