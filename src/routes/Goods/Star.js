import React, { Component, Fragment, StyleSheet } from 'react'
import { connect } from 'dva'
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Button,
  Radio,
  DatePicker,
  Carousel,
  Divider,
  Comment,
  Form,
  Input,
  List,
  message,
  Switch,
  BackTop,
  Popconfirm,
  Modal,
  Avatar,
  Tooltip,
  Menu,
  Dropdown
} from 'antd'
import { Link } from 'dva/router'
import moment from 'moment'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import { Parse } from '../../utils/leancloud'

const Column = Table.Column
@connect()
export default class Details extends Component {
  state = {
    star:[],
  }

  async componentWillMount () {

  }

  async componentDidMount () {
    this.onLoadStar()
  }

  onLoadStar = () => {
    const user = Parse.User.current()
    this.props.dispatch({
      type: 'dashboard/star/fetchByUserId',
      payload: {
        id: user.id
      },
      callback: res => {
        console.log('my star')
        console.log(res)
      this.setState({
        star:res
      })
      }
    })
  }

  onAddComments = async () => {
    const {query} = this.props.location
    const {user, value} = this.state
    const id = Parse.User.current()
    await this.props.dispatch({
      type: 'dashboard/comment/add',
      payload: {
        id: query.id,
        author: user.name,
        content: value,
        name: id.id
      },
      callback: res => {
        this.setState({
          submitting: false,
          value: '',
          comments: [res, ...this.state.comments]
        })
        // res === 'ok' ? this.setState({
        //   submitting: false,
        //   value: '',
        //   comments:[res.response,...this.state.comments,]
        // }) : message.error('评论失败')
      }
    })
    // await this.onLoadComments(query.id)
  }
    rowRender=(record)=>{
      console.log(record)
    }
  render () {
    const{star}=this.state
    {console.log('a')}
    return (

      <PageHeaderLayout title="我的收藏">
        <Card>
          <Table
            dataSource={star}
            rowKey="id"
            onChange={this.handleTableChange}
            expandedRowRender={record => this.rowRender(record)}
          >
            <Column
              title="图片"
              dataIndex="starGoods.img"
              key="img"
              render={(text, item) => (
                <div><img style={{width:60,height:60}} src={text.attributes.url}/></div>
              )}
            />
            <Column
              title="标题"
              dataIndex="starGoods.title"
              key="title"
            />
            <Column
              title="价格"
              dataIndex="starGoods.price"
              key="price"
            />
            <Column
              title="上传时间"
              dataIndex="CreateAt"
              render={(text, item) => (
                <div>{moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
              )}
            />
            <Column
              title="操作"
              render={(text, ONU) => (
                <div>
                  <a onClick={() => this.onDetail(ONU)}>详情</a>
                  <span className="ant-divider"/>
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
                      更多 <Icon type="down"/>
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
