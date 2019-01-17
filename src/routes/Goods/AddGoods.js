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
  }

  async componentWillMount () {

  }

  async componentDidMount () {
    this.onLoadStar()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {imgFile}=this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        // this.props.dispatch({
        //   type: 'dashboard/goods/add',
        //   payload: {
        //     file: imgFile,
        //     imgName: 'logo.img',
        //     ...values
        //   }
        // })
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
              label="Title"
            >
              <Input/>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Title"
              hasFeedback
            >
              {getFieldDecorator('select', {
                rules: [
                  {required: true, message: 'Please select your country!'},
                ],
              })(
                <Select placeholder="Please select a country">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
            {...formItemLayout}
            label="Select[multiple]"
          >
            {getFieldDecorator('select-multiple', {
              rules: [
                {required: true, message: 'Please select your favourite colors!', type: 'array'},
              ],
            })(
              <Select mode="multiple" placeholder="Please select favourite colors">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            )}
          </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="InputNumber"
            >
              {getFieldDecorator('input-number', {initialValue: 3})(
                <InputNumber min={1} max={10}/>
              )}
              <span className="ant-form-text"> machines</span>
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Switch"
            >
              {getFieldDecorator('switch', {valuePropName: 'checked'})(
                <Switch/>
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Slider"
            >
              {getFieldDecorator('slider')(
                <Slider marks={{
                  0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F',
                }}
                />
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Radio.Group"
            >
              {getFieldDecorator('radio-group')(
                <Radio.Group>
                  <Radio value="a">item 1</Radio>
                  <Radio value="b">item 2</Radio>
                  <Radio value="c">item 3</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Radio.Button"
            >
              {getFieldDecorator('radio-button')(
                <Radio.Group>
                  <Radio.Button value="a">item 1</Radio.Button>
                  <Radio.Button value="b">item 2</Radio.Button>
                  <Radio.Button value="c">item 3</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Checkbox.Group"
            >
              {getFieldDecorator('checkbox-group', {
                initialValue: ['A', 'B'],
              })(
                <Checkbox.Group style={{width: '100%'}}>
                  <Row>
                    <Col span={8}><Checkbox value="A">A</Checkbox></Col>
                    <Col span={8}><Checkbox disabled value="B">B</Checkbox></Col>
                    <Col span={8}><Checkbox value="C">C</Checkbox></Col>
                    <Col span={8}><Checkbox value="D">D</Checkbox></Col>
                    <Col span={8}><Checkbox value="E">E</Checkbox></Col>
                  </Row>
                </Checkbox.Group>
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Rate"
            >
              {getFieldDecorator('rate', {
                initialValue: 3.5,
              })(
                <Rate/>
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Upload"
              extra=""
            >
              {getFieldDecorator('upload')(
                <input type="file" id="photoFileUpload"
                       style={{padding: 16, border: '1px solid red'}}/>
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Dragger"
            >
              <div className="dropbox">
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox"/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                )}
              </div>
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
