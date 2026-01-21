import { Box, Checkbox, InputLabel, Paper } from "@mui/material";

const Options = ({
  includePotential,
  setIncludePotential,
}: {
  includePotential: boolean;
  setIncludePotential: (arg: boolean) => void;
}) => {
  return (
    <Box className="w-full bg-black dark:bg-white p-4 text-white, dark:text-black">
      <p>Options</p>
      <InputLabel>
        Include actors with a decent chance of being in an announced universes
        beyond set
        <Checkbox
          onChange={() => setIncludePotential(!includePotential)}
          checked={includePotential}
          name="includePotential"
          color="primary"
        />
      </InputLabel>
    </Box>
  );
};

export default Options;
