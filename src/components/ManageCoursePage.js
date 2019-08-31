import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from '../stores/courseStore';
import { toast } from 'react-toastify';
import * as courseActions from '../actions/courseActions';

const ManageCoursePage = props => {
    const [errors, setErrors] = useState({});
    const[courses, SetCourses] = useState(courseStore.getCourses());
    const [ course, setCourse ] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: null,
        category: ""
    });

    useEffect( () => {
        courseStore.addChangeListener(onChange);
        const slug = props.match.params.slug; //from the path '/courses/:slug'
        if (courses.length === 0) {
            courseActions.loadCourses();
        } else if (slug) {
            setCourse(courseStore.getCourseBySlug(slug));
            /*courseApi.getCourseBySlug(slug).then( _course => { 
                setCourse(_course)
            });*/
        }
        return () => courseStore.removeChangeListener(onChange);
    }, [courses.length, props.match.params.slug]);

    function onChange() {
        SetCourses(courseStore.getCourses());
    }

    function handleChange({target}) {
        const updatedCourse = {
            ...course, 
            [target.name]: target.value 
        };
        setCourse(updatedCourse);
    }

    function formIsValid() {
        const _errors = {};

        if(!course.title) _errors.title="Title is required";
        if(!course.authorId) _errors.authorId="Author Id is required";
        if(!course.category) _errors.category="Category is required";

        setErrors(_errors);
        // Form is valid if the errors object has no properties
        return Object.keys(_errors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!formIsValid()) return;
        courseActions.saveCourse(course).then( ()=> {
            props.history.push("/courses");
            toast.success('Course saved');
        });       
        /*courseApi.saveCourse(course).then( ()=> {
            props.history.push("/courses");
            toast.success('Course saved');
        });*/
    }

    return (
        <>
            <h2>Manage Course</h2>
            <CourseForm 
                errors={errors}
                course={course} 
                onChange={handleChange} 
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default ManageCoursePage;