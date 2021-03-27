import AntdFormItem from './antdFormItem'
import { Input, Switch, Select, Radio } from 'antd';

export const AntdInput = (props) => AntdFormItem(Input, props)
export const AntdSelect = (props) => AntdFormItem(Select, props)
export const AntdInputPassword = (props) => AntdFormItem(Input.Password, props)
export const AntdRadioGroup = (props) => AntdFormItem(Radio.Group, props)
export const AntdSwitch = (props) => AntdFormItem(Switch, props)
export const AntdTextArea = (props) => AntdFormItem(Input.TextArea, props)

export default AntdInput