import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { getCourseList } from '../../redux/selectors';

function Footer() {
  const { courseList } = useSelector(getCourseList);
  return (
    <div className="footer__section  bg-black min-h-[60vh] 767screen:min-h-[70vh] 1367screen:min-h-[40vh] relative ">
      <div
        data-wow-delay="0.2s"
        className=" animate__animated animate__flipInX wow flipInX block 1367screen:flex justify-evenly align-middle w-[80%] mx-auto pt-[70px] absolute left-[220px]"
      >
        <div className="footer__title ">
          <h1 className="text-white text-center text-1.5">
            E-LEARNING
          </h1>
          <h1 className="text-white text-1.5 text-center">
            Hệ thống đào tạo phi lợi nhuận, hoàn toàn miễn phí
          </h1>
        </div>
        <div className="footer__course mt-[50px] 1367screen:mt-0">
          <h1 className="text-white text-1.5 text-center ">
            DANH MỤC KHÓA HỌC
          </h1>
          <ul>
            {courseList.map((item, index) => {
              return (
                <li
                  className="text-white text-center mb-[10px] text-1.5 cursor-pointer"
                  key={index}
                >
                  {item.tenDanhMuc}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="footer__contact mt-[50px] 1367screen:mt-0"></div>
      </div>
    </div>
  );
}

export default memo(Footer);
