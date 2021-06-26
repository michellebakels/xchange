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
        title: 'Skills Needed',
        key: 'skillsNeeded',
        dataIndex: 'skillsNeeded',
        render: tags => (
            <>
                {tags && tags.map(tag => {
                    return (
                        <Tag color='geekblue' key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Deadline',
        dataIndex: 'deadline',
        key: 'deadline',
        sorter: {
            compare: (ascend, descend) => ascend.deadline - descend.deadline,
            multiple: 2
        }
    },
    {
        title: 'Tokens',
        dataIndex: 'tokens',
        key: 'tokens',
        sorter: {
            compare: (ascend, descend) => ascend.tokens - descend.tokens,
            multiple: 1
        }
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    }
];