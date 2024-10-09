import Layout from "../Component/Layout/Layout";
import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { Button, Typography } from "@mui/material";
const ColorPicker = () => {
  const [color, setColor] = useState("#fff");
  const [showColor, setShowColor] = useState(false);
  return (
    <Layout>
      <div style={{height:"514px",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div style={{border:"1px solid white",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"480px",width:"480px",borderRadius:"50%",backgroundImage:"",borderStyle:"dashed"}}>
        <Typography variant="h5">This is a color picker</Typography>
        <Button onClick={() => setShowColor((showColor) => !showColor)}>
          {showColor ? "close the color picker" : "pick a color"}
        </Button>
        {showColor && (
          <ChromePicker
            color={color}
            onChange={(updateColor) => setColor(updateColor.hex)}
          />
        )}

        <Typography variant="h4">color code {color}</Typography>
      </div>
      </div>
    </Layout>
  );
};
export default ColorPicker;
