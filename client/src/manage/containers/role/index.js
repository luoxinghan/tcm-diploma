import { Table, Input, Button, Popconfirm, Form, Modal } from 'antd';
import * as React from "react";
import {actionCreators} from "./store";
import {connect} from "react-redux";
import {LinkDelete} from "../../index/style";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="新增角色"
                    okText="保存"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="角色名">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入角色名!' }],
                            })(<Input />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} 必须填写。`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.columns = [
            {
                title: '角色ID',
                dataIndex: 'roleId',
                width: '10%',
                editable: false,
            },
            {
                title: '角色名称',
                className: 'role-name',
                dataIndex: 'roleName',
                editable: true
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.props.roles.length >= 1 ? (
                        <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.roleId)}>
                            <LinkDelete>
                                删除
                            </LinkDelete>
                        </Popconfirm>
                    ) : null,
            },
        ];
    }

    handleDelete = id => {
        const {deleteRole} = this.props;
        deleteRole(id);
    };

    handleSave = row => {
        const {updateRole} = this.props;
        updateRole(row);
    };

    /* 新增函数 */
    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        const { addRole } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const role = {
                roleName: values.name
            };
            addRole(role);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    componentDidMount() {
        const {getAllRoles} = this.props;
        getAllRoles();
    }

    render() {
        const { roles } = this.props;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button onClick={this.showModal} type="primary" style={{ marginBottom: 16 }}>
                    新增角色
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Table
                    components={components}
                    rowKey="roleId"
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={Array.from(roles)}
                    columns={columns}
                />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        roles: state.get("containers").get("role").get("roles"),
        count: state.get("containers").get("role").get("count")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRoles(){
            dispatch(actionCreators.getAllRoles())
        },
        updateRole(role){
            delete role.key;
            dispatch(actionCreators.updateRole(role))
        },
        deleteRole(id){
            dispatch(actionCreators.deleteRole(id))
        },
        addRole(role){
            dispatch(actionCreators.addRole(role))
        }
    }
};

const EditableFormTable = Form.create()(EditableTable);
export default connect(mapStateToProps, mapDispatchToProps)(EditableFormTable);