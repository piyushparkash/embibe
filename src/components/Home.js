import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { dashboardEndLoading, fetchDashboardStudents } from '../actions/dashboardActionCreators'
import '../styles/Home.css'
import StudentCard from './StudentCard'

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
        this.renderStudentsList = this.renderStudentsList.bind(this)

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
        let modifiedList = this.props.studentList.concat()

        if (sortedByName) {
            modifiedList = modifiedList.sort(function (a, b) {
                return a.name.localeCompare(b.name)
            })
        } else if (sortedByNumber) {
            modifiedList = modifiedList.sort((a, b) => {
                return this.totalMarks(b.marks) - this.totalMarks(a.marks)
            })
        }
        

        if (searchName.trim() != '') {
            modifiedList = modifiedList.filter((e) => {
                return (e.name.toLowerCase().startsWith(searchName.toLowerCase()))
            })
        }

        return (
            modifiedList.map((student) => {
                return (<StudentCard name={student.name}
                    class={student.class}
                    rollNo={student.rollNo}
                    marks={student.marks}
                    id={student.id}
                />)
            })
        )
    }

    handleSearchNameChange(e) {
        this.setState({
            searchName: e.target.value
        })
    }

    toggleNameSort() {
        this.setState({
            sortByName: true,
            sortByMarks: false
        })
    }

    toggleMarksSort() {
        this.setState({
            sortByMarks: true,
            sortByName: false
        })
    }

    render() {

        return (
            <>
                <header className='header'>
                    <input type='text' placeholder='Search by Name..' value={this.state.searchName} onChange={this.handleSearchNameChange} />
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