import React, { PureComponent } from 'react'
import { connect } from 'dva'

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
  message
} from 'antd'
import PageHeaderLayout from '../../../layouts/PageHeaderLayout'

import AuthorForm from './Form'
import TableCountText from '../../../components/TableCountText'
import Separator16 from '../../../components/Separator16'
import commonHelper from '../../../helpers/commonHelper'

const Column = Table.Column
@connect(state => ({
  loading: state['basic/authors'].loading,
  list: state['basic/authors'].data.list,
  pagination: state['basic/authors'].data.pagination
}))
export default class Authors extends PureComponent {
  state = {
    author: null,
    sorter: null,
    filters: null,
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
    //console.warn(this.props.state)
    this.fetchAuthors()
  }

  fetchAuthors = (payload = null) => {
    const {dispatch, pagination} = this.props
    const {sorter, filters, searchText} = this.state
    console.warn('in fetchAuthors ')
    if (!payload) {
      dispatch({
        type: 'basic/authors/fetch',
        payload: {
          search: searchText,
          pagination,
          sorter,
          ...filters
        }
      })
    } else {
      dispatch({type: 'basic/authors/fetch', payload})
    }
    console.warn('fetchAuthors Ends')
  }

  onInputChange = (e) => {
    this.setState({searchText: e.target.value})
  }

  onAuthorSearch = async () => {
    const {pagination} = this.props
    const {sorter, filters, searchText} = this.state
    // console.log(searchText)
    this.fetchAuthors({
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

  handleTableChange = async (pagination, filters, sorter) => {
    const {searchText} = this.state

    this.setState({
      sorter,
      filters
    })
    this.fetchAuthors({
      search: searchText,
      pagination,
      sorter,
      ...filters
    })
  }

  editAuthor = async (author: ?Object = null) => {
    const {submitting} = this.state
    //console.log(submitting)
    //console.log(author)
    const [title, buttonText] = (author === null) ? [
      '创建作者', '创建'
    ] : [
      '编辑作者', '编辑'
    ]
    await this.setState({
      author: (author === null) ? {id: null} : author
    })
    await this.setState({
      modalTitle: title,
      modalContent: <AuthorForm
        author={author}
        title={title}
        submitButtonText={buttonText}
        onSubmit={this.onSubmit}
        submitting={submitting} />,
      submitButtonText: buttonText,
      modalVisible: true
    })
  }

  deleteAuthor= async (author) => {
    const {dispatch} = this.props
    dispatch({
      type: 'basic/authors/remove',
      payload: {author},
      callback: this.deleteAuthorCallback
    })
  }

  deleteAuthorCallback = () => {
    message.success(`成功删除该作者。`)
    this.fetchAuthors()
  }

  handleCancel = async () => {
    await this.setState({
      modalVisible: false,
      modalContent: null,
      authors: null
    })
  }

  onSubmit = (values) => {
    const {dispatch} = this.props
    const {author} = this.state
    // console.warn(values)//提交的新记录
    // console.warn(author)//原先的记录
    try {
      this.setState({submitting: true})
      const newAuthor = {
        ...values,
        serial: values['serial'] ? parseFloat(values['serial']) : 0
      }
      if (!!author && !!author['id']) {
        // author 存在，且author.id存在，则不是新建而是修改
        console.warn(author)
        // update a authors
        dispatch({
          type: 'basic/authors/update',
          payload: {author: newAuthor},
          callback: () => this.fetchAuthors()
        })
      } else {
        // add a new author
        dispatch({
          type: 'basic/authors/add',
          payload: {author: newAuthor},
          callback: () => this.fetchAuthors()
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
      author: null
    })
  }

  render () {
    const {list, pagination, loading} = this.props
    const {filtered, filterVisible, modalTitle, modalVisible, modalContent, modalFooter} = this.state
    return (
      <PageHeaderLayout title='作者列表'>
        <Card bordered={false}>
          {pagination && <TableCountText>{pagination.total}</TableCountText>}
          <Modal title={modalTitle}
            visible={modalVisible}
            onCancel={this.handleCancel}
            footer={modalFooter}>
            {modalContent || <Spin spinning={loading} />}
          </Modal>
          <Button type='primary'
            onClick={() => this.editAuthor()}>
            新建作者
          </Button>
          <Separator16 />
          <Table dataSource={list && list.map(commonHelper.parseObjectToObject)}
            loading={loading}
            rowKey='id'
            onChange={this.handleTableChange}
            pagination={pagination}
            className='table-fixed'
          >
            <Column
              title='编号'
              sorter
              dataIndex='serial'
            />
            <Column
              title='名称'
              dataIndex='name'
              key='name'
              filterDropdown={<div className='table-input-search'>
                <Input
                  placeholder='名称'
                  value={this.state.searchText}
                  onChange={this.onInputChange}
                  onPressEnter={this.onAuthorSearch}
                />
                <Button type='primary' onClick={this.onAuthorSearch}>检索</Button>
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
              title='简介'
              dataIndex='description'
              //width='40%'
              render={(text)=>
                text ? (<div className='table-td-div-overflow'>{text} </div>): null
              }
            />
            <Column
              title='操作'
              render={(text, author) => (
                <div>
                  <a onClick={() => this.editAuthor(author)}>编辑</a>
                  <span className='ant-divider' />
                  <Dropdown overlay={
                    <Menu>
                      <Menu.Item>
                        <Popconfirm title='确定要删除吗？'
                          onConfirm={() => this.deleteAuthor(author)}>
                          <a href='#'>删除</a>
                        </Popconfirm>
                      </Menu.Item>
                    </Menu>
                  }>
                    <a className='ant-dropdown-link'>
                      更多 <Icon type='down' />
                    </a>
                  </Dropdown>
                </div>
              )}
            />
          </Table>
        </Card>
      </PageHeaderLayout>
    )
  }
}
