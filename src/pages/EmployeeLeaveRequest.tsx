import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Table from "../components/Table";
import Avatar from "react-avatar";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import {
  DocumentMagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import AddLeaveRequest from "../components/leave-requests/AddLeaveRequest";
import daysDifference from "../utils/daysDifference";
import { FilterDropdown } from "../components/FilterDropdown";
import EditLeaveRequest from "../components/leave-requests/EditLeaveRequest";
import ViewLeaveRequestCause from "../components/admin/leave-requests/ViewLeaveRequestCause";

const STATUS: any[] = [
  "En attente",
  "Accepté",
  "Refusé",
  "Date passé",
  "Archivé",
];

export default function EmployeeLeaveRequest() {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    axios.get("/api/leave-requests/remaining").then((res) => {
      setRemaining(res.data);
    });
  }, []);

  const [statusFilter, setStatusFilter] = useState<any[]>(["0"]);

  const handleStatusChange = (selectedStatus: any[]) => {
    setStatusFilter(selectedStatus);
  };

  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [toEdit, setToEdit] = useState({});
  const [toView, setToView] = useState({});

  function getItems(filter: any[]) {
    const params: any = {};

    params.status = filter.join(",");
    axios
      .get("/api/leave-requests/user", { params })
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaveRequests:", error);
      });
  }

  useEffect(() => {
    getItems(statusFilter);
  }, [statusFilter]);

  const deleteItem = (e: any, item: any) => {
    Swal.fire({
      title: "Supprimer utilisateur",
      text: `Vous éte sur de supprimé votre demande de congé du ${daysDifference(
        item.startDate,
        item.endDate
      )} jours a partir du ${item.startDate} ?`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      confirmButtonColor: "#df4759",
      denyButtonColor: "#d9e2ef",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/leave-requests/${item.id}`)
          .then((res) => {
            toast.success("Demande Supprimé avec succé", {
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
  };

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
    <div className="flex flex-col gap-4 min-h-[calc(100vh-80px)]">
      <div className="grid grid-cols-12">
        <div className="col-start-5 col-span-4">
          <Card title="Jours de congés restauntes">
            <div
              className={`flex justify-center font-bold ${
                remaining > 0
                  ? "text-green-500"
                  : remaining < 0
                  ? "text-red-500"
                  : ""
              }`}
            >
              {remaining}
            </div>
          </Card>
        </div>
      </div>
      <Card
        customClassNames="flex flex-col grow"
        contentClassNames="flex flex-col grow"
        title="Demandes de congé"
        right={
          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center">
              {statusFilter.map((filter) => (
                <div
                  key={"filter" + filter}
                  className="bg-gray-100 py-1 px-2 rounded-full text-sm dark:bg-gray-900"
                >
                  {STATUS[filter]}
                </div>
              ))}
            </div>
            <FilterDropdown
              options={STATUS}
              selectedOptions={statusFilter}
              onChange={handleStatusChange}
            />

            <button
              className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg text-sm"
              onClick={() => {
                setModalShow(true);
              }}
            >
              Demander un congé
            </button>
          </div>
        }
      >
        {leaveRequests.length > 0 ? (
          <Table
            head={
              <>
                <div className="col-span-3">DATE DEBUT</div>
                <div className="col-span-3">DATE FIN</div>
                <div className="col-span-1">NB JOUR</div>
                <div className="col-span-1">CAUSE</div>
                <div className="col-span-2">STATUS</div>
                <div className="col-span-2 justify-self-center">ACTIONS</div>
              </>
            }
          >
            {leaveRequests?.map((leaveRequest: any) => (
              <div
                key={leaveRequest.id}
                className="grid grid-cols-12 bg-white dark:bg-gray-800 dark:text-white p-3 rounded shadow"
              >
                <div className="col-span-3 self-center">
                  {leaveRequest.startDate}
                </div>
                <div className="col-span-3 self-center">
                  {leaveRequest.endDate}
                </div>
                <div className="col-span-1 self-center">
                  {daysDifference(leaveRequest.startDate, leaveRequest.endDate)}
                </div>
                <div className="col-span-1 self-center">
                  <button
                    onClick={() => {
                      setToView(leaveRequest);
                      setViewModalShow(true);
                    }}
                  >
                    <DocumentMagnifyingGlassIcon className="w-6 h-6 text-indigo-600" />
                  </button>
                </div>
                <div className="col-span-2 self-center">
                  {STATUS[leaveRequest.status]}
                </div>
                <div className="col-span-2 self-center flex justify-around">
                  {leaveRequest.status === 0 ? (
                    <>
                      <button
                        onClick={() => {
                          setToEdit(leaveRequest);
                          setEditModalShow(true);
                        }}
                      >
                        <PencilSquareIcon className="w-6 h-6 text-indigo-600" />
                      </button>
                      <button onClick={(e) => deleteItem(e, leaveRequest)}>
                        <TrashIcon className="w-6 h-6 text-red-500" />{" "}
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
                  )}
                </div>
              </div>
            ))}
          </Table>
        ) : (
          <div className="flex justify-center items-center font-bold grow">
            Aucune demande trouvé, essayer de changer le filtre ou créer une
            nouvelle demande
          </div>
        )}
      </Card>
      <ToastContainer />
      <AddLeaveRequest
        show={modalShow}
        hide={() => {
          getItems(statusFilter);
          setModalShow(false);
        }}
      />
      <EditLeaveRequest
        show={editModalShow}
        hide={() => {
          getItems(statusFilter);
          setEditModalShow(false);
        }}
        toedit={toEdit}
      />
      <ViewLeaveRequestCause
        show={viewModalShow}
        hide={() => {
          setViewModalShow(false);
        }}
        toview={toView}
      />
    </div>
  );
}
