import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class CoursesPage extends React.Component {
    state = {
        course: {
            title: ''
        }
    };

    handChange = e => {
        const course = { ...this.state.course, title: e.target.value };
        this.setState({ course });
    };

    handeSubmit = e => {
        e.preventDefault();
        this.props.actions.createCourse(this.state.course);
    };

    render() {
        return (
            <form onSubmit={this.handeSubmit}>
                <h2>Course</h2>
                <h3>Add course</h3>
                <input
                    type="text"
                    onChange={this.handChange}
                    value={this.state.course.title}
                />
                <input type="submit" value="Save" />
                {this.props.courses.map(course => (
                    <div key={course.title}>{course.title}</div>
                ))}
            </form>
        );
    }
}

CoursesPage.PropTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
