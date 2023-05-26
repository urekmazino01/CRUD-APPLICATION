import React from 'react';
import './App.css';
import {
  QuestionCircleOutlined,
  SearchOutlined,
  HomeOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useForm } from 'sunflower-antd';
import qs from 'qs';
import { Button,  Form, Input , Layout,theme,Menu, message,Popconfirm } from "antd";
import { useEffect } from 'react';
import { Table} from 'antd';
import {
  Route,
  useLocation,
  useNavigate,
  Routes,
  useSearchParams

} from "react-router-dom";
import axios from 'axios';


  

const User=()=>{

  const [userId, setUserId] = useState('');
  const [userExists, setUserExists] = useState(false);
  

  const [form] = Form.useForm();

  



  
  const [searchParams,setSearchParams] = useSearchParams();
  const id=searchParams.get('id');
  
  // console.log("typeof id",typeof id);


  const getData = async(id)=>{


    // const response = await fetch('http://localhost:8080/demo',{
    //     method:'POST',
    //     body:JSON.stringify(values),
    //     headers:{
    //       'Content-Type':'application/json'
    //     }
    //   })
    //   const data = await response.json();



    const response = await axios.get(`http://localhost:8080/demo/${id}`);
    //PREV
    const data= await response;
    console.log(data);

    //console.log("typeof doc_id",typeof data.doc[0]._id);

    // const filteredUser = data.doc.filter((user) => data.doc._id ===id)[0];
    //setForm(filteredUser);

    console.log("EDIT GET DATA ",data.data);
    form.setFieldsValue(data.data);
    // setUserData(data.data);
    // setForm(userData);

  }

  useEffect(()=>{
    

    if(id !==null){
      
      setUserExists(true);
      getData(id);
    }

  },[])



  const handleSubmit = async (values) => {

    if(userExists){
      console.log("HELLO");
      //alert('USER UPDATED SUCCESSFULLY');
      const response = await fetch(`http://localhost:8080/demo/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data= await response;
      console.log("Put Data: ",data);
      console.log("updated succesfully");
      message.success('User updated succesfully');
      //alert('User updated');
      // setTimeout(()=>{
      //   console.log("User Updated Succesfully");
      //   message.success('User Updated Succesfully');
      // },1000)
      setUserExists(false);
    }else{
      const response = await fetch('http://localhost:8080/demo',{
        method:'POST',
        body:JSON.stringify(values),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const data = await response.json();
      console.log(data);
      setTimeout(()=>{
        message.success('User Added Succesfully');
      },2000)
      //setUserExists(!userExists);

    }
  };

  
  

  // const handleSubmit = async (e)=>{
  //   e.preventDefault();
  //   //setSelectedRowData(form);
  //   const response = await fetch('http://localhost:8080/demo',{
  //     method:'POST',
  //     body:JSON.stringify(form),
  //     headers:{
  //       'Content-Type':'application/json'
  //     }
  //   })
  //   const data = await response.json();
  //   console.log(data);
  //   //setForm({});
  //   setTimeout(()=>{
  //     message.success('User Added Succesfully');
  //   },2000)
    
  // }

  // useEffect(() => {
  //   if (form) {
  //     formu.setFieldsValue(recorddata);
  //   }
  // }, [form, formu]);
   
  
  //CG
  // useEffect(() => {
  //   setForm(selectedRowData);
  // }, [selectedRowData]);

  // const handleForm = (e) => {
  //   console.log(e.target.value, e.target.name);
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value
  //   });
  // };

  return (
    

    <Form
      name="basic"
      labelCol={{
        span: 8
      }}
      wrapperCol={{
        span: 16
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true
      }}
      autoComplete="off"

      form={form}

      onFinish={handleSubmit}
      
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!"
          }
        ]}
      >
        <Input type="text" name="username"  />
        {/* onChange={handleForm} */}
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
      >
        <Input.Password type="text" name="password" />
      </Form.Item>

      <Form.Item
        label="Age"
        name="age"
        rules={[
          {
            required: true,
            message: "Please input your age!"
          }
        ]}
      >
        <Input type="text" name="age" />
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
        rules={[
          {
            required: true,
            message: "Please input your city!"
          }
        ]}
      >
        <Input type="text" name="city" />
      </Form.Item>

      

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16
        }}
      >
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
const Userlist = ()=>{
  const [count,setCount] =useState(0);
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);
  const [age,setAge] = useState("");
  const [city,setCity] = useState("");
  const [username,setUsername] = useState("");
  const [object,setObject] = useState({});

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const getData=(params)=>{
    const queryParameters = new URLSearchParams(params)
    // const type = queryParameters.get("type")
    const name = queryParameters.get("username")
  }

  // useEffect(()=>{
  //   getData(record._id);

  // },[]);

  

  let navigate= useNavigate();
  const selectedKey = useLocation().pathname;

  const highlight = ()=>{
    if(selectedKey === '/'){
      return ['1']
    }else if(selectedKey === '/user'){
      return ['2']
    }else{
      return ['3']
    }
  }

  // const getRandomuserParams = (params) => ({
  //   // results: params.pagination?.pageSize,
  //   // page: params.pagination?.current,
  //   // ...params,
  //   page: params.pagination?.current
  // });

  const getUsers = async()=>{
    setLoading(true);
    console.log(tableParams);

    const response = await fetch(`http://localhost:8080/demo?page=${tableParams.pagination?.current}`,{
        method:'GET',
    })
    const data= await response.json();
    console.log(data);
    //console.log(response.page)  
    setUsers(data.data1);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: 200,
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    });
    setCount(data.count);
    setLoading(false);
  }
  

  useEffect(()=>{
    getUsers();
  },[JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination);
    console.log(filters);
    console.log(sorter);
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setUsers([]);
    }
  };

  const handleDelete = async (record) => {

    let result = await fetch(`http://localhost:8080/demo/${record._id}`,{
      method:'DELETE'

    })
    result = await result.json();
    if(result){
      //message.success("User deleted");
      // alert("user deleted ");
      message.success('User deleted succesfully');
      getUsers();
    }
  };

  const handleChange =async()=>{
    let result= await fetch(`http://localhost:8080/demo?username=${username}&city=${city}&age=${age}`,{
      method:'GET'
    })

    let data =await result.json();
    console.log("city data ",data);
    setUsers(data.data1);

    

  }

  useEffect(()=>{
    handleChange();

  },[username,age,city])


 
  const cancel = (e) => {
    console.log(e);
    message.error('Clicked on No');
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: "username",
      //render: (text) => <p>{text}</p>,
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
        return <Input autoFocus
         placeholder="Type text here"
         value={selectedKeys[0]}
         onChange={(e)=>{
          // setObject(
          //   {
          //         ...object,
          //         [e.target.name]: e.target.value
          //       }
          // )
          setUsername(e.target.value);
          //  setSelectedKeys(e.target.value?[e.target.value]:[])
         }}
        //  onPressEnter={()=>{
        //   // handleChange(selectedKeys)
        //   //  confirm();
        //  }} 
        //  onBlur={()=>{
        //    confirm();
        //  }}
        ></Input>;
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      // onFilter:(value,record)=>{
      //   return record.username.toLowerCase().includes(value.toLowerCase())
      // },
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
        return <Input autoFocus
         placeholder="Type text here"
         value={selectedKeys[0]}
         onChange={(e)=>{
          // setObject(
          //   {
          //         ...object,
          //         [e.target.name]: e.target.value
          //       }
          // )
          setAge(e.target.value);


          //  setSelectedKeys(e.target.value?[e.target.value]:[])
         }}
        //  onPressEnter={()=>{
        //   //  confirm();
        //   // handleChange(selectedKeys)
        //   //setCity(e.target.value);
        //  }} 
        //  onBlur={()=>{
        //    confirm();
        //  }}
        ></Input>;
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      // onFilter:(value,record)=>{
      //   return record.age.toLowerCase().includes(value.toLowerCase())
      // },
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
        return <Input autoFocus
         placeholder="Type text here"
         value={selectedKeys[0]}
         onChange={(e)=>{

          setCity(e.target.value);
          // setObject(
          //   {
          //         ...object,
          //         [e.target.name]: e.target.value
          //       }
          // )
          //  setSelectedKeys(e.target.value?[e.target.value]:[])
          //handleChange(e.target.value)
         }}
        //  onPressEnter={()=>{
        //   // confirm();
        //   // handleChange(age);

        //   }} 
        //   onBlur={()=>{
        //     confirm();
        //   }}
        ></Input>;
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (val,record) => {
        console.log("record value:",record);
        return (
          <>
            <Button type='link' onClick={()=>{
              navigate(`/user?id=${record._id}&record=${record}`);
              // <User recorddata={record} />
              // getData(`/user?id=${record._id}`)
              // handleEdit(record)
              
            }}>Edit</Button>

            

            {/* <Button type="link">Delete</Button> */}
            {/* onClick={()=>{handleDelete(record)}} */}
            
            <Popconfirm
              title="Delete the Task"
              description="Are you sure to delete this User?"
              onConfirm={()=>{handleDelete(record)}}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">Delete</Button>

            </Popconfirm>
           
          </>
        )
      }
      // onClick: ()=>{navigate('/user')},
    },
  ]

  

  
  return (
    <div>
        <h4>TOTAL USERS: {count}</h4>

      <div>
       <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/userlist" element={<Userlist />} />
        </Routes>
        <Table columns={columns} dataSource={users} loading={loading} 
          pagination={tableParams.pagination}
          onChange={handleTableChange}  />

            
        
      </div>
    </div>
  )
  
}
const App = () => {

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Header, Sider, Content } = Layout;

  let navigate= useNavigate();
  const selectedKey = useLocation().pathname;

  const highlight = ()=>{
    if(selectedKey === '/'){
      return ['1']
    }else if(selectedKey === '/user'){
      return ['2']
    }else{
      return ['3']
    }
  }
  


  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={highlight()}
          style={{height:'100%',borderRight:0}}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Home',
              onClick: ()=>{navigate('/')}
            },
            {
              key: '2',
              icon: <UserAddOutlined />,
              label: 'User',
              onClick: ()=>{navigate('/user')}
            },
            {
              key: '3',
              icon: <UnorderedListOutlined />,
              label: 'User List',
              onClick: ()=>{navigate('/userlist')}
              
            },
          ]}
        />
        
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >

          <Routes>
            <Route path="/user" element={<User selectedRowData={selectedRowData} setSelectedRowData={setSelectedRowData} />} />
            <Route path="/userlist" element={<Userlist selectedRowData={selectedRowData} setSelectedRowData={setSelectedRowData} />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;