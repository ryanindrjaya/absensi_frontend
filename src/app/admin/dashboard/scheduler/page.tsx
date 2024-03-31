"use client";
import { Box, Button, Chip, IconButton } from "@mui/material";
import IconEdit from "@mui/icons-material/Edit";
import IconDelete from "@mui/icons-material/Delete";
import { AbsensiTable, FormHeader } from "@absensi/components/Features";
import MainAdminLayout from "@absensi/components/Layout/MainAdminLayout";
import { Row } from "@absensi/components/UI";
import React from "react";
import { MRT_PaginationState } from "material-react-table";
import adminService from "@absensi/service/admin";
import ModalNewstaff from "./ModalNewScheduler";
import ModalNewScheduler from "./ModalNewScheduler";
import { alert, formatter } from "@absensi/utils";
import Swal from "sweetalert2";

// import Link from 'next/link'
const columns: any[] = [
  { accessorKey: "teacherName", header: "Nama Pengajar", size: 202 },
  { accessorKey: "subjectName", header: "Mata Pelajaran", size: 202 },
  { accessorKey: "className", header: "Kelas", size: 202 },
  {
    accessorKey: "schedules",
    header: "Waktu",
    size: 300,
    align: "center",
    Cell: ({ cell }: any) =>
      cell.getValue()?.map((data: any) => (
        <div className="flex items-center gap-2 mb-1">
          <span>&#x2022;</span>
          <span>{data?.lessonTime}</span>
          <Chip
            key={data?.id}
            size="small"
            label={`${data?.lessonDurationMinutes} Menit`}
            color="success"
            variant="outlined"
          />
        </div>
      )),
  },
];

const Scheduler = () => {
  const [data, setData] = React.useState([]);
  // const [payload, setPayload] = React.useState({})
  const [masterClass, setMasterClass] = React.useState([]);
  const [masterSubject, setMasterSubject] = React.useState([]);
  const [masterUser, setMasterUser] = React.useState([]);

  const [payload, setPayload] = React.useState([]);
  const [modalMode, setModalMode] = React.useState("");
  const [openModalNewStudent, setOpenModalNewStudent] = React.useState(false);
  const [pagination, setPagination] = React.useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  React.useEffect(() => {
    getListScheduler();
    getClass();
    getSubject();
    getUser();
  }, []);

  const getListScheduler = () => {
    adminService
      .getScheduler()
      .then((res) => {
        setData(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getClass = () => {
    adminService
      .getClass()
      .then((res) => {
        const data = res.data.results.map((el: any) => ({
          label: el.class_name,
          value: el.pk_class,
        }));
        setMasterClass(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getUser = () => {
    adminService
      .getTeacher()
      .then((res) => {
        const data = res.data.results.map((el: any) => ({
          label: el.name,
          value: el.pk_teacher,
          name: el.name,
        }));
        setMasterUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getSubject = () => {
    adminService
      .getSubject()
      .then((res) => {
        const data = res.data.results.map((el: any) => ({
          label: el.subject_name,
          value: el.pk_subject,
        }));
        setMasterSubject(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Do you want to delete this scheduler?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        adminService
          .deleteScheduler(id)
          .then(() => {
            alert.success("Success remove scheduler!");
            getListScheduler();
          })
          .catch((err) => {
            console.error(err);
            alert.failed(formatter.getErrorMessage(err));
          });
      }
    });
  };

  const handleEdit = (data: any) => {
    setPayload(data);
    setOpenModalNewStudent(true);
    setModalMode("edit");
  };

  return (
    <MainAdminLayout>
      <FormHeader titlePage="Jadwal Mata Pelajaran" link="/admin/dashboard" linkName="Master" page="Mata Pelajaran" />
      <Row>
        <Box className="flex justify-end w-full flex-end mb-10">
          <Button
            onClick={() => {
              setOpenModalNewStudent(true);
              setModalMode("create");
            }}
            className="w-[157px]"
          >
            Tambah Jadwal
          </Button>
        </Box>
        <AbsensiTable
          columns={columns}
          data={data ?? []}
          // metaPagination={data?.meta}
          // loading={loadingSkillList}
          setPagination={setPagination}
          pagination={pagination}
          muiTableBodyRowProps={(data: any) => ({
            onClick: (event: any) => {},
            sx: {
              cursor: "pointer",
            },
          })}
          renderRowActions={(row: any) => [
            <Box key={row?.original?.id} className="flex flex-row items-center justify-center gap-[8px] w-[100px]">
              {
                <>
                  <IconButton
                    onClick={() => {
                      handleDelete(row.original.id);
                    }}
                  >
                    <IconDelete />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      handleEdit(row.original);
                    }}
                  >
                    <IconEdit />
                  </IconButton>
                </>
              }
            </Box>,
          ]}
        />
      </Row>
      <ModalNewScheduler
        payload={payload}
        mode={modalMode}
        masterClass={masterClass}
        masterSubject={masterSubject}
        masterUser={masterUser}
        openModal={openModalNewStudent}
        setOpenModal={setOpenModalNewStudent}
        refresh={getListScheduler}
      />
    </MainAdminLayout>
  );
};

export default Scheduler;
