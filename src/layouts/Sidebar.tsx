import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import RenderIfAId from "../utils/RenderIfAId";
import { ClockIcon } from "@heroicons/react/24/outline";
import {
  ArrowRightOnRectangleIcon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="sidebar pt-[4rem] lg:fixed w-full lg:w-[250px] flex flex-row lg:flex-col lg:flex-nowrap flex-wrap overflow-auto h-full shadow transition duration-300 bg-white dark:bg-gray-800 dark:text-white">
      <RenderIfAId aIdEqual={3}>
        <Link to="/admin/" className="flex flex-row gap-4 p-4 no-underline">
          <HomeIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
          <span className="flex-end">Home</span>
        </Link>
      </RenderIfAId>
      <RenderIfAId aIdEqual={3}>
        <Link
          to="/admin/users"
          className="flex flex-row gap-4 p-4 no-underline"
        >
          <UsersIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
          <span className="flex-end">Utilisateurs</span>
        </Link>
      </RenderIfAId>
      <RenderIfAId aIdEqual={1}>
        <Link
          to="/employee/work-clock"
          className="flex flex-row gap-4 p-4 no-underline"
        >
          <ClockIcon className="block h-6 w-6 flex-start" aria-hidden="true" />
          <span className="flex-end">Pointage</span>
        </Link>
      </RenderIfAId>
      <RenderIfAId aIdEqual={1}>
        <Link
          to="/employee/work-attendance"
          className="flex flex-row gap-4 p-4 no-underline"
        >
          <CalendarIcon
            className="block h-6 w-6 flex-start"
            aria-hidden="true"
          />
          <span className="flex-end">Histoire de presence</span>
        </Link>
      </RenderIfAId>
      <RenderIfAId aIdSup={2}>
        <Link
          to="/accountant/work-attendance"
          className="flex flex-row gap-4 p-4 no-underline"
        >
          <CalendarIcon
            className="block h-6 w-6 flex-start"
            aria-hidden="true"
          />
          <span className="flex-end">Histoire de présence</span>
        </Link>
      </RenderIfAId>
      <RenderIfAId aIdEqual={3}>
        <Link
          to="/admin/leave-requests"
          className="flex flex-row gap-4 p-4 no-underline"
        >
          <ArrowRightOnRectangleIcon
            className="block h-6 w-6 flex-start"
            aria-hidden="true"
          />
          <span className="flex-end">Demandes de congé</span>
        </Link>
      </RenderIfAId>
      <RenderIfAId aIdEqual={1}>
        <Link
          to="/employee/leave-request"
          className="flex flex-row gap-4 p-4 no-underline"
        >
          <ArrowRightOnRectangleIcon
            className="block h-6 w-6 flex-start"
            aria-hidden="true"
          />
          <span className="flex-end">Demande de congé</span>
        </Link>
      </RenderIfAId>
      <RenderIfAId aIdEqual={3}>
        <Link
          to="/admin/company-settings"
          className="flex flex-row gap-4 p-4 no-underline"
        >
          <Cog6ToothIcon
            className="block h-6 w-6 flex-start"
            aria-hidden="true"
          />
          <span className="flex-end">Parametres de societe</span>
        </Link>
      </RenderIfAId>
      <RenderIfAId aIdEqual={3}>
        <Link
          to="/admin/analytics"
          className="flex flex-row gap-4 p-4 no-underline"
        >
          <ChartBarIcon
            className="block h-6 w-6 flex-start"
            aria-hidden="true"
          />
          <span className="flex-end">Rapports</span>
        </Link>
      </RenderIfAId>
    </div>
  );
};

export default Sidebar;
