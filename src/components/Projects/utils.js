import {Link} from "react-router-dom";
import {Tag} from "antd";

export const columns = [
    {
        title: 'Contact',
        dataIndex: 'contact',
        key: 'contact',
    },
    {
        title: 'Task',
        dataIndex: 'title',
        key: 'title',
        render: (text) => {
            return {
                children: <Link to='/task-info'>{text}</Link>,
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
    },
    {
        title: 'Tokens',
        dataIndex: 'tokens',
        key: 'tokens',
    }
];