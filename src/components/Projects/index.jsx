import React from 'react'
import {Table, Tag} from "antd";
import {Link} from "react-router-dom";
import {data} from "../../data";

const columns = [
    {
        title: 'Contact',
        dataIndex: 'contact',
        key: 'contact',
    },
    {
        title: 'Project',
        dataIndex: 'project',
        key: 'project',
        render: (text) => {
            return {
                children: <Link to='/project'>{text}</Link>,
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
    }
];



const Projects = () => {
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

export default Projects