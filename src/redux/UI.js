import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Modal, Comment, Button, Input, Divider, Row, Col } from 'antd';
import { getListPost, addListPost, deleteListPost } from "./listUser";
// import {setCurrentUser} from'./listUser';
import LazyLoad from "react-lazyload";

const UserList = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => {
    return state.tasks;
  });
  useEffect(() => {

    dispatch(getListPost());
  }, [dispatch]);

  const data = {
    title: value,
  }
  const handleAdd = () => {

    alert(`Bạn đã thêm ${data.title} thành công`);
    dispatch(addListPost(data));
  }
  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete',
      onOk: () => {
        dispatch(deleteListPost(id))
      }
    })

  }




  return (
    <>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add new todo"
      />
      <Button type="dashed" onClick={handleAdd}>Add</Button>
      <Row>
        {todos.currentUser.map((todo) => (
          <>

            <Col className="gutter-row" span={12}key={todo.id} style={{padding: 10}}>
              <div >
                <span style={{ paddingRight: 30 }}>{todo.title}</span>
                <Button style={{ float: 'right' }} type="primary" onClick={() => handleDelete(todo.id)}>{Button.onCLick==true?"Loadding":"Delete"}</Button>
              </div>
              <Divider />
            </Col>
          </>
        ))}
      </Row>
      
    </>
  );
};

export default UserList;
