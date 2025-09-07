import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import NumberInputDashboard from "../../CustomInputs/NumberInputDashboard";

const ItemTotalProfit = ({label, value, currency, iconUrl}) => {
  return (
    <Box minWidth='300px' mr='20px' mb='10px'>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{justifyContent: 'space-between'}}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="overline"
              >
                {label}
              </Typography>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                <NumberInputDashboard
                  value={value}
                  currency={currency}
                />
              </Typography>
            </Grid>
            <Grid item>
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt='icon'
                  width={50}
                  height={50}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ItemTotalProfit;