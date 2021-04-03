import React from 'react'
import {Table, Tag} from "antd";

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

const data = [
    {
        key: '1',
        contact: 'Ryan Walden',
        project: 'Decentralize US Currency',
        deadline: '4/11/2021',
        skillsNeeded: ['design', 'web development'],
    },
    {
        key: '2',
        contact: 'Shana Ostrovitz',
        project: 'Headshots for Bella',
        deadline: '4/12/2021',
        skillsNeeded: ['photography'],
    },
    {
        key: '3',
        contact: 'Ryan Poole',
        project: 'RealTrade Beta Testing',
        deadline: '4/13/2021',
    },
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