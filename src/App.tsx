import { Button, Form, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

function App() {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const options = values?.names?.filter((v) => v) ?? [];

  return (
    <>
      <Form
        form={form}
        name="dynamic_form_item"
        initialValues={{ names: [""] }}
        onFinish={(values) => console.log(values)}
        style={{ maxWidth: 600 }}
      >
        <Form.List name="names">
          {(fields, { add, remove }, { errors }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <Form.Item noStyle>
                    <Space key={field.key} align="baseline">
                      <Form.Item {...field} name={[field.name, "parent"]}>
                        <Select
                          disabled={options.length < 2}
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
              </>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default App;
