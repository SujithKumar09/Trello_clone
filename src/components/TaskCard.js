

const TaskCard=()=>{
    const [msg,setmsg]=useState({});

    

    return(
        <>
            <Row justify="space-around" align="middle">
                <Col span={4}>
                    <DemoBox value={100}>col-4</DemoBox>
                </Col>
            </Row> 
        </>
    );    
}

export default TaskCard;