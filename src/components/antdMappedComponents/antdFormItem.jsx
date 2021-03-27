import React from 'react';
import { Form } from 'antd';
import {SelectOption} from "./antdUtils";

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
                >
                    {FormItem.Option && data && SelectOption(data.collection , data.name, data.id)}
                </FormItem>
        </Form.Item>
    )
} 

export default AntdFormItem