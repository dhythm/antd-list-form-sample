import { Card, Collapse, Form, Input, Select, Space, Typography } from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { FlowAnalysisGraph } from "@ant-design/graphs";

function App() {
  const [form] = Form.useForm();
  const values = Form.useWatch<
    | { blocks: { name: string; items: { name: string }[] }[]; edges: any[] }
    | undefined
  >([], form);

  const blocks = useMemo(
    () =>
      (values?.blocks ?? []).flatMap((block) =>
        block?.name
          ? {
              id: uuidv4() as string,
              ...block,
            }
          : []
      ),
    [values?.blocks]
  );

  const options = blocks.map((block) => ({
    label: block.name,
    value: block.id,
  }));

  const data = useMemo(
    () => ({
      nodes: blocks.map((block) => ({
        id: block.id,
        value: {
          title: block.name,
        },
      })),
      edges: values?.edges.flatMap((edge) =>
        edge ? { source: edge.from, target: edge.to } : []
      ),
    }),
    [blocks, values?.edges]
  );

  return (
    <>
      <Form
        form={form}
        name="dynamic_form_item"
        initialValues={{
          blocks: [
            { name: "農林水産省", items: [{}] },
            {
              name: "（一社）全国農業会議所",
              items: [{ name: "一般社団法人全国農業会議所" }],
            },
            {
              name: "都道府県（47都道府県）",
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
              name: "育成センター",
              items: [
                { name: "（公財）北海道農業公社" },
                { name: "（公社）大分県農業農村振興公社" },
                { name: "（公社）宮崎県農業振興公社" },
                { name: "（公財）長崎県農林水産業担い手育成基金" },
                { name: "（公社）あおもり農林業支援センター" },
                { name: "（公社）えひめ農林漁業振興機構" },
                { name: "（一社）岐阜県農畜産公社" },
                { name: "（公社）みやぎ農業振興公社" },
                { name: "（公財）福島県農業振興公社" },
                { name: "（公社）秋田県農業公社" },
              ],
            },
            {
              name: "市町村（1,284市町村）",
              items: [
                { name: "弘前市" },
                { name: "宮崎市" },
                { name: "八代市" },
                { name: "浜松市" },
                { name: "松山市" },
                { name: "熊本市" },
                { name: "阿波市" },
                { name: "八女市" },
                { name: "阿蘇市" },
                { name: "鶴岡市" },
              ],
            },
            {
              name: "（一社）全国農業会議所",
              items: [{ name: "（一社）全国農業会議所" }],
            },
            {
              name: "（公社）日本農業法人協会",
              items: [
                {
                  name: "（公社）日本農業法人協会",
                },
              ],
            },
            {
              name: "（株）ツナグ・マッチングサクセス",
              items: [{ name: "（株）ツナグ・マッチングサクセス" }],
            },
          ],
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
                    <Card
                      title={`Node ${index + 1}`}
                      bodyStyle={{ padding: 12 }}
                    >
                      <Form.Item key={`blocks-${field.key}`} noStyle>
                        <Collapse expandIconPosition="right" size="small" ghost>
                          <Collapse.Panel
                            key={`blocks-${field.key}`}
                            header={
                              <Space align="baseline">
                                <Form.Item
                                  {...field}
                                  name={[field.name, "name"]}
                                  rules={[{ required: true, whitespace: true }]}
                                  noStyle
                                >
                                  <Input style={{ width: "100%" }} />
                                </Form.Item>
                                {fields.length > 1 &&
                                fields.length - 1 !== index ? (
                                  <MinusCircleOutlined
                                    onClick={() => remove(field.name)}
                                  />
                                ) : (
                                  <PlusCircleOutlined
                                    onClick={() => add({ items: [""] })}
                                  />
                                )}
                              </Space>
                            }
                          >
                            <Form.Item>
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
                                              onClick={() =>
                                                _remove(_field.name)
                                              }
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
                          </Collapse.Panel>
                        </Collapse>
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

          {/*
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          */}
        </Space>
      </Form>
      <Card style={{ marginTop: 24 }}>
        {/* <Typography>{JSON.stringify(values)}</Typography> */}
        <FlowAnalysisGraph
          data={data}
          nodeCfg={{
            size: [140, 25],
            badge: {
              style: (cfg) => {
                const ids = ["-3", "-2", "-1"];
                const fill = ids.includes(cfg.id) ? "#c86bdd" : "#5ae859";
                return {
                  fill,
                  radius: [2, 0, 0, 2],
                };
              },
            },
            items: {
              padding: 6,
              containerStyle: {
                fill: "#fff",
              },
              style: (cfg, group, type) => {
                const styles = {
                  icon: {
                    width: 12,
                    height: 12,
                  },
                  value: {
                    fill: "#f00",
                  },
                  text: {
                    fill: "#aaa",
                  },
                };
                return styles[type];
              },
            },
            nodeStateStyles: {
              hover: {
                stroke: "#1890ff",
                lineWidth: 2,
              },
            },
            title: {
              containerStyle: {
                fill: "transparent",
              },
              style: {
                fill: "#000",
                fontSize: 12,
              },
            },
            style: {
              fill: "#E6EAF1",
              stroke: "#B2BED5",
              radius: [2, 2, 2, 2],
            },
          }}
          edgeCfg={{
            label: {
              style: {
                fill: "#aaa",
                fontSize: 12,
                fillOpacity: 1,
              },
            },
            style: (edge) => {
              const stroke = edge.target === "0" ? "#c86bdd" : "#5ae859";
              return {
                stroke,
                lineWidth: 1,
                strokeOpacity: 0.5,
              };
            },
            edgeStateStyles: {
              hover: {
                lineWidth: 2,
                strokeOpacity: 1,
              },
            },
          }}
          markerCfg={(cfg) => {
            const { edges } = data ?? {};
            return {
              position: "right",
              show: edges?.find((item) => item.source === cfg.id),
            };
          }}
        />
      </Card>
    </>
  );
}

export default App;
