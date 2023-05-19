import { Button, Form, Input, Select, Space } from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

function App() {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const options = values?.names?.filter((v) => v) ?? [];

  return (
    <Form
      form={form}
      name="dynamic_form_item"
      initialValues={{ names: [""], flows: [""] }}
      onFinish={(values) => console.log(values)}
      style={{ maxWidth: 600 }}
    >
      <Space direction="vertical">
        <Form.List name="names">
          {(fields, { add, remove }, { errors }) => {
            return (
              <Space direction="vertical">
                {fields.map((field, index) => (
                  <Form.Item noStyle>
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, "name"]}
                        rules={[{ required: true, whitespace: true }]}
                        noStyle
                      >
                        <Input placeholder="" style={{ width: "100%" }} />
                      </Form.Item>
                      {fields.length > 1 && fields.length - 1 !== index ? (
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      ) : (
                        <PlusCircleOutlined onClick={() => add()} />
                      )}
                    </Space>
                  </Form.Item>
                ))}
              </Space>
            );
          }}
        </Form.List>

        <Form.List name="flows">
          {(fields, { add, remove }, { errors }) => {
            return (
              <Space direction="vertical">
                {fields.map((field, index) => (
                  <Form.Item noStyle>
                    <Space key={field.key} align="baseline">
                      <Form.Item {...field} name={[field.name, "from"]}>
                        <Select
                          disabled={options.length === 0}
                          style={{ width: 130 }}
                        >
                          {options.map((option, idx) => {
                            return (
                              <Select.Option key={idx} value={option.name}>
                                {option.name}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <ArrowRightOutlined />
                      <Form.Item {...field} name={[field.name, "to"]}>
                        <Select
                          disabled={options.length === 0}
                          style={{ width: 130 }}
                        >
                          {options.map((option, idx) => {
                            return (
                              <Select.Option key={idx} value={option.name}>
                                {option.name}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      {fields.length > 1 && fields.length - 1 !== index ? (
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      ) : (
                        <PlusCircleOutlined onClick={() => add()} />
                      )}
                    </Space>
                  </Form.Item>
                ))}
              </Space>
            );
          }}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
}

export default App;
