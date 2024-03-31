import React from "react";
import * as yup from "yup";
import { Box, Button } from "@mui/material";

import {
  InputLabelControl,
  InputPasswordControl,
  MultiSelect,
  Row,
  SelectLabelControl,
  Text,
} from "@absensi/components/UI";
import PopUp from "@absensi/components/UI/PopUp";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import adminService from "@absensi/service/admin";
import Swal from "sweetalert2";
import useLoadingBackdrop from "@absensi/hooks/useLoadingBackdrop";
import MultiSelectLabelControl from "@absensi/components/UI/SelectLabel/multiSelect";
import { alert, formatter } from "@absensi/utils";

const schema = yup.object({
  name: yup.string().required("Nama wajib di isi!"),
  email: yup.string().email("email must be a valid email address"),
  username: yup.string().required("Username wajib di isi!"),
  nik: yup.number().required("NIK wajib di isi!"),
  password: yup.string(),
  fk_class: yup.number().required("Kelas wajib di isi!"),
  fk_subjects: yup.array(),
});

const ModalNewstaff = ({
  openModal,
  setOpenModal,
  refresh,
  masterClass,
  masterSubject,
  payload,
  mode,
}: // onSubmit,
any) => {
  const { startBackdrop, stopBackdrop } = useLoadingBackdrop();
  const [subjects, setSubjects] = React.useState([]);
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    context: mode,
  });

  React.useEffect(() => {
    getDetailStaff();
  }, [payload]);

  const getDetailStaff = () => {
    adminService
      .getTeacherById(payload.pk_teacher)
      .then((res) => {
        const data = res.data.results;
        if (data) {
          methods.setValue("nik", data.nik);
          methods.setValue("fk_class", data.idClass);
          methods.setValue("name", data.name);
          methods.setValue(
            "fk_subjects",
            data.subjects.map((subject: any) => subject.value)
          );
          setSubjects(data.subjects);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSubmit = (data: any) => {
    startBackdrop();
    if (mode === "edit") {
      const dataPayload = {
        name: data.name,
        nik: data.nik,
        fk_class: data.fk_class,
        fk_subjects: data.fk_subjects,
      };
      adminService
        .updateTeacher(payload.pk_teacher, dataPayload)
        .then(() => {
          methods.reset();
          refresh();
          setOpenModal(false);
          Swal.fire({
            title: "Good job!",
            text: "Success edit staff!",
            icon: "success",
          });
        })
        .catch((msg) => {
          alert.failed(formatter.getErrorMessage(msg));
        })
        .finally(() => {
          stopBackdrop();
        });
    } else {
      adminService
        .postTeacher(data)
        .then(() => {
          methods.reset();
          refresh();
          setOpenModal(false);
          Swal.fire({
            title: "Good job!",
            text: "Success create new staff!",
            icon: "success",
          });
        })
        .catch((msg) => {
          alert.failed(formatter.getErrorMessage(msg));
        })
        .finally(() => {
          stopBackdrop();
        });
    }
  };

  return (
    <PopUp
      title="Tambah Pengajar Baru"
      titleAlign={"left"}
      dialogClassName="p-[16px] !pt-[16px] md:pt-[0px] md:p-[16px]"
      dialogTitleClassName="p-[16px] pb-[0px] md:p-[16px] md:pr-[16px] md:pb-[0px]"
      titleClassName="text-[16px] md:text-[16px]"
      showCloseIcon={true}
      size={"lg"}
      open={openModal}
      closeOnClickOutside={true}
      close={() => setOpenModal(false)}
      // dialogAction={modalFooter}
      dialogActionClassName="border-0 p-[16px]"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: {
              xs: "328px",
              md: "400px",
            },
            maxWidth: "400px",
            margin: {
              xs: "0px",
            },
            maxHeight: {
              md: "644px",
            },
          },
        },
      }}
    >
      <Row className="flex flex-col gap-[16px]">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="md:flex md:justify-between md:flex-wrap gap-[16px] w-full"
          >
            <Box className="mb-2 md:w-full">
              <InputLabelControl name="name" required={true} label="Name" />
            </Box>
            <Box className="mb-2 md:w-full">
              <InputLabelControl
                name="nik"
                type="number"
                required={true}
                label="NIK (Nomor Induk Karyawan)"
                fullWidth={true}
              />
            </Box>
            {mode === "create" && (
              <>
                <Box className="mb-2 md:w-full">
                  <InputLabelControl name="email" label="Email" />
                </Box>
                <Box className="mb-2 md:w-full">
                  <InputLabelControl name="username" required={true} label="Username" />
                </Box>
                <Box className="mb-2 md:w-full">
                  <InputPasswordControl name="password" required={true} label="Password" />
                </Box>
              </>
            )}

            <Box className="mb-2 md:w-full">
              <SelectLabelControl
                className="md:w-full"
                name="fk_class"
                options={masterClass}
                // defaultValue={masterClass[0]}
                label="Kelas"
                placeholder="Select class"
              />
            </Box>

            <Box className="mb-2 md:w-full">
              <MultiSelect
                defaultValue={subjects}
                className="md:w-full"
                name="fk_subjects"
                options={masterSubject}
                multiSelect={true}
                creatable={false}
                label="Mata Pelajaran"
                placeholder="Select Mata Pelajaran"
              />
            </Box>
            <Box className="flex flex-row gap-[16px] w-full justify-end">
              <Button variant="contained" size="medium" className="w-full" type="submit">
                Tambah Pengajar
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Row>
    </PopUp>
  );
};

export default ModalNewstaff;
