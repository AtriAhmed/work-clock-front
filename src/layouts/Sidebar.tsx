import React from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import RenderIfAId from '../utils/RenderIfAId';
import { ClockIcon } from '@heroicons/react/24/outline';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {

  return (
    <div className="sidebar pt-[4rem] lg:fixed w-full lg:w-[250px] flex flex-row lg:flex-col lg:flex-nowrap flex-wrap overflow-auto h-full shadow transition duration-300 bg-white dark:bg-gray-800 dark:text-white">
      <Link to="/admin/" className="flex flex-row gap-4 p-4 no-underline">
        <HomeIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
        <span className="flex-end">Home</span>
      </Link>
      <RenderIfAId aIdSup={3}>
      <Link to="/admin/users" className="flex flex-row gap-4 p-4 no-underline">
        <UsersIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
        <span className="flex-end">Utilisateurs</span>
      </Link>
      </RenderIfAId>
      <RenderIfAId aIdEqual={1}>
      <Link to="/employee/work-clock" className="flex flex-row gap-4 p-4 no-underline">
        <ClockIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
        <span className="flex-end">Pointage</span>
      </Link>
      </RenderIfAId>
      <RenderIfAId aIdEqual={1}>
      <Link to="/employee/work-attendance" className="flex flex-row gap-4 p-4 no-underline">
        <ClockIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
        <span className="flex-end">Histoire de presence</span>
      </Link>
      </RenderIfAId>
    </div>
  );
};

export default Sidebar;
