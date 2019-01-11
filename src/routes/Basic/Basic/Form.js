/**
 * Created by zhaoyu on Jan 16, 2018.
 * @flow
 */
import React from "react";
import { connect } from "dva";
import { Field, reduxForm } from "redux-form";

import { Button, Col, Form } from "antd";

import {
  TextField,
  NumberField,
  TextAreaField,
  AutoCompleteField
} from "../../../common/form/Fields";
import { required } from "../../../helpers/formHelper";

type Props = {
  basic: ?Object,
  handleSubmit: () => void,
  pristine: boolean,
  submitting: boolean,
  submitButtonText: string,
  reset: () => void,
  onChange: () => void
};

type State = {
  loading: boolean
};

class BasicForm extends React.Component<void, Props, State> {
  state = {
    loading: false
  };

  render() {
    const { handleSubmit, submitButtonText, submitting } = this.props;
    return (
      <div>
        <Form
          onSubmit={handleSubmit}
          layout="horizontal"
          className="modal-form"
        >
          <Field
            name="manager"
            type="text"
            size="default"
            placeholder="管理平台链接"
            label="管理平台链接"
            required
            hasFeedback
            validate={[required]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            component={TextAreaField}
          />
          <Field
            name="license"
            type="text"
            size="default"
            placeholder="许可链接"
            label="许可链接"
            required
            hasFeedback
            validate={[required]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18, offset: 0 }}
            component={TextField}
          />
          <Field
            name="aboutUs"
            type="text"
            size="default"
            placeholder="关于我们链接"
            label="关于我们链接"
            required
            hasFeedback
            validate={[required]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            component={TextAreaField}
          />
          <Button
            type="primary"
            htmlType="submit"
            disabled={submitting}
            className="modal-form-button"
          >
            {submitButtonText}
          </Button>
        </Form>
      </div>
    );
  }
}

const ExportBasicForm = reduxForm({
  form: "basicForm"
})(BasicForm);

function mapStateToProps(state, ownProps) {
  const { basic } = ownProps;
  return {
    initialValues: basic,
    submitButtonText: ownProps.submitButtonText || "提交"
  };
}

export default connect(mapStateToProps)(ExportBasicForm);
