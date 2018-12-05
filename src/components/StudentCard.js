import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class StudentCard extends Component {
    constructor(props) {
        super(props)

        //Redirect to show student details
        this.state = {
            showDetails: false
        }
    }

    cardClickHandle = () => {
        this.setState({
            showDetails: true
        })
    }

    totalMarks = (objMarks) => {

        let total = 0;

        for (let mark in objMarks) {
            total += (objMarks[mark] || 0)
        }

        return total;
    }

    render() {

        if (this.state.showDetails) {
            return <Redirect push to={`/${this.props.id}`} />
        }


        return (
            <div className='studentCard' key={this.props.key} onClick={this.cardClickHandle}>
                <h2>{this.props.name}</h2>
                <p>Class: {this.props.class}</p>
                <p>RollNo: {this.props.rollNo}</p>
                <p>Total Marks: {this.totalMarks(this.props.marks)}</p>
            </div>
        )
    }
}

export default StudentCard