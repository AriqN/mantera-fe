/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

export default function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

// export default async function LinearWithValueLabel({ level, user }) {
//   const [progress, setProgress] = useState(0);
//   const allPage = await user.currentRead.map((el) => el.pageRead * 1);
//   const updatePage = await allPage.reduce((a, b) => a + b);
//   const exp = Math.round(0.5 * (level * 5) + 0.8 * (level * 9) + 200 * level);
//   const handleLevelProgress = async () => {
//     if (user) setProgress(Math.round((updatePage / exp) * 100));
//     else setProgress(0);
//   };

//   useEffect(() => {
//     handleLevelProgress();
//   }, [progress]);

//   return (
//     <Box sx={{ width: "100%" }}>
//       <LinearProgressWithLabel value={progress} />
//     </Box>
//   );
// }
