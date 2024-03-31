"use client";
import React from "react";
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { Flex, InputLabelControl, InputPasswordControl, Text } from "@absensi/components/UI";
import Image from "next/image";
import authService from "@absensi/service/auth";
import useLoggedUser from "@absensi/hooks/useLoggedUser";
import { alert, formatter } from "@absensi/utils";
import { LoadingPage } from "@absensi/components/Features";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export default function Home() {
  const router = useRouter();
  const { saveUserProfile, isLogged, getAuthorize } = useLoggedUser();
  const [loading, setLoading] = React.useState(true);
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  React.useEffect(() => {
    const runUserVerification = async () => {
      setLoading(true);
      verifyUser()
        .then(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .catch(() => {});
    };

    runUserVerification();
  }, []);

  const handleClickSubmit = async () => {
    const isValid = await methods.trigger();
    if (!isValid) {
      return false;
    }
    setLoading(true);
    authService
      .login(methods.getValues("username"), methods.getValues("password"))
      .then(async (resp) => {
        // const roleId = resp?.data?.data?.fk_ms_role === 0 ? constant.ROLE_ID_EXPERT : resp?.data?.data?.fk_ms_role;
        const user: any = {
          username: resp?.data?.results?.username,
          name: resp?.data?.results?.name,
          token: resp?.data?.results?.payload,
          authorize: resp?.data?.results?.authorize,
        };

        await saveUserProfile(user);

        router.push(resp?.data?.results?.authorize === "admin" ? "/admin/dashboard" : "/teacher/dashboard");
      })
      .catch((msg) => {
        alert.failed(`${formatter.getErrorMessage(msg) ?? "Incorrect username / password"}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLogged()) {
    if (getAuthorize() === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/teacher/dashboard");
    }
  }

  const verifyUser = () => {
    return new Promise((resolve, reject) => {
      if (!isLogged()) {
        router.push("/");
      }

      resolve(true);
    });
  };

  return (
    <>
      {loading ? (
        <LoadingPage loading={loading} />
      ) : (
        <Flex className="gap-10 justify-center items-center align-middle min-h-screen">
          <Image
            className="hidden md:block"
            draggable="false"
            objectFit="cover"
            priority={true}
            src="/assets/images/high-school.png"
            alt="Logo"
            width={542}
            height={369}
          />
          <Box className="max-w-[424px] w-full rounded-[16px] shadow-none">
            <Box className="m-auto rounded-[16px] p-[24px] flex flex-col gap-[40px] shadow-none">
              <Box>
                <Text as={"h1"} className="font-bold text-[22px] leading-[28px]">
                  Login
                </Text>
                <Text as={"p"} className="text-[16px] mt-2 text-[#000000]">
                  Halo Selamat datang, silahkan gunakan username dan passsword yang sudah terdaftar
                </Text>
              </Box>
              <Box>
                <FormProvider {...methods}>
                  <form className="flex flex-col gap-[16px]">
                    <Box>
                      <InputLabelControl name="username" required={true} label="Username" />
                    </Box>
                    <Box>
                      <InputPasswordControl name="password" required={true} label="Password" />
                    </Box>
                  </form>
                </FormProvider>
              </Box>
              <Box className="flex flex-col gap-[16px]">
                <Button
                  onClick={() => handleClickSubmit()}
                  fullWidth
                  className="h-[40px] font-bold text-[16px] leading-[24px]"
                  disabled={loading}
                >
                  Login
                </Button>
                {/* <Box>
             <Text className='font-inter text-center text-[14px] leading-[20px]'>
               Masuk Sebagai Admin
             </Text>
           </Box> */}
              </Box>
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
}
