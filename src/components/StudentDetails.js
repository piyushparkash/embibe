import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../styles/StudentDetails.css'
import ChartistGraph from 'react-chartist';


class StudentDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            goBack: false
        }


        //Get the id of the student which is to be shown
        this.studentID = parseInt(window.location.pathname.substr(1))
    }

    handleGoBackButton = () => {
        this.setState({
            goBack: true
        })
    }

    render = () => {

        if (this.state.goBack) {
            return <Redirect push to='/home' />
        }


        if (!this.props.studentList) {
            return <Redirect push to='/home' />
        }
        let currentStudent = this.props.studentList[this.studentID]

        var data = {
            labels: ["S1", "S2", "S3", "S4"],
            series: [
                Object.values(currentStudent.marks)
            ]
        };

        var options = {
            high: 150,
            low: 0,
        };

        var type = 'Bar'

        return (
            <>
                <div className='studentDetailsContainer'>
                    <div className='studentDetails'>
                        <h2>Name: {currentStudent.name}</h2>
                        <p>Roll No: {currentStudent.rollNo}</p>
                        <p>Class: {currentStudent.class}</p>

                        <div>
                            <ChartistGraph data={data} options={options} type={type} />
                        </div>
                    </div>
                </div>
                <div className='actionButtons'>
                    <button onClick={this.handleGoBackButton}>Go Back</button>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        studentList: state.dashboard.ULStudentList
    };
}

export default connect(mapStateToProps)(StudentDetails);