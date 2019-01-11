/**
 * Created by zhaoyu on Mar 15, 2018.
 * todo: unfinished!!
 * @flow
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva'

import {
  Badge,
  Card,
  Spin,
  Popconfirm,
  Table,
  Tabs,
  Button,
  Icon,
  Dropdown,
  Menu,
  Input,
  Modal,
  message
} from 'antd'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout'

import RoleForm from './Form'
import TableCountText from '../../../components/TableCountText'
import Separator16 from '../../../components/Separator16'
import commonHelper from '../../../helpers/commonHelper'
import dateTimeHelper from '../../../helpers/dateTimeHelper'

const Column = Table.Column
@connect(state => ({
  loading: state['users/roles'].loading,
  list: state['users/roles'].data.list,
  pagination: state['users/roles'].data.pagination
}))
export default class Roles extends PureComponent {
  state = {
    role: null,
    sorter: {},
    filters: {},
    filterVisible: false,
    filtered: false,
    searchText: '',
    modalTitle: '',
    modalContent: null,
    modalFooter: null,
    submitButtonText: '',
    modalVisible: false,
    submitting: false
  }

  componentDidMount () {
    console.warn(this.props.state)
    this.fetchRoles()
  }

  fetchRoles = (payload: ?Object = null) => {
    const {dispatch, pagination} = this.props
    const {sorter, filters, searchText} = this.state
    console.warn('in fetchRoles')
    if (!payload) {
      dispatch({
        type: 'users/roles/fetch',
        payload: {
          search: searchText,
          pagination,
          sorter,
          ...filters
        }
      })
    } else {
      dispatch({type: 'users/roles/fetch', payload})
    }
    console.warn('fetchRoles Ends')
  }

  onInputChange = (e: Object) => {
    this.setState({searchText: e.target.value})
  }

  onRoleSearch = async () => {
    const {pagination} = this.props
    const {sorter, filters, searchText} = this.state
    this.fetchRoles({
      search: searchText,
      pagination: {
        ...pagination,
        current: 1
      },
      sorter,
      ...filters
    })
    // set data
    this.setState({
      filterVisible: false,
      filtered: !!searchText
    })
  }

  handleTableChange = async (pagination: Object, filters: Object, sorter: Object) => {
    const {searchText} = this.state
    // const sorter = (sorter.order === 'ascend') ? `${sorter.field}` : `-${sorter.field}`
    console.warn('pagination: ', pagination)
    this.setState({
      sorter,
      filters
    })
    this.fetchRoles({
      search: searchText,
      pagination,
      sorter,
      ...filters
    })
  }

  editRole = async (role: ?Object = null) => {
    const {submitting} = this.state
    const [title, buttonText] = (role === null) ? [
      '创建角色', '创建'
    ] : [
      '编辑角色', '编辑'
    ]
    await this.setState({
      role: (role === null) ? {
        id: null
      } : role
    })
    await this.setState({
      modalTitle: title,
      modalContent: <RoleForm
        role={role}
        title={title}
        submitButtonText={buttonText}
        onSubmit={this.onSubmit}
        submitting={submitting} />,
      submitButtonText: buttonText,
      modalVisible: true
    })
  }

  deleteRole = async (role: Object) => {
    const {dispatch} = this.props
    dispatch({
      type: 'users/roles/remove',
      payload: {role},
      callback: this.deleteRoleCallback
    })
  }

  deleteRoleCallback = () => {
    message.success(`成功删除该角色。`)
    this.fetchRoles()
  }

  handleCancel = async () => {
    await this.setState({
      modalVisible: false,
      modalContent: null,
      role: null
    })
  }

  onSubmit = (values: Object) => {
    const {dispatch} = this.props
    const {role} = this.state
    console.warn(values)
    console.warn(role)
    try {
      this.setState({submitting: true})
      const newRole = {
        ...values
      }
      if (!!role && !!role['id']) {
        console.warn(role)
        // update a role
        dispatch({
          type: 'users/roles/update',
          payload: {role: newRole},
          callback: () => this.fetchRoles()
        })
      } else {
        // add a new role
        dispatch({
          type: 'users/roles/add',
          payload: {role: newRole},
          callback: () => this.fetchRoles()
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({submitting: false})
    }
    // finish submit
    this.setState({
      modalVisible: false,
      modalContent: null,
      role: null
    })
  }

  render () {
    const {list, pagination, loading} = this.props
    const {filtered, filterVisible, modalTitle, modalVisible, modalContent, modalFooter} = this.state
    return (
      <PageHeaderLayout title='角色列表'>
        <Card bordered={false}>
          {pagination && <TableCountText>{pagination.total}</TableCountText>}
          <Modal title={modalTitle}
            visible={modalVisible}
            onCancel={this.handleCancel}
            footer={modalFooter}>
            {modalContent || <Spin spinning={loading} />}
          </Modal>
          <Separator16 />
          <Table dataSource={list && list.map(commonHelper.parseObjectToObject)}
            loading={loading}
            rowKey='id'
            onChange={this.handleTableChange}
            pagination={pagination}
          >
            <Column
              title='角色名'
              dataIndex='name'
              key='name'
              filterDropdown={<div className='table-input-search'>
                <Input
                  placeholder='名称'
                  value={this.state.searchText}
                  onChange={this.onInputChange}
                  onPressEnter={this.onRoleSearch}
                />
                <Button type='primary' onClick={this.onRoleSearch}>检索</Button>
              </div>}
              filterIcon={<Icon type='search'
                style={{color: filtered ? '#108ee9' : '#aaa'}} />}
              filterDropdownVisible={filterVisible}
              onFilterDropdownVisibleChange={(visible) => {
                this.setState({
                  filterVisible: visible
                })
              }}
            />
            <Column
              title='创建日期'
              sorter
              key='createdAt'
              render={(role) => (
                <div>{dateTimeHelper.lllFormat(role.createdAt)}</div>
              )}
            />
            <Column
              title='更新日期'
              sorter
              key='updatedAt'
              render={(role) => (
                <div>{dateTimeHelper.lllFormat(role.updatedAt)}</div>
              )}
            />
            {/*<Column*/}
              {/*title='操作'*/}
              {/*render={(text, role) => (*/}
                {/*<div>*/}
                  {/*<a onClick={() => this.editRole(role)}>编辑</a>*/}
                {/*</div>*/}
              {/*)}*/}
            {/*/>*/}
          </Table>
        </Card>
      </PageHeaderLayout>
    )
  }
}
