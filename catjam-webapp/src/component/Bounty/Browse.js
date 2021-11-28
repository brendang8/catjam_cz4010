import React, { Component, useEffect } from 'react';
import TaskApi from "../../Service/TaskApi"
import BountyComponent from './BountyComponent';

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    retrieveTasks = () => {
        TaskApi.fetchTasks().then(res => {
            this.setState({tasks: res.data})
        });
    }

    componentDidMount() {
        this.retrieveTasks();
    }
    render() {
        return (
            <div>
                {this.state.tasks.map(task => 
                    <BountyComponent 
                        button="Accept"
                        taskId={task.taskId}
                        title={task.title}
                        description={task.description}
                        category={task.category}
                        deliveryDays={task.deliveryDays}
                        price={task.price}
                        postedBy={task.postedBy}
                    />
                )}
            </div>
        )
    }
}

export default Browse