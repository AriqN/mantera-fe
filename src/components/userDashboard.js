/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import LinearWithValueLabel from "./progressBar";

const DashboardUser = ({ userData }) => {
  const [progress, setProgress] = useState(0);
  const progressLevel = async () => {
    const allPage = await userData.currentRead.map((el) => el.pageRead * 1);
    const updatePage = await allPage.reduce((a, b) => a + b);
    const exp = Math.round(
      0.5 * (userData.level * 5) +
        0.8 * (userData.level * 9) +
        200 * userData.level
    );
    setProgress(Math.round((updatePage / exp) * 100));
  };
  useEffect(() => {
    progressLevel();
  }, [progress]);
  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        {userData.name}
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Level {userData.level}
      </Typography>
      <LinearWithValueLabel value={progress} />
    </>
  );
};

export default DashboardUser;
