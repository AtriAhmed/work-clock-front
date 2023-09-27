import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  InformationCircleIcon,
  ListBulletIcon,
  MapPinIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TagIcon,
  UserPlusIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import RenderIfAId from '../utils/RenderIfAId';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {

  return (
    <div className="sidebar pt-[4rem] lg:fixed w-full lg:w-[250px] flex flex-row lg:flex-col lg:flex-nowrap flex-wrap overflow-auto h-full shadow transition duration-300 bg-white dark:bg-gray-800 dark:text-white">
      <Link to="/admin/" className="flex flex-row gap-4 p-4 no-underline">
        <HomeIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
        <span className="flex-end">Home</span>
      </Link>
      <RenderIfAId aId={3}>
      <Link to="/admin/users" className="flex flex-row gap-4 p-4 no-underline">
        <UsersIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
        <span className="flex-end">Utilisateurs</span>
      </Link>
      </RenderIfAId>
    </div>
  );
};

export default Sidebar;
