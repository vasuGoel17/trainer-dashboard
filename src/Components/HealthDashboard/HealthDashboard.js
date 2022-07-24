import React, { Component } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";
import { HealthDetails } from '../../constant/details';
import ProgressBar from '../ProgressBar/ProgressBar'
import ReactPieChart from '../ReactPieChart/ReactPieChart';
import './HealthDashBoard.css'



export class HealthDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HealthData: [],
        };
    }

    componentDidMount = () => {
        console.log(this.props);
        this.setState({ HealthData: HealthDetails })
    }


    handleMouseOut = () => {
        let wholeData = JSON.parse(JSON.stringify(this.state.HealthData))
        wholeData.forEach(wd => {
            wd.showToolTip = false
        });
        this.setState({ HealthData: wholeData })
    }
    handleMouseOver = (id) => {
        let wholeData = JSON.parse(JSON.stringify(this.state.HealthData))
        wholeData.forEach(wd => {
            if (wd.id == id) {
                wd.showToolTip = true
            } else {
                wd.showToolTip = false
            }
        });
        this.setState({ HealthData: wholeData })
    }

    workoutPage = (userId) => {
        this.props.history.push(`/${userId}/workout`)
    }

    nutritionPage = (userId) => {
        this.props.history.push(`/${userId}/nutrition`)
    }

    handleStepTarget = (id, type, funType) => {
        let wholeData = JSON.parse(JSON.stringify(this.state.HealthData))
        let item = wholeData.filter((wd) => wd.id == id)
        if (funType == "stepTarget") {
            if (type == "inc") {
                item[0].stepsTarget = (parseInt(item[0].stepsTarget) + 500);
                this.setState({ HealthData: wholeData })
            } else {
                item[0].stepsTarget = (parseInt(item[0].stepsTarget) - 500);
                this.setState({ HealthData: wholeData })
            }
        } else {
            if (type == "inc") {
                item[0].calorieTarget = (parseInt(item[0].stepsTarget) + 100);
                this.setState({ HealthData: wholeData })
            } else {
                item[0].calorieTarget = (parseInt(item[0].stepsTarget) - 100);
                this.setState({ HealthData: wholeData })
            }
        }


    }
    render() {
        let percentage = 60
        const { HealthData } = this.state;
        return (
            <div className='container' >
                <div className="health-detail-cntnr">
                    <div className='heading'>
                        <h4 className='heading-h4-data'><i class="fas fa-walking"></i> Steps</h4>
                        <h4 className='heading-h4-data'><i class="fas fa-dumbbell"></i> Workout</h4>
                        <h4 className='heading-h4-data'><i class="fas fa-concierge-bell"></i> Nutrition</h4>
                    </div>

                    {HealthData.length > 0 && HealthData.map((item) => (
                        <div className="user-detail" key={item.userId}>


                            <div className='image'>
                                <img src={item.img} alt="profile" />
                            </div>
                            <div className='name-email'>
                                <span>{item.name}</span><br />
                                <small>{item.email}</small>
                            </div>
                            <div className='progress-bar'>
                                <ProgressBar>
                                    <CircularProgressbar value={percentage} text={`${item.stepsWalked} `} />
                                    <p className='progress-bar-text'>walked</p>
                                </ProgressBar>
                            </div>
                            <div className='progress-bar-btn'>
                                <button className='progress-bar-plus-btn' onClick={() => this.handleStepTarget(item.id, "inc", "stepTarget")}>
                                    +
                                </button><br />
                                <span className='progress-bar-btn-text-step-target'>{item.stepsTarget}</span><br />
                                <span className='progress-bar-btn-text'>target</span><br />
                                {/* <input className="input-number" value={this.state.number} /> */}
                                <button className='progress-bar-minus-btn' onClick={() => { this.handleStepTarget(item.id, "dec", "stepTarget") }}>
                                    -
                                </button>
                            </div>
                            <div className='time-duration'>
                                <span className='performed-date'><i class="fas fa-user-check"></i> {item.performedDate}</span><br /><br />
                                <span className='scheduled-date'><i class="fas fa-calendar-alt"></i> {item.scheduledDate}</span>
                            </div>
                            {item.feedback == "true" ?
                                <div className="time-duration-check-cntnr">
                                    <button className="time-duration-check-red-btn"><i class="fas fa-exclamation"></i></button>
                                </div> :
                                <div className="time-duration-check-cntnr">
                                    <button className="time-duration-check-btn" onClick={() => { this.workoutPage(item.userId) }}><i class="fas fa-greater-than"></i></button>
                                </div>

                            }

                            <div className='pie-chart' onMouseOver={() => { this.handleMouseOver(item.id) }}
                                onMouseOut={this.handleMouseOut}>
                                <ReactPieChart />
                                <p className='pie-chart-text'>{item.calorieIntake} <br />walked</p>
                                {item.showToolTip &&
                                    <div className='tool-tip-cntnr'>
                                        <div className='protein-cntnr'>
                                            <div className='protein'>
                                                <label>PROTEIN</label>
                                                <span>70g</span>
                                            </div>
                                            <div className='tool-tip-border' >
                                                <div className='tool-tip-protein'>
                                                </div>
                                                <p>45g</p>
                                            </div>
                                        </div>
                                        <div className='fats-cntnr'>
                                            <div className='fats'>
                                                <label>FATS</label>
                                                <span> 70g</span>
                                            </div>
                                            <div className='tool-tip-border' >
                                                <div className='tool-tip-fats'>
                                                </div>
                                                <p>30g</p>
                                            </div>
                                        </div>
                                        <div className='carbs-cntnr'>
                                            <div className='carbs'>
                                                <label>CARBS</label>
                                                <span> 70g</span>
                                            </div>
                                            <div className='tool-tip-border' >
                                                <div className='tool-tip-carbs'>
                                                </div>
                                                <p>50g</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='progress-bar-btn'>
                                <button className='progress-bar-plus-btn' onClick={() => { this.handleStepTarget(item.id, "inc", "calorieTarget") }}>
                                    +
                                </button><br />
                                <span className='progress-bar-btn-text-step-target'>{item.calorieTarget}</span><br />
                                <span className='progress-bar-btn-text'>target</span><br />
                                {/* <input className="inputne" value={this.state.number} /> */}
                                <button className='progress-bar-minus-btn' onClick={() => { this.handleStepTarget(item.id, "dec", "calorieTarget") }}>
                                    -
                                </button>
                            </div>
                            {/* <div>
                                <button onClick={this.handleIncrement}>
                                    +
                                </button>
                                <h4>{item.calorieTarget}</h4>
                                <button onClick={this.handleDecrement}>
                                    -
                                </button>
                            </div> */}
                            {/* <div>
                                <button className="time-increase"><i class="fas fa-greater-than"></i></button>
                            </div> */}
                            <div className="time-duration-check-cntnr">
                                <button className="time-duration-check-btn" onClick={() => { this.nutritionPage(item.userId) }}><i class="fas fa-greater-than"></i></button>
                            </div>
                            <div className='notification-cntnr'>
                                <button className='notification-btn'><i class="fas fa-bell"></i></button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        )
    }
}

export default HealthDashboard