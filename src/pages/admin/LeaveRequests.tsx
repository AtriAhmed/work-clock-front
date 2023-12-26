import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import AddUserCmp from '../../components/leaveRequests/AddUserCmp';
import Avatar from "react-avatar";
// import EditUserCmp from '../../components/leaveRequests/EditUserCmp';
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../components/Card";
import Table from "../../components/Table";
import daysDifference from "../../utils/daysDifference";
import { FilterDropdown } from "../../components/FilterDropdown";
import ViewLeaveRequestCause from "../../components/admin/leave-requests/ViewLeaveRequestCause";
import Pagination from "../../components/Pagination";

const STATUS: any[] = [
  "En attente",
  "Accepté",
  "Refusé",
  "Date passé",
  "Archivé",
];

export default function LeaveRequests() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Add a function to handle page change
  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [toView, setToView] = useState({});

  const [statusFilter, setStatusFilter] = useState<any[]>(["0"]);

  const handleStatusChange = (selectedStatus: any[]) => {
    setStatusFilter(selectedStatus);
  };

  function getItems(filter: any[]) {
    const params: any = {};

    params.status = filter.join(",");

    axios
      .get(`/api/leave-requests?page=${currentPage}&pageSize=${pageSize}`, {
        params,
      })
      .then((response) => {
        setLeaveRequests(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching leaveRequests:", error);
      });
  }

  useEffect(() => {
    getItems(statusFilter);
  }, [statusFilter, currentPage]);

  function approuve(item: any) {
    let remaining = 0;
    axios.get(`/api/leave-requests/remaining/${item.User.id}`).then((res) => {
      remaining = res.data;

      Swal.fire({
        title: "Approuver demande de congé",
        text: `${item.User.firstname} ${
          item.User.lastname
        } a ${remaining} jours de congé restauntes, Vous éte sur de approuver un congé de ${daysDifference(
          item.startDate,
          item.endDate
        )} jours a partir du ${item.startDate} pour lui ?`,
        showDenyButton: true,
        confirmButtonText: "Approuve",
        denyButtonText: `Cancel`,
        confirmButtonColor: "rgb(34,197,94)",
        denyButtonColor: "#d9e2ef",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .get(`/api/leave-requests/approuve/${item.id}`)
            .then((res) => {
              toast.success("Demande de congé approuvé avec succé", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              getItems(statusFilter);
            })
            .catch((err) => {
              if (err.response.data.status === 404) {
                Swal.fire("Erreur", err.response.data.message, "error");
              } else if (err.response.status === 401) {
                Swal.fire("Error", err.response.data.message, "error");
              }
            });
        } else if (result.isDenied) {
        }
      });
    });
  }

  function decline(item: any) {
    Swal.fire({
      title: "Approuver demande de congé",
      text: `Vous éte sur de decliner un congé de ${daysDifference(
        item.startDate,
        item.endDate
      )} jours a partir du ${item.startDate} pour ${item.User.firstname} ${
        item.User.lastname
      } ?`,
      showDenyButton: true,
      confirmButtonText: "Decliner",
      denyButtonText: `Cancel`,
      confirmButtonColor: "#df4759",
      denyButtonColor: "#d9e2ef",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get(`/api/leave-requests/decline/${item.id}`)
          .then((res) => {
            toast.success("Demande de congé approuvé avec succé", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            getItems(statusFilter);
          })
          .catch((err) => {
            if (err.response.data.status === 404) {
              Swal.fire("Erreur", err.response.data.message, "error");
            } else if (err.response.status === 401) {
              Swal.fire("Error", err.response.data.message, "error");
            }
          });
      } else if (result.isDenied) {
      }
    });
  }

  function archive(item: any) {
    Swal.fire({
      title: "Archivé demande de congé",
      text: `Vous éte sur d'archiver cette demande de congé ?`,
      showDenyButton: true,
      confirmButtonText: "Archiver",
      denyButtonText: `Cancel`,
      confirmButtonColor: "#df4759",
      denyButtonColor: "#d9e2ef",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get(`/api/leave-requests/archive/${item.id}`)
          .then((res) => {
            toast.success("Demande de congé archivé avec succé", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            getItems(statusFilter);
          })
          .catch((err) => {
            if (err.response.data.status === 404) {
              Swal.fire("Erreur", err.response.data.message, "error");
            } else if (err.response.status === 401) {
              Swal.fire("Error", err.response.data.message, "error");
            }
          });
      } else if (result.isDenied) {
      }
    });
  }

  return (
    <div className="pb-2 max-w-5xl mx-auto flex min-h-[calc(100vh-80px)]">
      <Card
        customClassNames="flex flex-col w-full grow"
        contentClassNames="flex flex-col grow"
        title="Demandes de congé"
        right={
          <div className="flex gap-4 items-center">
            {statusFilter.map((filter) => (
              <div
                key={`status${filter}`}
                className="bg-gray-100 dark:bg-gray-900 py-1 px-2 rounded-full"
              >
                {STATUS[filter]}
              </div>
            ))}
            <FilterDropdown
              options={STATUS}
              selectedOptions={statusFilter}
              onChange={handleStatusChange}
            />
          </div>
        }
      >
        <Table
          head={
            <>
              <div className="col-span-2">EMPLOYEE</div>
              <div className="col-span-2 justify-self-center">DATE DEBUT</div>
              <div className="col-span-2 justify-self-center">DATE FIN</div>
              <div className="col-span-1 justify-self-center">NB JOUR</div>
              <div className="col-span-1 justify-self-center">CAUSE</div>
              <div className="col-span-2 justify-self-center">STATUS</div>
              <div className="col-span-2 justify-self-center">ACTIONS</div>
            </>
          }
        >
          {leaveRequests.length > 0 ? (
            leaveRequests?.map((leaveRequest) => (
              <div
                key={leaveRequest.id}
                className="grid grid-cols-12 bg-white dark:bg-gray-800 dark:text-white p-3 rounded shadow"
              >
                <div className="flex items-center space-x-3 col-span-2">
                  <div className="">
                    <Avatar
                      name={leaveRequest.User.firstname}
                      src={"http://localhost:5000/" + leaveRequest.User.picture} // Use null if picture is not available
                      size="50" // Adjust the size as needed
                      round={true}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="font-bold capitalize">
                        {leaveRequest.User.firstname}
                      </div>
                    </div>
                    <div className="text-sm opacity-50 capitalize">
                      {leaveRequest.User.lastname}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 justify-self-center self-center">
                  {leaveRequest.startDate}
                </div>
                <div className="col-span-2 justify-self-center self-center">
                  {leaveRequest.endDate}
                </div>
                <div className="col-span-1 justify-self-center self-center">
                  {daysDifference(leaveRequest.startDate, leaveRequest.endDate)}
                </div>
                <div className="col-span-1 justify-self-center self-center">
                  <button
                    onClick={() => {
                      setToView(leaveRequest);
                      setModalShow(true);
                    }}
                  >
                    <DocumentMagnifyingGlassIcon className="w-6 h-6 text-indigo-600" />
                  </button>
                </div>
                <div className="col-span-2 justify-self-center self-center">
                  {STATUS[leaveRequest.status]}
                </div>
                <div className="col-span-2 self-center flex justify-around">
                  {leaveRequest.status == 0 ? (
                    <>
                      {" "}
                      <button
                        onClick={() => {
                          approuve(leaveRequest);
                        }}
                      >
                        <CheckIcon className="w-6 h-6 text-green-500" />{" "}
                      </button>{" "}
                      <button
                        onClick={() => {
                          decline(leaveRequest);
                        }}
                      >
                        <XMarkIcon className="w-6 h-6 text-red-500" />{" "}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        archive(leaveRequest);
                      }}
                    >
                      {" "}
                      <TrashIcon className="h-6 w-6 text-red-500" />{" "}
                    </button>
                  )}{" "}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center font-semibold grow">
              Aucune demande trouvé avec ce filtre
            </div>
          )}
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Card>
      <ToastContainer />
      {/* <AddUserCmp show={modalShow} hide={()=>{getItems();setModalShow(false)}} />
      <EditUserCmp show={editModalShow} hide={()=>{getItems();setEditModalShow(false)}} toedit={toEdit} /> */}
      <ViewLeaveRequestCause
        show={modalShow}
        hide={() => {
          setModalShow(false);
        }}
        toview={toView}
      />
    </div>
  );
}
