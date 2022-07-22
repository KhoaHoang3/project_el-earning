import React, { memo, useEffect } from 'react';
import { getCourseAction } from '../../redux/thunk/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCourse } from '../../redux/selectors';
import { NavLink } from 'react-router-dom';
import { getCourseDetail } from '../../redux/reducers/CourseDetailSlice';

function CourseList() {
  const dispatch = useDispatch();
  const { course } = useSelector(getCourse);
  useEffect(() => {
    const action = getCourseAction();
    dispatch(action);
  }, [dispatch]);
  return (
    <div className="course__list__section w-[100%] 1024screen:w-[90%] mx-auto">
      <div className="course__list__title animate__animated animate__slideInUp wow slideInUp border-b-4 border-sky-500">
        <h1 className="text-center text-1.5 ">
          CÁC KHÓA HỌC MỚI NHẤT
        </h1>
      </div>
      <div
        data-wow-delay="0.5s"
        className="course__list__info animate__animated animate__zoomIn wow zoomIn"
      >
        <div className="course  flex flex-wrap justify-center align-middle">
          {course.map((item, index) => {
            return (
              <div key={index} className="item p-[30px] ">
                <div className="content bg-white rounded-md overflow-hidden shadow-xl hover:shadow-sky-300 transition-all duration-500">
                  <div className="course__image">
                    <img
                      src={item.hinhAnh}
                      className="w-full h-[150px] object-cover"
                      alt=""
                    />
                  </div>
                  <div className="course__info m-4">
                    <h1 className="text-1.2">{item.tenKhoaHoc}</h1>
                    <p className="text-1.2">
                      Lượt xem: {item.luotXem}
                    </p>
                    <NavLink to={`/course-detail/${item.maKhoaHoc}`}>
                      <span
                        onClick={() => {
                          console.log(item);
                          dispatch(getCourseDetail(item));
                        }}
                        className="cursor-pointer text-1.2 text-black hover:text-sky-400"
                      >
                        Xem chi tiết
                        <i className="fa-solid fa-arrow-right pl-2"></i>
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(CourseList);
