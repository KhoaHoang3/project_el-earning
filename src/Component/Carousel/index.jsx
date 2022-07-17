import React from 'react';
import student from '../../assets/img/student2.png';

export default function Carousel() {
  return (
    <div className="carousel__section relative">
      <div className="carousel__background"></div>
      <div className="carousel__introduction absolute max-w-[2080px] top-[150px] left-[20px] 1315screen:left-[90px] 1024screen:grid grid-cols-2">
        <div className="introduction animate__animated animate__slideInLeft flex text-center 1024screen:text-left justify-center flex-col align-middle ml-[50px]">
          <h1 className="1024screen:text-2 font-semibold">
            BẠN MUỐN TRỞ THÀNH MỘT LẬP TRÌNH VIÊN ?
          </h1>
          <p className=" 1024screen:text-2">
            Hãy tham gia khóa học của chúng tôi để trở thành lập trình
            viên chuyên nghiệp, E-Learning cung cấp các khóa học về
            lập trình với hệ thống hiện đại, hỗ trợ học viên
            24/7.Chương trình giảng dạy năng đông, linh hoạt phù hợp
            với thời đại 4.0 hiện nay.Đặc biệt kết nối học viên với
            các doanh nghiệp tuyển dụng.
          </p>
        </div>
        <div className="image animate__animated animate__slideInRight 024screen:ml-[50px] flex justify-center ">
          <img
            className="1024screen:h-[1040px]"
            src={`${student}`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
