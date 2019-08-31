import dispatcher from '../appDispatcher';
import * as courseApi from '../api/courseApi';
import actionTypes from "./actionTypes";

export function saveCourse(course) {
    return courseApi.saveCourse(course).then(savedCourse => {
        //hey dispatcher, go tell all the stores that a course was just created.
        dispatcher.dispatch({
            actionType: course.id ? actionTypes.CREATE_COURSE : actionTypes.UPDATE_COURSE,
            course: savedCourse
        });
    });
}

export function loadCourses() {
    return courseApi.getCourses().then(courses => {
        dispatcher.dispatch({
            actionType: actionTypes.LOAD_COURSES,
            course: courses
        });
    });
}

export function deleteCourse(id) {
    return courseApi.deleteCourse(id).then(() => {
        dispatcher.dispatch({
            actionType: actionTypes.DELETE_COURSES,
            id: id
        });
    });
}
