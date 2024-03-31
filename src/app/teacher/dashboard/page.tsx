"use client";
import React from "react";
import { AbsensiTable, AdminPageTitle } from "@absensi/components/Features";
import { Flex, Row, Text } from "@absensi/components/UI";
import MainAdminLayout from "@absensi/components/Layout/MainAdminLayout";
import CardMasterData from "./_parts/CardDashboard";
import { alert, formatter } from "@absensi/utils";
import { MRT_PaginationState } from "material-react-table";
import { Box, Button, Chip, IconButton } from "@mui/material";
import teacherService from "@absensi/service/teacher";
import IconEdit from "@mui/icons-material/EditOutlined";
import IconEye from "@mui/icons-material/RemoveRedEye";

import useLoadingBackdrop from "@absensi/hooks/useLoadingBackdrop";
import adminService from "@absensi/service/admin";
import Swal from "sweetalert2";
import Link from "next/link";

const columns: any[] = [
  // { accessorKey: 'created_on', header: 'Created On', size: 160, Cell: ({ cell }: any) => formatter.date(cell.getValue(), 'DD/MM/YYYY HH:mm:ss') },
  { accessorKey: "lessonName", header: "Mata Pelajaran", size: 120 },
  { accessorKey: "lessonTime", header: "Jadwal", size: 202 },
  { accessorKey: "class", header: "Kelas", size: 102 },
  { accessorKey: "teacherName", header: "Nama Guru", size: 202 },
];

const MASTERDATA = [
  {
    title: "Mata pelajaran",
    count: 8,
  },
  {
    title: "Absen hari ini",
    count: 2,
  },
  {
    title: "Kekurangan",
    count: 6,
  },
];
const AdminDashboardPage = () => {
  const { startBackdrop, stopBackdrop } = useLoadingBackdrop();
  const [data, setData] = React.useState([]);
  const [pagination, setPagination] = React.useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  React.useEffect(() => {
    getListLessonSchedule();
  }, []);

  const getListLessonSchedule = () => {
    teacherService
      .getLesson()
      .then((res) => {
        setData(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSubmit = (data: any) => {
    startBackdrop();
    const payload = {
      user_role: "teacher",
      fk_teacher: data.teacherId,
      fk_lesson: data.lessonId,
      status: "present",
    };
    adminService
      .postAttendance(payload)
      .then(() => {
        getListLessonSchedule();
        Swal.fire({
          title: "Absensi Berhasil!",
          text: "Terima kasih sudah melakukan absensi",
          icon: "success",
        });
      })
      .catch((msg) => {
        Swal.fire({
          title: "Absensi Gagal",
          text:
            formatter.getErrorMessage(msg) === "Belum waktunya absensi"
              ? "Silahkan tunggu sampai jam mata pelajaran dimulai"
              : "Jam mata pelajaran sudah lewat. Silahkan hubungi admin untuk melakukan input absensi secara manual",
          icon: "error",
        });
      })
      .finally(() => {
        stopBackdrop();
      });
  };

  return (
    <MainAdminLayout>
      <Row className="mb-6">
        <AdminPageTitle>Dashboard</AdminPageTitle>
        <Text as="p">dashboard</Text>
      </Row>
      <Flex className="flex-wrap justify-between">
        {MASTERDATA.map((el, i) => (
          <CardMasterData key={i} title={el.title} count={el.count} />
        ))}
      </Flex>
      <AbsensiTable
        columns={columns}
        data={data ?? []}
        // metaPagination={data?.meta}
        // loading={loadingSkillList}
        setPagination={setPagination}
        pagination={pagination}
        renderRowActions={(row: any) => [
          <Box key={row?.original?.id} className="flex flex-wrap items-center justify-center gap-[8px] w-[300px]">
            {row?.original?.teacherAttended ? (
              <Chip
                label="Sudah Absen"
                sx={{
                  pointerEvents: "none",
                }}
                color="success"
              />
            ) : (
              <Button onClick={() => onSubmit(row.original)} startIcon={<IconEdit sx={{ fontSize: 18 }} />}>
                Lakukan Absensi
              </Button>
            )}

            <Link href={`dashboard/${row.original.classId}?fk_lesson=${row.original.lessonId}`}>
              <Button startIcon={<IconEye sx={{ fontSize: 18 }} />}>Absensi Siswa</Button>
            </Link>
          </Box>,
        ]}
      />
    </MainAdminLayout>
  );
};

export default AdminDashboardPage;
