import {Link} from "react-router-dom";
import {Tag} from "antd";

export const columns = [
    {
        title: 'Task',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
            return {
                children: <Link to={`/project/${record.id}`}>{text}</Link>,
            };
        },
    },
    {
        title: 'Requester',
        dataIndex: 'requester',
        key: 'requester'
    },
    {
        title: 'Assignee',
        dataIndex: 'assignee',
        key: 'assignee'
    }/*,
    {
        title: 'Tokens',
        dataIndex: 'tokens',
        key: 'tokens',
        sorter: {
            compare: (ascend, descend) => ascend.tokens - descend.tokens,
            multiple: 1
        }
    }*/
];