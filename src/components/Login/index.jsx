import { useEffect, useState } from "react";
import { Form, Input, Select, Popup } from "../UI";

export default function Login() {

  const onSubmit = (data) => {
  };

  const [formData, setFormData] = useState({ bank: "", phone: "" });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFormData({ ...formData, bank: 3, phone: "123451234", password: '123123' });
    }, 1500);
  }, []);

  return (
    <>
      <div className="p-5">
        <Form submit={onSubmit} defaultValues={formData}>
          <Form.Item
            name="name"
            placeholder="name"
            rules={{
              required: true,
              pattern: /^[A-Za-z]+$/,
              message: "Enter your name",
            }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label={() => "+234"}
            placeholder="phone number"
            rules={{
              required: true,
              // format: /(^[^1-9]*)|([^\d]+)/g,
              format: /(^[^1-9]*)?[^\d]?/g,
              pattern: /^[\d]+$/,
              minLength: 9,
              maxLength: 11,
              message: "Enter your phone number",
            }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            placeholder="password"
            rules={{
              required: true,
              pattern: /^[\d]+$/,
              minLength: 6,
              maxLength: 18,
              message: "Enter your password",
            }}
          >
            <Input />
          </Form.Item>

          <div className="py-40"></div>

          <button
            type="button"
            className="h-12 text-lg text-white rounded-xl bg-gray-200"
            onClick={() => setOpen(true)}
          >
            on popup
          </button>

          <a href="/income">go to income</a>


          <Form.Item
            name="bank"
            placeholder="bank"
            rules={{
              required: true,
              message: "Selected your bank",
            }}
            list={[
              { text: "chongqing", value: 1 },
              { text: "beijing", value: 2 },
              { text: "xinjiang", value: 3 },
              { text: "shanghai", value: 4 },
              { text: "chengdu", value: 5 },
              { text: "shenzhen", value: 6 },
              { text: "dali", value: 7 },
            ]}
          >
            <Select></Select>
          </Form.Item>

          <div className="py-40"></div>

          <button
            type="submit"
            className="w-full h-12 text-lg text-white rounded-xl bg-gray-200"
          >
            Submit
          </button>
        </Form>
      </div>

      {/* 弹窗 */}
      <Popup controller={[open, setOpen]} width="86vw" mode="center">
        <div className="h-96">
          <p className="py-10">article</p>
          <p className="py-10">article</p>
          <p className="py-10">article</p>
          <p className="py-10">article</p>
          <p className="py-10">article</p>

          <a href="/income">go to income</a>
        </div>
      </Popup>
    </>
  );
}
