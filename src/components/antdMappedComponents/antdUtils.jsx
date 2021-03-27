import { Select } from 'antd'

const { Option } = Select;

export const SelectOption = (collection, itemName, itemId) => {

    return(
        collection.map((collection) => <Option key={collection[itemId]} value={collection[itemName]}>{collection[itemName]}</Option>)
    )
}