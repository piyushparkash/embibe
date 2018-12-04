import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { dashboardEndLoading, fetchDashboardStudents } from '../actions/dashboardActionCreators'
import '../styles/Home.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.renderStudentsList = this.renderStudentsList.bind(this)

        this.state = {
            searchName: '',
            sortByName: false,
            sortByMarks: false,
        }

        this.handleSearchNameChange = this.handleSearchNameChange.bind(this)
        this.toggleMarksSort = this.toggleMarksSort.bind(this)
        this.toggleNameSort = this.toggleNameSort.bind(this)

    }
    componentDidMount() {
        this.props.fetchDashboardStudents()
    }

    totalMarks(objMarks) {

        let total = 0;

        for (let mark in objMarks) {
            total += (objMarks[mark] || 0)
        }

        return total;
    }

    renderStudentsList(searchName = this.state.searchName, sortedByName = this.state.sortByName, sortedByNumber = this.state.sortByMarks) {
        let studentUI = [], modifiedStudentList = []

        //Need to Convert this to Array of objects
        // for (let key in this.props.studentList) {
        //     modifiedStudentList.push({
        //         ...this.props.studentList[key],
        //         id: key
        //     })
        // }

        // if (sortedByName) {
        //     modifiedStudentList.sort(function (a, b) {
        //         return a.name > b.name
        //     })
        // }
        // else if (sortedByNumber) {
        //     modifiedStudentList.sort((a, b) => {
        //         return this.totalMarks(a.marks) > this.totalMarks(b.marks)
        //     })
        // }

        // return (
        //     modifiedStudentList.map(function (elem) {
        //         return (
        //             <div className='studentCard' key={elem.id}>
        //             <h6>{elem.name}</h6>
        //             <p>Class: {elem.class}</p>
        //             <p>RollNo: {elem.rollNo}</p>
        //             <p>Total Marks: {this.totalMarks(elem.marks)}</p>
        //         </div>
        //         )
        //     }.bind(this))
        // )



        for (let key in this.props.studentList) {
            if (this.state.searchName !== '' && this.props.studentList[key].name.startsWith(this.state.searchName)) {
                studentUI.push(
                    <div className='studentCard' key={key}>
                        <h6>{this.props.studentList[key].name}</h6>
                        <p>Class: {this.props.studentList[key].class}</p>
                        <p>RollNo: {this.props.studentList[key].rollNo}</p>
                        <p>Total Marks: {this.totalMarks(this.props.studentList[key].marks)}</p>
                    </div>

                )
            } else if (this.state.searchName == '') {
                studentUI.push(
                    <div className='studentCard'>
                        <h6>{this.props.studentList[key].name}</h6>
                        <p>Class: {this.props.studentList[key].class}</p>
                        <p>RollNo: {this.props.studentList[key].rollNo}</p>
                        <p>Total Marks: {this.totalMarks(this.props.studentList[key].marks)}</p>
                    </div>

                )
            }
        }

        return studentUI
    }

    handleSearchNameChange(e) {
        this.setState({
            searchName: e.target.value
        })
    }

    toggleNameSort() {
        this.setState({
            sortByName: !this.state.sortByName,
        })
    }

    toggleMarksSort() {
        this.setState({
            sortByMarks: !this.state.sortByMarks
        })
    }

    render() {

        return (
            <>
                <header className='header'>
                    <input type='text' value={this.state.searchName} onChange={this.handleSearchNameChange} />
                    <button onClick={this.toggleNameSort}>Sort by Name</button>
                    <button onClick={this.toggleMarksSort}>Sort By Marks</button>
                </header>
                <main className='studentsContainer'>
                    {this.props.isLoading && <div className='loading'>Please wait while we load the list of students..</div>}
                    {!this.props.isLoading && this.renderStudentsList(this.state.searchName)}
                </main>
            </>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        isLoading: state.dashboard.isLoading,
        studentList: state.dashboard.studentList || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        dashboardEndLoading,
        fetchDashboardStudents
    }, dispatch)
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home)