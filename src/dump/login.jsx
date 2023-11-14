// Date : 07-09-2023
// Chris Does not want this functionality at this point
// const handleRentalFetch = async (e) => {

//   const rentalData = await rentalorder(
//     username,
//     dayjs(startDate).format("YYYY-MM-DD"),
//     dayjs(endDate).format("YYYY-MM-DD")

//   );

//   if (rentalData && rentalData.status == 200) {
//     setROHData(rentalData.data.result);
//     sessionStorage.setItem(
//       "rentalorder",
//       JSON.stringify(rentalData.data.result)
//     );
//   } else if (rentalData && rentalData.status == 500) {
//     setROHData(false);
//   } else {
//     setROHData(false);
//   }
// };

const handleLogin = async (e) => {
  setIsLoading(true);

  const user = await login(username, password);
  if (user && user.status == 200) {
    sessionStorage.setItem("startDate", dayjs(startDate));
    sessionStorage.setItem("endDate", dayjs(endDate));
    await handleChecklistFetch();
    //handleRentalFetch();
    setUserLogged(user.data.result[0]);
    sessionStorage.setItem("user", JSON.stringify(user.data.result[0]));
    navigate("/dashboard");
  } else if ((user && user.status == 500) || (user && user.status == 400)) {
    setOpen(true);
    setTimeout(() => {
      setOpen(false); // Hide the alert after 2 seconds
    }, 4000);

    //login is not working atm
    // let loginname = { custCode: "T-PADES0", custName: "T-PADES0" };
    // setUserLogged(loginname);
    // sessionStorage.setItem("user", JSON.stringify(loginname));
    // await handleChecklistFetch();
    // navigate("/dashboard");
  } else {
    setOpen(true);
    setTimeout(() => {
      setOpen(false); // Hide the alert after 2 seconds
    }, 4000);
  }

  setIsLoading(false);
};
