import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { userRegisterAction } from '../../redux/thunk/actions';
import { useDispatch } from 'react-redux';
import Header from '../../Component/Header';
import background from '../../assets/img/background2.jpg';
import { maNhom } from '../../axios/config';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const schemaValidation = yup.object().shape({
    hoTen: yup.string().required('Hãy nhập họ tên'),
    email: yup
      .string()
      .required('Vui lòng nhập email')
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email không đúng định dạng'
      ),
    taiKhoan: yup
      .string()
      .required('Vui lòng nhập tài khoản')
      .matches(/(?=.{8,})/, 'Tài khoản phải có ít nhất 8 ký tự'),
    matKhau: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .matches(
        /^.*(?=.{8,})(?=.*\d).*$/,
        'Mật khẩu phải có ít nhất 8 ký tự và 1 chữ số'
      ),
    xacMinhMatKhau: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu')
      .oneOf([yup.ref('matKhau'), null], 'Mật khẩu không khớp'),
    soDT: yup.string().required('Vui lòng nhập số điện thoại'),
  });
  const { handleSubmit, formState, register } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaValidation),
  });
  const { errors } = formState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState({
    password: 'password',
    confirmPassword: 'password',
  });
  const [eye, setEye] = useState({
    password: (
      <i className="fa-solid fa-eye-slash absolute right-[30px] top-[36px] text-1.5 opacity-50 cursor-pointer hover:opacity-100 transition-all duration-100"></i>
    ),
    confirmPassword: (
      <i className="fa-solid fa-eye-slash absolute right-[30px] top-[36px] text-1.5 opacity-50 cursor-pointer hover:opacity-100 transition-all duration-100"></i>
    ),
  });
  const handleChangeEye = useCallback(() => {
    if (passwordType.password === 'password') {
      setPasswordType({
        ...passwordType,
        password: 'text',
      });
      setEye({
        ...eye,
        password: (
          <i className="fa-solid fa-eye absolute right-[30px] top-[36px] text-1.5 opacity-50 cursor-pointer hover:opacity-100 transition-all duration-100"></i>
        ),
      });
    } else {
      setPasswordType({
        ...passwordType,
        password: 'password',
      });
      setEye({
        ...eye,
        password: (
          <i className="fa-solid fa-eye-slash absolute right-[30px] top-[36px] text-1.5 opacity-50 cursor-pointer hover:opacity-100 transition-all duration-100"></i>
        ),
      });
    }
  }, [passwordType, eye]);

  const handleChangeEyeConfirm = useCallback(() => {
    if (passwordType.confirmPassword === 'password') {
      setPasswordType({
        ...passwordType,
        confirmPassword: 'text',
      });
      setEye({
        ...eye,
        confirmPassword: (
          <i className="fa-solid fa-eye absolute right-[30px] top-[36px] text-1.5 opacity-50 cursor-pointer hover:opacity-100 transition-all duration-100"></i>
        ),
      });
    } else {
      setPasswordType({
        ...passwordType,
        confirmPassword: 'password',
      });
      setEye({
        ...eye,
        confirmPassword: (
          <i className="fa-solid fa-eye-slash absolute right-[30px] top-[36px] text-1.5 opacity-50 cursor-pointer hover:opacity-100 transition-all duration-100"></i>
        ),
      });
    }
  }, [passwordType, eye]);

  // SUBMIT INFO WHEN USER REGISTER
  const submitInfo = (data) => {
    const { taiKhoan, matKhau, soDT, email, hoTen } = data;
    const action = userRegisterAction(
      {
        taiKhoan,
        matKhau,
        soDT,
        hoTen,
        email,
      },
      maNhom,
      navigate
    );
    dispatch(action);
  };
  return (
    <>
      <section className="header">
        <Header />
      </section>
      <div
        className="register__page min-h-screen "
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        {/* BACKGROUND */}
        <div className="bg-slate-700 opacity-50 min-h-screen"></div>
        {/* FORM */}
        <div className="register__section absolute w-9/12 1024screen:max-w-3xl 1024screen:top-[52%] top-[48%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="register__form animate__animated animate__fadeInUp bg-white mx-auto px-[40px] py-[40px] 1024screen:p-20 rounded-lg opacity-100 ">
            <h1 className="text-center text-1.5 ">
              CHÀO MỪNG BẠN ĐẾN VỚI E-LEARNING
            </h1>
            <h1 className="text-center mb-[1.2rem] text-1.5 animate__animated animate__fadeInUp">
              ĐĂNG KÝ TÀI KHOẢN TẠI ĐÂY
            </h1>
            <form
              className="animate__animated animate__fadeInUp"
              onSubmit={handleSubmit(submitInfo)}
            >
              {/* NAME */}
              <div className="text-field flex flex-col rounded bg-gray-200 mb-[1.2rem] ">
                <label
                  htmlFor="hoTen"
                  className="text-gray-700 font-bold text-1.2 mb-2 pl-3 pt-3"
                >
                  Họ tên
                  {errors.hoTen && (
                    <span className="font-bold text-red-500 ml-3 text-1">
                      {errors.hoTen.message}
                    </span>
                  )}
                </label>
                <input
                  id="hoTen"
                  className="bg-gray-200 text-gray-700 pl-3 text-1.2 rounded w-full focus:outline-none border-b-4 border-gray-300 focus:border-blue-500 transition-all duration-300"
                  type="text"
                  {...register('hoTen')}
                />
              </div>

              {/* EMAIl */}
              <div className="text-field flex flex-col rounded bg-gray-200 mb-[1.2rem] ">
                <label
                  htmlFor="Email"
                  className="text-gray-700 font-bold text-1.2 mb-2 pl-3 pt-3"
                >
                  Email
                  {errors.email && (
                    <span className="font-bold ml-3 text-red-500 text-1">
                      {errors.email.message}
                    </span>
                  )}
                </label>
                <input
                  id="email"
                  className="bg-gray-200 text-gray-700 pl-3 text-1.2 rounded w-full focus:outline-none border-b-4 border-gray-300 focus:border-blue-500 transition-all duration-300"
                  type="text"
                  {...register('email')}
                />
              </div>

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
                  type={passwordType.password}
                  {...register('matKhau')}
                />
                <span
                  onClick={() => {
                    handleChangeEye();
                  }}
                >
                  {eye.password}
                </span>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="text-field flex flex-col rounded bg-gray-200 mb-[1.2rem] relative">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-700 font-bold text-1.2 mb-2 pl-3 pt-3"
                >
                  Xác minh mật khẩu
                  {errors.xacMinhMatKhau && (
                    <span className="font-bold ml-3 text-red-500 text-1">
                      {errors.xacMinhMatKhau.message}
                    </span>
                  )}
                </label>
                <input
                  id="xacMinhMatKhau"
                  className="bg-gray-200 text-gray-700 pl-3 text-1.2 rounded w-full focus:outline-none border-b-4 border-gray-300 focus:border-blue-500 transition-all duration-300"
                  type={passwordType.confirmPassword}
                  {...register('xacMinhMatKhau')}
                />
                <span
                  onClick={() => {
                    handleChangeEyeConfirm();
                  }}
                >
                  {eye.confirmPassword}
                </span>
              </div>

              {/* PHONE NUMBER */}
              <div className="text-field flex flex-col rounded bg-gray-200 mb-[1.2rem] ">
                <label
                  htmlFor="soDT"
                  className="text-gray-700 font-bold text-1.2 mb-2 pl-3 pt-3"
                >
                  Số điện thoại
                  {errors.soDT && (
                    <span className="font-bold ml-3 text-red-500 text-1">
                      {errors.soDT.message}
                    </span>
                  )}
                </label>
                <input
                  id="soDT"
                  className="bg-gray-200 text-gray-700 pl-3 text-1.2 rounded w-full focus:outline-none border-b-4 border-gray-300 focus:border-blue-500 transition-all duration-300"
                  type="text"
                  {...register('soDT')}
                />
              </div>

              <button className="register  w-full mt-3 py-6 px-6 text-1.2 font-medium bg-sky-400 rounded-full text-white hover:bg-sky-500 transition-all">
                ĐĂNG KÝ
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
