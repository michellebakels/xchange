import AntdFormItem from './antdFormItem'
import { Input, Select, DatePicker} from 'antd';

export const AntdInput = (props) => AntdFormItem(Input, props)
export const AntdSelect = (props) => AntdFormItem(Select, props)
export const AntdInputPassword = (props) => AntdFormItem(Input.Password, props)
export const AntdTextArea = (props) => AntdFormItem(Input.TextArea, props)
export const AntdDatePicker = (props) => AntdFormItem(DatePicker, props)

export default AntdInput