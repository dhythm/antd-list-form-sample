import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

function App() {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const options = values?.blocks?.filter((v) => v.block) ?? [];

  return (
    <Form
      form={form}
      name="dynamic_form_item"
      initialValues={{ blocks: [{ items: [""] }], flows: [""] }}
      onFinish={(values) => console.log(values)}
      style={{ maxWidth: 600 }}
    >
      <Space direction="vertical">
        <Form.List name="blocks">
          {(fields, { add, remove }, { errors }) => {
            return (
              <Space direction="vertical">
                {fields.map((field, index) => (
                  <Card title={`Node ${index + 1}`}>
                    <Form.Item key={`blocks-${fields.key}`} noStyle>
                      <Space align="baseline">
                        <Form.Item
                          {...field}
                          name={[field.name, "block"]}
                          rules={[{ required: true, whitespace: true }]}
                          noStyle
                        >
                          <Input style={{ width: "100%" }} />
                        </Form.Item>
                        {fields.length > 1 && fields.length - 1 !== index ? (
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
                        ) : (
                          <PlusCircleOutlined
                            onClick={() => add({ items: [""] })}
                          />
                        )}
                      </Space>
                      <Form.Item style={{ marginTop: 8 }}>
                        <Form.List name={[field.name, "items"]}>
                          {(_fields, { add: _add, remove: _remove }) => {
                            return (
                              <Space direction="vertical" size="small">
                                {_fields.map((_field, idx) => (
                                  <Space
                                    key={`items-${_field.key}`}
                                    align="baseline"
                                    style={{ marginLeft: 24 }}
                                  >
                                    <Form.Item
                                      {..._field}
                                      name={[_field.name, "item"]}
                                      fieldId={[_field.fieldKey, "item"]}
                                      key={idx}
                                      style={{ margin: 0 }}
                                    >
                                      <Input style={{ width: "100%" }} />
                                    </Form.Item>
                                    {_fields.length > 1 &&
                                    _fields.length - 1 !== idx ? (
                                      <MinusCircleOutlined
                                        onClick={() => _remove(_field.name)}
                                      />
                                    ) : (
                                      <PlusCircleOutlined
                                        onClick={() => _add()}
                                      />
                                    )}
                                  </Space>
                                ))}
                              </Space>
                            );
                          }}
                        </Form.List>
                      </Form.Item>
                    </Form.Item>
                  </Card>
                ))}
              </Space>
            );
          }}
        </Form.List>

        <Card title="Relationship">
          <Form.List name="flows">
            {(fields, { add, remove }, { errors }) => {
              return (
                <Space direction="vertical">
                  {fields.map((field, index) => (
                    <Form.Item noStyle>
                      <Space key={`flows-${field.key}`} align="baseline">
                        <Form.Item
                          {...field}
                          name={[field.name, "from"]}
                          style={{ margin: 0 }}
                        >
                          <Select
                            disabled={options.length === 0}
                            style={{ width: 130 }}
                          >
                            {options.map((option, idx) => {
                              return (
                                <Select.Option key={idx} value={option.block}>
                                  {option.block}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                        <ArrowRightOutlined />
                        <Form.Item
                          {...field}
                          name={[field.name, "to"]}
                          style={{ margin: 0 }}
                        >
                          <Select
                            disabled={options.length === 0}
                            style={{ width: 130 }}
                          >
                            {options.map((option, idx) => {
                              return (
                                <Select.Option key={idx} value={option.block}>
                                  {option.block}
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
        </Card>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Typography>{JSON.stringify(values)}</Typography>
      </Space>
    </Form>
  );
}

export default App;
