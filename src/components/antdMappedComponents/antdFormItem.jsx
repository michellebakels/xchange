import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const AntdFormItem = (FormItem, props) => {

    const {
        label, 
        name, 
        rules, 
        onChange, 
        initialValue, 
        options, 
        value, 
        placeholder, 
        checked, 
        data, 
        showSearch,
        autoComplete,
        optionType,
        buttonStyle,
        mode,
        hidden,
        valuePropName,
        format,
        ...rest
    } = props;

    return(
        <Form.Item
                label={label}
                name={name}
                rules={rules}
                initialValue={initialValue}
                valuePropName={valuePropName}
                {...rest}
            >
                <FormItem
                    onChange={onChange}
                    value={value}
                    checked={checked}
                    options={options}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    optionType={optionType}
                    buttonStyle={buttonStyle}
                    showSearch={showSearch}
                    mode={mode}
                    hidden={hidden}
                    format={format}
                >
                    {FormItem.Option && data && data.map(data => <Option key={data}>{data}</Option>)}
                </FormItem>
        </Form.Item>
    )
} 

export default AntdFormItem