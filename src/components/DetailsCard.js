import {Card, Row, Tag, Col} from "antd";

const DetailsCard = ({ details }) => {
    let color;
    switch (details.status) {
        case "Completed":
            color = "green";
            break;
        case "On Going":
            color = "blue";
            break;
        case "Not Started":
            color = "orange";
            break;
        case "On Hold":
            color = "red";
            break;
        default:
            color =
                "gray";
    }
    return (
        <Card title={
            <Row>
                <Col span={20}>
                    <h2>{details.taskName}</h2>
                </Col>
                <Col span={4} style={{marginBottom:"auto", marginTop:"auto"}}>
                    <Tag color={color}>{details.status}</Tag>
                </Col>
            </Row>
        }>
            <p><b>Task Description :</b> {details.taskDescription}</p>
            <Row>
                <Col span={12}><p><b>Business Partner :</b> {details.bp}</p></Col>
                <Col span={12}><p><b>Client Name :</b> {details.clientName}</p></Col>
            </Row>
            <Row>
                <Col span={12}><p><b>Approved By :</b> {details.approvedBy}</p></Col>
                <Col span={12}><p><b>Assigned To :</b> {details.assignedTo}</p></Col>
            </Row>
            <Row>
                <Col span={12}><p><b>Dev Hours :</b> {details.devHours}</p></Col>
                <Col span={12}><p><b>QA Hours :</b> {details.qaHours}</p></Col> 
            </Row>
            <Row>
                <Col span={12}><p><b>Created Date :</b> {details.dateCreated}</p></Col>
                <Col span={12}><p><b>Is Billable:</b> {details.isBillable ? "Yes" : "No"}</p></Col>
            </Row>
            <Row>
                <Col span={12}><p><b>Due Date:</b> {details.dueDate}</p></Col>
                <Col span={12}><p><b>Release Date:</b> {details.releaseDate}</p></Col> 
            </Row>
        </Card>
    );
}

export default DetailsCard;