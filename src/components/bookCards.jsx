/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
const CardList = ({ data }) => {
  return (
    <>
      <Grid item key={data} xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={data.imageCover}
            title="green iguana"
          />
          <CardContent sx={{ height: 160 }}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ height: 35, alignItems: "center" }}
            >
              {data.name}
            </Typography>
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 4,
              }}
              variant="body2"
              color="text.secondary"
            >
              {data.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default CardList;
