/**
 * Created by zhaoyu on Jan 10, 2018.
 */
import React, { PureComponent } from "react";
import { connect } from "dva";

import {
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
	message,
	Badge
} from "antd";
import PageHeaderLayout from "../../../layouts/PageHeaderLayout";
import ONUForm from "./Form";
import ExplainCard from "../../../components/ExplainCard";
import TableCountText from "../../../components/TableCountText";
import Separator16 from "../../../components/Separator16";
import commonHelper from "../../../helpers/commonHelper";
import dateTimeHelper from "../../../helpers/dateTimeHelper";
import { explainValue } from "../../../constants/explainValue";

const Column = Table.Column;
@connect(state => ({
	loading: state["basic/ONU"].loading,
	list: state["basic/ONU"].data.list,
	pagination: state["basic/ONU"].data.pagination
}))
export default class ONU extends PureComponent {
	state = {
		ONU: null,
		sorter: null,
		filters: null,
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
		console.warn("props", this.props);
		this.fetchONU();
	}

	fetchONU = (payload = null) => {
		const { dispatch, pagination } = this.props;
		const { sorter, filters, searchText } = this.state;
		console.warn("in fetchONU ");
		if (!payload) {
			dispatch({
				type: "basic/ONU/fetch",
				payload: {
					includes: ["creator"],
					search: searchText,
					pagination,
					sorter,
					...filters
				}
			});
		} else {
			dispatch({ type: "basic/ONU/fetch", payload });
		}
		console.warn("fetchONU Ends");
	};

	onInputChange = e => {
		this.setState({ searchText: e.target.value });
	};

	onONUSearch = async () => {
		const { pagination } = this.props;
		const { sorter, filters, searchText } = this.state;
		this.fetchONU({
			includes: ["creator"],
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

	onONUReset = () => {
		this.fetchONU();
	};

	handleTableChange = async (pagination, filters, sorter) => {
		const { searchText } = this.state;
		// const sorter = (sorter.order === 'ascend') ? `${sorter.field}` : `-${sorter.field}`
		console.warn("pagination: ", pagination);
		this.setState({
			sorter,
			filters
		});
		this.fetchONU({
			includes: ["creator"],
			search: searchText,
			pagination,
			sorter,
			...filters
		});
	};

	editONU = async (ONU: ?Object = null) => {
		const { submitting } = this.state;
		console.log(ONU);
		const [title, buttonText] =
			ONU === null ? ["登记商品", "登记"] : ["编辑商品", "编辑"];
		await this.setState({
			ONU:
				ONU === null
					? {
						id: null
					  }
					: ONU
		});
		await this.setState({
			modalTitle: title,
			modalContent: (
				<ONUForm
					ONU={ONU}
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

	deleteONU = async ONU => {
		const { dispatch } = this.props;
		dispatch({
			type: "basic/ONU/remove",
			payload: { ONU },
			callback: this.deleteONUCallback
		});
	};

	deleteONUCallback = () => {
		message.success(`成功删除该商品。`);
		this.fetchONU();
	};

	handleCancel = async () => {
		await this.setState({
			modalVisible: false,
			modalContent: null,
			ONU: null
		});
	};

	onSubmit = values => {
		const { dispatch } = this.props;
		const { ONU } = this.state;
		console.log(ONU);
		try {
			this.setState({ submitting: true });

			if (!!ONU && !!ONU["id"]) {
				console.warn(ONU);
				// update a ONU
				dispatch({
					type: "basic/ONU/update",
					payload: { ONU: values },
					callback: () => this.fetchONU()
				});
			} else {
				// add a new ONU
				dispatch({
					type: "basic/ONU/add",
					payload: { ONU: values },
					callback: () => this.fetchONU()
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
			ONU: null
		});
	};

	rowRender = record => (
		<div>
			<p style={{ margin: 0 }}>描述：{record.description}</p>
		</div>
	);

	onDetail = ONU => {};

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
			<PageHeaderLayout title="商品列表">
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
					<Button type="primary" onClick={() => this.editONU()}>
						登记商品
					</Button>
					<Separator16 />
					<Table
						dataSource={list && list.map(commonHelper.parseObjectToObject)}
						loading={loading}
						rowKey="id"
						onChange={this.handleTableChange}
						pagination={pagination}
						expandedRowRender={record => this.rowRender(record)}
					>
						<Column
							title="sn"
							dataIndex="sn"
							key="sn"
							filterDropdown={
								<div className="table-input-search">
									<Input
										placeholder="sn"
										value={this.state.searchText}
										onChange={this.onInputChange}
										onPressEnter={this.onONUSearch}
									/>
									<Button type="primary" onClick={this.onONUSearch}>
										检索
									</Button>
									<Button style={{ marginLeft: 8 }} onClick={this.onONUReset}>
										重置
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
						<Column title="描述" dataIndex="description" />
						<Column
							title="位置"
							dataIndex="room"
							render={(text, ONU) => (
								<div>
									{ONU.building}-{ONU.room}
								</div>
							)}
						/>
						<Column
							title="登记人"
							dataIndex="creator"
							render={(text, ONU) => (
								<div>
									{(ONU.creator &&
										commonHelper.parseObjectToObject(ONU.creator).name) ||
										"未知用户"}
								</div>
							)}
						/>
						<Column
							title="登记时间"
							sorter
							dataIndex="createdAt"
							render={(text, ONU) => (
								<div>{dateTimeHelper.lllFormat(ONU.createdAt)}</div>
							)}
						/>
						<Column
							title="修改时间"
							sorter
							dataIndex="updatedAt"
							render={(text, ONU) => (
								<div>{dateTimeHelper.lllFormat(ONU.updatedAt)}</div>
							)}
						/>
						<Column
							title="操作"
							render={(text, ONU) => (
								<div>
									<a onClick={() => this.onDetail(ONU)}>详情</a>
									<span className="ant-divider" />
									<Dropdown
										overlay={
											<Menu>
												<Menu.Item onClick={() => this.editONU(ONU)}>
													<a>编辑</a>
												</Menu.Item>
												<Menu.Item>
													<Popconfirm
														title="确定要删除吗？"
														onConfirm={() => this.deleteONU(ONU)}
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
				<ExplainCard explain={explainValue.ONU} />
			</PageHeaderLayout>
		);
	}
}
