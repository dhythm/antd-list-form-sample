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
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  // const options = values?.blocks?.filter((v) => v.name) ?? [];
  const options = useMemo(
    () =>
      values?.blocks?.flatMap((v) =>
        v?.name
          ? {
              label: v?.name,
              value: uuidv4(),
            }
          : []
      ),
    [values?.blocks]
  );

  console.log(values, options);
  console.log(
    options?.find((o) => o.label === "農林水産省"),
    options?.find((o) => o.label === "全国農業会議所")
  );

  return (
    <Form
      form={form}
      name="dynamic_form_item"
      initialValues={{
        blocks: [
          { name: "農林水産省", items: [{}] },
          {
            name: "全国農業会議所",
            items: [{ name: "一般社団法人全国農業会議所" }],
          },
          {
            name: "都道府県",
            items: [
              { name: "熊本県" },
              { name: "北海道" },
              { name: "鹿児島県" },
              { name: "青森県" },
              { name: "福岡県" },
              { name: "長野県" },
              { name: "愛媛県" },
              { name: "山形県" },
              { name: "沖縄県" },
              { name: "宮崎県" },
            ],
          },
          {
            name: "",
            items: [""],
          },
        ],
        // edges: [{ from: "農林水産省", to: "全国農業会議所" }, {}],
        edges: [{}],
      }}
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
                          name={[field.name, "name"]}
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
                                      name={[_field.name, "name"]}
                                      // fieldId={[_field.fieldKey, "name"]}
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

        <Card title="Edges">
          <Form.List name="edges">
            {(fields, { add, remove }, { errors }) => {
              return (
                <Space direction="vertical">
                  {fields.map((field, index) => (
                    <Form.Item noStyle>
                      <Space key={`edges-${field.key}`} align="baseline">
                        <Form.Item
                          {...field}
                          name={[field.name, "from"]}
                          style={{ margin: 0 }}
                        >
                          <Select
                            disabled={options?.length === 0}
                            style={{ width: 130 }}
                          >
                            {options?.map((option, idx) => {
                              return (
                                <Select.Option key={idx} value={option.value}>
                                  {option.label}
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
                            disabled={options?.length === 0}
                            style={{ width: 130 }}
                          >
                            {options?.map((option, idx) => {
                              return (
                                <Select.Option key={idx} value={option.value}>
                                  {option.label}
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

        <Card>
          <Typography>{JSON.stringify(values)}</Typography>
        </Card>
      </Space>
    </Form>
  );
}

export default App;
