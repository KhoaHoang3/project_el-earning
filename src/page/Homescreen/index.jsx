import React, { useEffect } from 'react';
import Carousel from '../../Component/Carousel';
import CourseList from '../../Component/CourseList';
import FindCourse from '../../Component/FindCourse';
import Header from '../../Component/Header';

export default function Homescreen() {
  return (
    <>
      <section className="header">
        <Header />
      </section>

      <section className="carousel">
        <Carousel />
      </section>

      <section className="findCourse mt-[4rem] mb-[4rem]">
        <FindCourse />
      </section>

      <section className="courseList">
        <CourseList />
      </section>
    </>
  );
}
