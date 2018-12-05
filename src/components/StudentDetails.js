import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../styles/StudentDetails.css'
import ChartistGraph from 'react-chartist';


class StudentDetails extends Component {
    constructor(props) {
        super(props)


        //Get the id of the student which is to be shown
        this.studentID = parseInt(window.location.pathname.substr(1))
    }

    render = () => {


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
            <div className='studentDetailsContainer'>
                <div className='studentDetails'>
                    <h2>{currentStudent.name}</h2>
                    <p>{currentStudent.rollNo}</p>
                    <p>{currentStudent.class}</p>
                </div>
                <div>
                    <ChartistGraph data={data} options={options} type={type} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        studentList: state.dashboard.studentList
    };
}

export default connect(mapStateToProps)(StudentDetails);