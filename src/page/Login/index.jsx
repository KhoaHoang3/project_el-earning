import React, { useCallback, useState } from 'react';
import Header from '../../Component/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import background from '../../assets/img/background2.jpg';
import student from '../../assets/img/student.png';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount } from '../../redux/selectors';
import { userLoginAction } from '../../redux/thunk/actions';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const schemaValidation = yup.object().shape({
    taiKhoan: yup.string().required('Vui lòng nhập tài khoản'),
    matKhau: yup.string().required('Vui lòng nhập mật khẩu'),
  });

  const { handleSubmit, formState, register } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaValidation),
  });
  const { errors } = formState;
  const [passwordType, setPasswordType] = useState('password');
  const [eye, setEye] = useState(
    <i className="fa-solid fa-eye-slash absolute right-[30px] top-[36px] text-1.5 opacity-50 cursor-pointer hover:opacity-100 transition-all duration-100"></i>
  );
  const handleChangeEye = useCallback(() => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setEye(
        <i className="fa-solid fa-eye absolute right-[30px] top-[36px] text-1.5 opacity-50 cursor-pointer hover:opacity-100 transition-all duration-100"></i>
      );
    } else {
      setPasswordType('password');
      setEye(
        <i className="fa-solid fa-eye-slash absolute right-[30px] top-[36px] text-1.5 opacity-50 cursor-pointer hover:opacity-100 transition-all duration-100"></i>
      );
    }
  }, [passwordType, eye]);

  const { userAccount } = useSelector(getUserAccount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitInfo = (data) => {
    const action = userLoginAction(data, navigate);
    dispatch(action);
  };

  return (
    <>
      <section className="header ">
        <Header />
      </section>

      <section
        style={{
          backgroundImage: `url(${background})`,
          minHeight: '100vh',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          position: 'relative',
        }}
        className="login"
      >
        <div className="bg-slate-700 opacity-50 min-h-screen"></div>
        <div className="login__section">
          {/* IMAGE */}
          <div className="login__section__image  absolute top-[28%] left-[48%] translate-x-[-50%] translate-y-[-50%]">
            <img
              className="animate__animated animate__fadeInUp"
              src={`${student}`}
              alt=""
            />
          </div>
          {/* FORM */}
          <div className="login__section__form w-[75%] 1024screen:max-w-3xl absolute top-[62%] left-[50%] 1024screen:left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="login__form bg-white mx-auto  p-20 1024screen:p-20 rounded-lg opacity-100 animate__animated animate__fadeInUp">
              <h1 className="text-center mb-[1.2rem] text-1.5 ">
                ĐĂNG NHẬP VÀO E-LEARNING
              </h1>
              <form
                className="animate__animated animate__fadeInUp"
                onSubmit={handleSubmit(submitInfo)}
              >
                {/* ACCOUNT */}
                <div className="text-field flex flex-col rounded bg-gray-200 mb-[1.2rem] ">
                  <label
                    htmlFor="taiKhoan"
                    className="text-gray-700 font-bold text-1.2 mb-2 pl-3 pt-3"
                  >
                    Tài khoản
                    {errors.taiKhoan && (
                      <span className="font-bold ml-3 text-red-500 text-1">
                        {errors.taiKhoan.message}
                      </span>
                    )}
                  </label>
                  <input
                    defaultValue={userAccount}
                    id="taiKhoan"
                    className="bg-gray-200 text-gray-700 pl-3 text-1.2 rounded w-full focus:outline-none border-b-4 border-gray-300 focus:border-blue-500 transition-all duration-300"
                    type="text"
                    {...register('taiKhoan')}
                  />
                </div>

                {/* PASSWORD */}
                <div className="text-field flex flex-col rounded bg-gray-200 mb-[1.2rem] relative ">
                  <label
                    htmlFor="matKhau"
                    className="text-gray-700 font-bold text-1.2 mb-2 pl-3 pt-3"
                  >
                    Mật khẩu
                    {errors.matKhau && (
                      <span className="font-bold ml-3 text-red-500 text-1">
                        {errors.matKhau.message}
                      </span>
                    )}
                  </label>
                  <input
                    id="matKhau"
                    className="bg-gray-200 text-gray-700 pl-3 text-1.2 rounded w-full focus:outline-none border-b-4 border-gray-300 focus:border-blue-500 transition-all duration-300"
                    type={passwordType}
                    {...register('matKhau')}
                  />
                  <span
                    onClick={() => {
                      handleChangeEye();
                    }}
                  >
                    {eye}
                  </span>
                </div>

                <button className="register  w-full mt-3 py-6 px-6 text-1.2 font-medium bg-sky-400 rounded-full text-white hover:bg-sky-500 transition-all">
                  ĐĂNG NHẬP
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
