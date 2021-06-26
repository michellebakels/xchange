import {Link} from "react-router-dom";

export const columns = [
    {
        title: 'Requester',
        dataIndex: 'requester',
        key: 'requester'
    },
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
        title: 'Assignee',
        dataIndex: 'assignee',
        key: 'assignee'
    },
    {
        title: 'Tokens',
        dataIndex: 'tokens',
        key: 'tokens'
    }
];