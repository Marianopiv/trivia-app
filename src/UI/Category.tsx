import { Box } from "@mui/material";
import {ReactNode} from "react"

type Props = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Icon: ReactNode;
  text: string;
  action: () => void;
};

const Category = ({ action, Icon, text }: Props) => {
  return (
    <Box sx={{
        '&:hover': {
          color: 'lime',
          cursor: 'pointer',
          borderColor:'lime'
        },
      }} onClick={action}>
      {Icon}
      <div
      >
        {text}
      </div>
    </Box>
  );
};

export default Category;
