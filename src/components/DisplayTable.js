

const DisplayTable=()=>{
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/alltasks')
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return(
        <table>
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Task Description</th>
                    <th>Status</th>
                    <th>Date Created</th>
                    <th>Business Partner</th>
                    <th>Dev Hours</th>
                    <th>QA Hours</th>
                    <th>Approved By</th>
                    <th>Billable or Not</th>
                    <th>Due Date</th>
                    <th>Assigned To</th>
                    <th>Release Date</th>
                </tr>
            </thead>
            <tbody>
                {(tasks.map(task=>{
                    <tr>
                    <td>task.taskName</td>
                    <td>task.taskDescription</td>
                    <td>task.status</td>
                    <td>task.dateCreated</td>
                    <td>task.bP</td>
                    <td>task.devHours</td>
                    <td>task.qaHours</td>
                    <td>task.approvedBy</td>
                    <td>task.isBillable</td>
                    <td>task.dueDate</td>
                    <td>task.assignedTo</td>
                    <td>task.releaseDate</td>
                    </tr>

                }))
                }
            </tbody>
        </table>
    );    
}

export default TaskCard;