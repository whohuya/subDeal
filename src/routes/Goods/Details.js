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

import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import { Parse } from '../../utils/leancloud'

@connect()
export default class Details extends Component {
  state = {
    item: '',
    visible: false,

  }

  async componentDidMount () {
    const {query} = this.props.location
    await this.onLoadDetail(query)
    const user = await Parse.User.current()
    await this.isStar(query.id, user.id)

  }

  isStar = (goods, user) => {
    console.log('is star')
    this.props.dispatch({
      type: 'dashboard/star/isStar',
      payload: {
        id: goods,
        user: user,
      },
      callback: res => {
        this.setState({
          currentUserIsStar: res
        })
      }
    })
  }
  onLoadDetail = (query) => {
    this.props.dispatch({
      type: 'dashboard/dashboard/queryById',
      payload: {
        id: query.id
      },
      callback: res => {
        this.setState({
          item: res
        })
      }
    })
  }

  confirm = () => {
    this.setState({
      visible: true,
    })
  }
  cancel = () => {
    this.setState({
      visible: false,
    })
  }

  render () {
    const {item, currentUserIsStar, visible} = this.state
    const TabPane = Tabs.TabPane;
    console.log(item)
    return (
      <PageHeaderLayout title="商品详情">
        {item&& <div>
          <BackTop/>
          <Modal
            title="卖家联系方式"
            visible={visible}
            onOk={this.cancel}
            onCancel={this.cancel}
          >
            <p>电话：{item.sellName.phone}</p>
            <p>微信：{item.sellName.weChat===undefined?'该卖家没有留微信，电话联系吧':item.sellName.weChat}</p>
            <p>赶紧联系卖家进行线下交易吧！</p>
          </Modal>
          <Card>
            <Row>
              <Col span={12}>
                <div>
                  <img
                    style={{width: '100%', height: '100%'}}
                    src={item.img.url}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div style={{marginLeft: 16}}>
                  <h1>{item.title}</h1>
                  <h3>转 卖 价 ：
                    <span style={{color: '#999999', fontSize: 32}}>￥</span>
                    <span style={{color: '#EA5428', fontSize: 32}}>{item.price}</span>
                  </h3>
                  <Divider>{item.isDiscuss &&
                            <span style={{color: '#F9DA61'}}><Icon type="bulb"/>该商品拒绝讲价！</span>}</Divider>
                  <h3 style={{marginBottom: 16}}>成&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色 ：{item.wear}</h3>
                  <h3 style={{marginBottom: 16}}>所 在 地 ：{item.place}</h3>
                  <h3 style={{marginBottom: 16}}>联系方式：<span style={{color: '#999999'}}>确认购买可见</span></h3>
                  <h3 style={{marginBottom: 16}}>交易方式：<span style={{color: '#999999'}}>暂只支持线下交易</span></h3>
                  <h3 style={{marginBottom: 16}}>收&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;藏：<Switch checkedChildren="已收藏" unCheckedChildren="未收藏"
                                                                                          defaultChecked={currentUserIsStar}/></h3>
                  <Popconfirm title="确认需要购买吗?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes"
                              cancelText="No">
                    <Button style={{width: '50%', marginBottom: 16}} type="primary" size={'large'}>确认购买</Button>
                  </Popconfirm>
                </div>
              </Col>
            </Row>
          </Card>
        <Card style={{marginTop:16}}>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="宝贝描述" key="1">
              <h3>{item.describe===undefined?'该卖家没有添加对该宝贝的描述':item.describe}</h3>
            </TabPane>
            <TabPane tab="留言" key="2">Content of Tab Pane 2</TabPane>
          </Tabs>
        </Card>
        </div>}

      </PageHeaderLayout>
    )
  }
}
