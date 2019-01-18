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
  Cascader,
  Form,
  Select,
  InputNumber,
  Slider,
  Upload,
  Rate,
  Checkbox,
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
const {Option} = Select

@connect()
class AddGoods extends Component {
  state = {
    star: [],
    GoodsDetail: {},
    imgFile: null,
    options: [
      {
        value: '河南省',
        label: '河南省',
        children: [
          {
          value: '郑州',
          label: '郑州',
          children: [
            {
            value: '二七区',
            label: '二七区',
          },
            {
            value: '管城回族区',
            label: '管城回族区',
          },
            {
            value: '惠济区',
            label: '惠济区',
          },
            {
            value: '金水区',
            label: '金水区',
          },
            {
            value: '上街区',
            label: '上街区',
          }, {
            value: '中原区',
            label: '中原区',
          },
            {
            value: '其他区',
            label: '其他区',
          },
          ],
        },
          {
          value: '洛阳',
          label: '洛阳',
          children: [
            {
            value: '吉利区',
            label: '吉利区',
          },
            {
            value: '涧西区',
            label: '涧西区',
          },
            {
            value: '老城区',
            label: '老城区',
          },
            {
            value: '西宫区',
            label: '西宫区',
          },{
            value: '瀍河回族区',
            label: '瀍河回族区',
          },{
            value: '洛龙区',
            label: '洛龙区',
          },{
            value: '伊滨区',
            label: '伊滨区',
          },
            {
            value: '其他区',
            label: '其他区',
          },
          ],
        },

          {
          value: '平顶山',
          label: '平顶山',
          children: [
            {
            value: '石龙区',
            label: '石龙区',
          },
            {
            value: '卫东区',
            label: '卫东区',
          },
            {
            value: '新华区',
            label: '新华区',
          },
            {
            value: '湛河区',
            label: '湛河区',
          },{
            value: '其他区',
            label: '其他区',
          },
          ],
        },
        ],
      },
   ]
  }

  async componentWillMount () {

  }

  async componentDidMount () {
    this.onLoadStar()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const user = Parse.User.current()
    const {imgFile} = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        const newPlace=values.place.join(' ')+' '+values.placeDetail
        this.props.dispatch({
          type: 'dashboard/goods/add',
          payload:{
            imgName:'show.jpg',
            file:imgFile,
            ...values,
            price:`${values.price}`,
            place:newPlace,
            user:user.id
          },

        })
      }
    })
  }

  normFile = (e) => {
    console.log(e.target.files[0])
    if (e.target.files[0]) {
      this.setState({
        imgFile: e.target.files[0]
      })
    }
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
          star: res
        })
      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const {star} = this.state
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    }
    return (

      <PageHeaderLayout title="我要出售">
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item  {...formItemLayout} label='商品名称'>
              {getFieldDecorator('title', {

                rules: [
                  {required: true, message: '不能为空！'}
                ]
              })(
                <Input
                  placeholder="商品名称"
                />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="商品类型"
              hasFeedback
            >
              {getFieldDecorator('type', {
                rules: [
                  {required: true, message: '请一定选择商品类型!'},
                ],
              })(
                <Select placeholder={'请选择商品类型'}>
                  <Option value={'手机'}>手机</Option>
                  <Option value={'数码'}>数码</Option>
                  <Option value={'服装'}>服装</Option>
                  <Option value={'居家'}>居家</Option>
                  <Option value={'美妆'}>美妆</Option>
                  <Option value={'运动'}>运动</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item  {...formItemLayout} label='商品价格'>
              {getFieldDecorator('price', {

                rules: [
                  {required: true, message: '不能为空！'}
                ]
              })(
                <InputNumber  />
              )} <span className="ant-form-text"> ￥</span>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="是否同意议价"
            >
              {getFieldDecorator('isDiscuss', {valuePropName: 'checked'})(
                <Switch
                  checkedChildren="同意"
                  unCheckedChildren="不同意"
                />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="商品成色"
              hasFeedback
            >
              {getFieldDecorator('wear', {
                rules: [
                  {required: true, message: '不支持出售五成新以下的商品!'},
                ],
              })(
                <Select>
                  <Option value={'五成新'}>五成新</Option>
                  <Option value={'六成新'}>六成新</Option>
                  <Option value={'七成新'}>七成新</Option>
                  <Option value={'八成新'}>八成新</Option>
                  <Option value={'九成新'}>九成新</Option>
                  <Option value={'全新'}>全新</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="商品描述"
            >
              {getFieldDecorator('describe', {})(
                <Input.TextArea
                  rows={4}
                  placeholder="描述"
                />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="所在地区"
              hasFeedback
            >
              {getFieldDecorator('place', {
                rules: [
                  {required: true, message: '地区不能为空!'},
                ],
              })(
                <Cascader options={this.state.options} />
              )}
            </Form.Item>
            <Form.Item  {...formItemLayout} label='详细地址'>
              {getFieldDecorator('placeDetail', {

                rules: [
                  {required: true, message: '不能为空！'}
                ]
              })(
                <Input
                  placeholder="详细地址"
                />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="上传商品展示图"
            >
                <input type="file" onChange={this.normFile} style={{padding: 16, border: '1px solid #D4D3D3',borderRadius:'15px'}}/>
            </Form.Item>
            <Form.Item
              wrapperCol={{span: 12, offset: 6}}
            >
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>

        </Card>
      </PageHeaderLayout>
    )
  }
}

const AddGoodsPage = Form.create()(AddGoods)

export default AddGoodsPage
