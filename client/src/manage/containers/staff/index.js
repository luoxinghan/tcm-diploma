import React, {Component} from 'react';
import {Table, Input, Button, Popconfirm, Form, Modal, Upload, Icon, Divider, Select, DatePicker, Radio, Switch} from 'antd';
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {StaffExtraFormItem} from "./style";
import moment from "moment";
import {LinkDelete} from "../../index/style";

const { Option } = Select;
const { TextArea } = Input;

let rolesOption = [];


class StaffCreateModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isShow: false
        }
    }
    normFile = e => {
        let fileList = [...e.fileList];
        fileList = fileList.slice(-1);//截取fileList最后一个元素
        return fileList;
    };
    handleChange = choose => {
        this.setState({ isShow: choose});
    };
    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="录入职工"
                okText="保存"
                cancelText="取消"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Switch style={{marginBottom: 5}} checkedChildren="显示" unCheckedChildren="隐藏" onChange={this.handleChange} /> 额外非必要信息
                <Form layout="vertical">
                    <Form.Item label="姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入职工姓名!'}],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="所属角色" hasFeedback>
                        {getFieldDecorator('roleId', {
                            rules: [{ required: true, message: '请选择这个职工的角色!' }],
                        })(
                            <Select placeholder="员工角色">
                                {rolesOption.map((item)=>{
                                    return (<Option key={item.roleId} value={item.roleId}>{item.roleName}</Option>)
                                })}
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="性别">
                        {getFieldDecorator('sex', {
                            rules: [{ required: true, message: '请选择这个职工的性别!' }],
                        })(
                            <Radio.Group>
                                <Radio value={0}>女</Radio>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>保密</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                    <StaffExtraFormItem style={{display: this.state.isShow ? "block": "none"}}>
                        <Form.Item label="生日">
                            {getFieldDecorator('birthday')(<DatePicker/>)}
                        </Form.Item>
                        <Form.Item label="电话号码">
                            {getFieldDecorator('phoneNum')(<Input/>)}
                        </Form.Item>
                        <Form.Item label="住址">
                            {getFieldDecorator('address')(<Input/>)}
                        </Form.Item>
                        <Form.Item label="其他信息" extra="医生需填写俄语版的医生简介">
                            {getFieldDecorator('employeeDescription')(<TextArea rows={4}/>)}
                        </Form.Item>
                        <Form.Item label="上传职工照片" extra="职工照最好为1:1尺寸照片。">
                            {getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile
                            })(
                                <Upload onChange={this.normFile} name="logo" action="/api/upload/picture" listType="picture">
                                    <Button>
                                        <Icon type="上传" /> 点击上传
                                    </Button>
                                </Upload>,
                            )}
                        </Form.Item>
                    </StaffExtraFormItem>
                </Form>
            </Modal>
        );
    }
}


class StaffUpdateModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isUploadShow: false
        }
    }
    normFile = e => {
        let fileList = [...e.fileList];
        fileList = fileList.slice(-1);//截取fileList最后一个元素
        return fileList;
    };
    handleChange = choose => {
        this.setState({ isUploadShow: choose});
    };
    render() {
        const { visible, onCancel, onCreate, form, currentStaff } = this.props;
        const { getFieldDecorator } = form;
        let fl = [];
        if(currentStaff !== null) {
            if (typeof (currentStaff.avatarUrl) !== "undefined") {
                fl = [
                    {
                        uid: '-1',
                        name: currentStaff.avatarUrl,
                        status: 'done',
                        url: currentStaff.avatarUrl,
                        thumbUrl: currentStaff.avatarUrl,
                    }
                ];
            }
            return (
                <Modal
                    visible={visible}
                    title="录入职工"
                    okText="保存"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Switch style={{marginBottom: 5}} checkedChildren="显示" unCheckedChildren="隐藏" onChange={this.handleChange} /> 额外非必要信息
                    <Form layout="vertical">
                        <Form.Item label="姓名">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入职工姓名!'}],
                                initialValue: currentStaff.name
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="所属角色" hasFeedback>
                            {getFieldDecorator('roleId', {
                                rules: [{ required: true, message: '请选择这个职工的角色!' }],
                                initialValue: currentStaff.roleId
                            })(
                                <Select placeholder="员工角色">
                                    {rolesOption.map((item)=>{
                                        return (<Option key={item.roleId} value={item.roleId}>{item.roleName}</Option>)
                                    })}
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="性别">
                            {getFieldDecorator('sex',{
                                rules: [{ required: true, message: '请选择这个职工的性别!' }],
                                initialValue: currentStaff.sex
                            })(
                                <Radio.Group>
                                    <Radio value={0}>女</Radio>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>保密</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        <StaffExtraFormItem style={{display: this.state.isUploadShow ? "block": "none"}}>
                            <Form.Item label="生日">
                                {getFieldDecorator('birthday',{
                                    initialValue: typeof currentStaff.birthday === "undefined" ? null : moment( currentStaff.birthday, 'YYYY-MM-DD')
                                })(<DatePicker/>)}
                            </Form.Item>
                            <Form.Item label="电话号码">
                                {getFieldDecorator('phoneNum',{
                                    initialValue: typeof currentStaff.phoneNum === "undefined" ? null : currentStaff.phoneNum
                                })(<Input/>)}
                            </Form.Item>
                            <Form.Item label="住址">
                                {getFieldDecorator('address',{
                                    initialValue: typeof currentStaff.address === "undefined" ? null : currentStaff.address
                                })(<Input/>)}
                            </Form.Item>
                            <Form.Item label="其他信息" extra="医生需填写俄语版的医生简介">
                                {getFieldDecorator('employeeDescription',{
                                    initialValue: typeof currentStaff.employeeDescription === "undefined" ? null : currentStaff.employeeDescription
                                })(<TextArea rows={4}/>)}
                            </Form.Item>
                            <Form.Item label="上传职工照片" extra="职工照最好为1:1尺寸照片。">
                                {getFieldDecorator('upload', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                    initialValue: fl
                                })(
                                    <Upload onChange={this.normFile} name="logo" action="/api/upload/picture" listType="picture">
                                        <Button>
                                            <Icon type="上传" /> 点击上传
                                        </Button>
                                    </Upload>,
                                )}
                            </Form.Item>
                        </StaffExtraFormItem>
                    </Form>
                </Modal>
            );
        } else {
            return <Modal>加载中...</Modal>;
        }
    }
}
const CollectionCreateForm = Form.create({ name: 'form-create' })(StaffCreateModal);
const StaffUpdateForm = Form.create({ name: 'form-update' })(StaffUpdateModal);

class StaffManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            updateVisible: false,
            currentStaff: null
        };
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                width: '15%'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: '10%',
                render: (text, record) => {
                    let sex = "保密";
                    switch (record.sex) {
                        case 0: sex = "女"; break;
                        case 1: sex = "男"; break;
                        case 2: sex = "保密"; break;
                        default: sex = "未填写"; break;
                    }
                    return sex;
                }
            },
            {
                title: '职业',
                className: 'order',
                width: '20%',
                sorter: (a, b) => a.roleId - b.roleId,
                render: (text, record) => {
                    return record.roleName;
                }
            },
            {
                title: '电话号码',
                className: 'phoneNum',
                dataIndex: "phoneNum",
                width: '20%'
            },
            {
                title: '生日',
                className: 'birthday',
                dataIndex: "birthday",
                width: '15%'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.props.staffs.length >= 1 ? (
                        <span>
                            <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.employeeId)}>
                                <LinkDelete>删除</LinkDelete>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <Button size="small" type="primary" onClick={()=>this.handleShow(record)}>修改职工</Button>
                        </span>
                    ) : null,
            },
        ];
    }

    handleDelete = id => {
        this.props.deleteStaff(id);
    };

    handleShow = row => {
        this.showUpdateModal();
        this.setState({currentStaff: row});
    };

    /* 新增函数 */
    showModal = () => {
        this.setState({ visible: true, updateVisible: false});
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let url = null;
            if (typeof values.upload !== "undefined"){
                if((typeof values.upload[0].response) === "undefined"){
                    url = values.upload[0].url;
                } else {
                    url = values.upload[0].response.data.url;
                }
            }
            for ( let key in values) {
                if (values.hasOwnProperty(key)
                    && (values[key] == null || values[key] === undefined || values[key] === '')) {
                    delete values[key];
                }
            }
            if (values.hasOwnProperty("upload")){
                values.avatarUrl = url;
                delete values.upload;
            }
            if (values.hasOwnProperty("birthday")){
                values.birthday = values.birthday.format('YYYY-MM-DD');
            }
            this.props.addStaff(values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    showUpdateModal = () => {
        this.setState({ updateVisible: true, visible: false});
    };

    handleUpdateCancel = () => {
        this.setState({ updateVisible: false });
    };

    handleUpdateCreate = () => {
        const { form } = this.updateFormRef.props;
        const { currentStaff } = this.state;
        const { roles } =this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let url = null;
            if (typeof values.upload !== "undefined"){
                if((typeof values.upload[0].response) === "undefined"){
                    url = values.upload[0].url;
                } else {
                    url = values.upload[0].response.data.url;
                }
            }
            for ( let key in values) {
                if (values.hasOwnProperty(key)
                    && (values[key] == null || values[key] === undefined || values[key] === '')) {
                    delete values[key];
                }
            }
            if (values.hasOwnProperty("upload")){
                values.avatarUrl = url;
                delete values.upload;
            }
            if (values.hasOwnProperty("birthday")){
                values.birthday = values.birthday.format('YYYY-MM-DD');
            }
            roles.map((item) => {
                if (item.roleId === values.roleId) {
                    values.roleName = item.roleName;
                }
                return item.roleId;
            });
            values.employeeId = currentStaff.employeeId;
            this.props.updateStaff(values);
            form.resetFields();
            this.setState({ updateVisible: false });
        });
    };


    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    saveUploadFormRef = formRef => {
        this.updateFormRef = formRef;
    };

    componentDidMount() {
        this.props.getAllStaffs();
    }

    render() {
        const { staffs, roles } = this.props;
        rolesOption = roles;
        return (
            <div>
                <Button onClick={this.showModal} type="primary" style={{ marginBottom: 16 }}>
                    录入职工
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Table
                    rowKey="employeeId"
                    bordered
                    dataSource={Array.from(staffs)}
                    columns={this.columns}
                />
                <StaffUpdateForm
                    wrappedComponentRef={this.saveUploadFormRef}
                    visible={this.state.updateVisible}
                    onCancel={this.handleUpdateCancel}
                    onCreate={this.handleUpdateCreate}
                    currentStaff={this.state.currentStaff}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        staffs: state.get("containers").get("staff").get("staffs"),
        roles: state.get("containers").get("role").get("roles")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllStaffs(){
            dispatch(actionCreators.getAllStaffs());
        },
        addStaff(staff){
            dispatch(actionCreators.addStaff(staff));
        },
        deleteStaff(staffId){
            dispatch(actionCreators.deleteStaff(staffId));
        },
        updateStaff(staff){
            dispatch(actionCreators.updateStaff(staff));
        }
    }
};

const EditableFormTable = Form.create()(StaffManage);
export default connect(mapStateToProps, mapDispatchToProps)(EditableFormTable);