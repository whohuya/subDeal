/**
 * Created by zhaoyu on Mar 15, 2018.
 * @flow
 */
import React, { PureComponent } from "react";
import { connect } from "dva";

import {
	Badge,
	Card,
	Spin,
	Popconfirm,
	Table,
	Button,
	Icon,
	Dropdown,
	Menu,
	Input,
	Modal,
	message
} from "antd";
import PageHeaderLayout from "../../../layouts/PageHeaderLayout";

import UserForm from "./Form";
import TableCountText from "../../../components/TableCountText";
import Separator16 from "../../../components/Separator16";
import commonHelper from "../../../helpers/commonHelper";
import dateTimeHelper from "../../../helpers/dateTimeHelper";
import { explainValue } from "../../../constants/explainValue";
import ExplainCard from "../../../components/ExplainCard";

const Column = Table.Column;
@connect(state => ({
	loading: state["users/users"].loading,
	list: state["users/users"].data.list,
	pagination: state["users/users"].data.pagination
}))
export default class Users extends PureComponent {
	state = {
		user: null,
		sorter: {},
		filters: {},
		filterVisible: false,
		filtered: false,
		searchText: "",
		modalTitle: "",
		modalContent: null,
		modalFooter: null,
		submitButtonText: "",
		modalVisible: false,
		submitting: false
	};

	componentDidMount() {
		console.warn(this.props.state);
		this.fetchUsers();
	}

	fetchUsers = (payload: ?Object = null) => {
		const { dispatch, pagination } = this.props;
		const { sorter, filters, searchText } = this.state;
		console.warn("in fetchUsers");
		if (!payload) {
			dispatch({
				type: "users/users/fetch",
				payload: {
					search: searchText,
					pagination,
					sorter,
					...filters
				}
			});
		} else {
			dispatch({ type: "users/users/fetch", payload });
		}
		console.warn("fetchUsers Ends");
	};

	onInputChange = (e: Object) => {
		this.setState({ searchText: e.target.value });
	};

	onUserSearch = async () => {
		const { pagination } = this.props;
		const { sorter, filters, searchText } = this.state;
		this.fetchUsers({
			search: searchText,
			pagination: {
				...pagination,
				current: 1
			},
			sorter,
			...filters
		});
		// set data
		this.setState({
			filterVisible: false,
			filtered: !!searchText
		});
	};

	handleTableChange = async (
		pagination: Object,
		filters: Object,
		sorter: Object
	) => {
		const { searchText } = this.state;
		// const sorter = (sorter.order === 'ascend') ? `${sorter.field}` : `-${sorter.field}`
		console.warn("pagination: ", pagination);
		this.setState({
			sorter,
			filters
		});
		this.fetchUsers({
			search: searchText,
			pagination,
			sorter,
			...filters
		});
	};

	editUser = async (user: ?Object = null) => {
		const { submitting } = this.state;
		const [title, buttonText] =
			user === null ? ["创建用户", "创建"] : ["编辑用户", "编辑"];
		await this.setState({
			user:
				user === null
					? {
						id: null
					  }
					: user
		});
		await this.setState({
			modalTitle: title,
			modalContent: (
				<UserForm
					user={user}
					title={title}
					submitButtonText={buttonText}
					onSubmit={this.onSubmit}
					submitting={submitting}
				/>
			),
			submitButtonText: buttonText,
			modalVisible: true
		});
	};

	deleteUser = async (user: Object) => {
		const { dispatch } = this.props;
		dispatch({
			type: "users/users/remove",
			payload: { user },
			callback: this.deleteUserCallback
		});
	};

	deleteUserCallback = () => {
		message.success(`成功删除该用户。`);
		this.fetchUsers();
	};

	handleCancel = async () => {
		await this.setState({
			modalVisible: false,
			modalContent: null,
			user: null
		});
	};

	onSubmit = (values: Object) => {
		const { dispatch } = this.props;
		const { user } = this.state;
		console.warn(values);
		console.warn(user);
		try {
			this.setState({ submitting: true });
			const newUser = {
				...values
			};
			if (!!user && !!user["id"]) {
				console.warn(user);
				// update a user
				dispatch({
					type: "users/users/update",
					payload: { user: newUser },
					callback: () => this.fetchUsers()
				});
			} else {
				// add a new user
				dispatch({
					type: "users/users/add",
					payload: { user: newUser },
					callback: () => this.fetchUsers()
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			this.setState({ submitting: false });
		}
		// finish submit
		this.setState({
			modalVisible: false,
			modalContent: null,
			user: null
		});
	};

	render() {
		const { list, pagination, loading } = this.props;
		const {
			filtered,
			filterVisible,
			modalTitle,
			modalVisible,
			modalContent,
			modalFooter
		} = this.state;
		return (
			<PageHeaderLayout title="用户列表">
				<Card bordered={false}>
					{pagination && <TableCountText>{pagination.total}</TableCountText>}
					<Modal
						title={modalTitle}
						visible={modalVisible}
						onCancel={this.handleCancel}
						footer={modalFooter}
					>
						{modalContent || <Spin spinning={loading} />}
					</Modal>
					<Button type="primary" onClick={() => this.editUser()}>
						新建用户
					</Button>
					<Separator16 />
					<Table
						dataSource={list && list.map(commonHelper.parseObjectToObject)}
						loading={loading}
						rowKey="id"
						onChange={this.handleTableChange}
						pagination={pagination}
					>
						<Column title="姓名" sorter dataIndex="name" />
						<Column
							title="用户名"
							dataIndex="username"
							key="username"
							filterDropdown={
								<div className="table-input-search">
									<Input
										placeholder="名称"
										value={this.state.searchText}
										onChange={this.onInputChange}
										onPressEnter={this.onUserSearch}
									/>
									<Button type="primary" onClick={this.onUserSearch}>
										检索
									</Button>
								</div>
							}
							filterIcon={
								<Icon
									type="search"
									style={{ color: filtered ? "#108ee9" : "#aaa" }}
								/>
							}
							filterDropdownVisible={filterVisible}
							onFilterDropdownVisibleChange={visible => {
								this.setState({
									filterVisible: visible
								});
							}}
						/>

						<Column title="手机号码" sorter dataIndex="mobilePhoneNumber" />
						<Column
							title="锁定状态"
							sorter
							dataIndex="locked"
							render={(text, user) =>
								user.locked ? (
									<Badge status="error" text="已锁定" />
								) : (
									<Badge status="success" text="未锁定" />
								)
							}
						/>
						<Column
							title="创建日期"
							sorter
							key="createdAt"
							render={user => (
								<div>{dateTimeHelper.lllFormat(user.createdAt)}</div>
							)}
						/>
						<Column
							title="操作"
							render={(text, user) => (
								<div>
									<a onClick={() => this.editUser(user)}>编辑</a>
									<span className="ant-divider" />
									<Dropdown
										overlay={
											<Menu>
												<Menu.Item>
													<Popconfirm
														title="确定要删除吗？"
														onConfirm={() => this.deleteUser(user)}
													>
														<a href="#">删除</a>
													</Popconfirm>
												</Menu.Item>
											</Menu>
										}
									>
										<a className="ant-dropdown-link">
											更多 <Icon type="down" />
										</a>
									</Dropdown>
								</div>
							)}
						/>
					</Table>
				</Card>
				<ExplainCard explain={explainValue.users} />
			</PageHeaderLayout>
		);
	}
}
